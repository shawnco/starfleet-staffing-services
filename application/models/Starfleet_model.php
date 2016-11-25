<?php

class Starfleet_model extends CI_Model {
    public function __construct(){
        parent::__construct();
        $this->load->database();
    }
    
    // Return a list of ranks.
    public function getRanks(){
        return $this->db->query('SELECT * FROM Rank')->result_array();
    }
    
    // Return a list of species.
    public function getSpecies(){
        return $this->db->query('SELECT * FROM Species')->result_array();
    }
    
    // Return a list of officers.
    public function getOfficers(){
        return $this->db->query('SELECT * FROM Officers ORDER BY serviceNumber')->result_array();
    }
    
    // Return a list of classes.
    public function getClasses(){
        return $this->db->query("SELECT * FROM Class ORDER BY id")->result_array();
    }
    
    // Adds an officer to the database.
    public function createOfficer($fname, $lname, $rank, $techLevel, $species, $status){
        return $this->db->query("INSERT INTO Officers (fname, lname, rank, techLevel, species, status) VALUES ('$fname', '$lname', $rank, $techLevel, $species, '$status')");
    }
    
    // Updates an officer in the database.
    public function updateOfficer($serviceNumber, $fname, $lname, $rank, $techLevel, $species, $status){
        return $this->db->query("UPDATE Officers SET fname = '$fname', lname = '$lname', rank = $rank', techLevel = $techLevel, species = $species', status = '$status' WHERE serviceNumber = $serviceNumber");
    }    
    
    // Delete an officer
    public function deleteOfficer($id){
        return $this->db->query("DELETE FROM Officers WHERE serviceNumber = $id");
    }
    
    // Commission starship
    public function commissionStarship($name, $class){
        return $this->db->query("INSERT INTO Starships (name, class) VALUES ('$name', $class)");
        
        // This should probably return a registry ID as well as call a trigger to put crew on the ship.
    }
    
    // Decommission starhip
    public function decommissionStarship($id){
        // Delete the starship and all assignments
        $delStarship = $this->db->query("DELETE FROM Starships WHERE registryNumber = $id");
        $delAssignment = $this->db->query("DELETE FROM Assignment WHERE starshipID = $id");
        // Should we delete from Position as well?
        return $delStarship && $delAssignment;
    }
    
    // Create a battleship
    public function createBattleship($name, $crewSize, $maxSpeed, $fuelCapacity, $techLevel, $phaserStength, $torpedoType){
        $createClass = $this->db->query("INSERT INTO Class (name, crewSize, maxSpeed, fuelCapacity, techLevel) VALUES ('$name', $crewSize, $maxSpeed, $fuelCapacity, $techLevel)");
        $id = $this->db->insert_id();
        $createBattleship = $this->db->query("INSERT INTO Battleship (id, phaserStrength, torpedoType) VALUES ($id, $phaserStrength, $torpedoType)");
        return $createBattleship && $createClass;
    }
     
    // Create an explorer
    public function createExplorer($name, $crewSize, $maxSpeed, $fuelCapacity, $techLevel, $regionSpecialty){
        $createClass = $this->db->query("INSERT INTO Class (name, crewSize, maxSpeed, fuelCapacity, techLevel) VALUES ('$name', $crewSize, $maxSpeed, $fuelCapacity, $techLevel)");
        $id = $this->db->insert_id();
        $createExplorer = $this->db->query("INSERT INTO Battleship (id, phaserStrength, torpedoType) VALUES ($id, $regionSpecialty)");
        return $createExplorer && $createClass;
    }    
    
    // Create a science ship
    public function createScience($name, $crewSize, $maxSpeed, $fuelCapacity, $techLevel, $sensorRange, $labType){
        $createClass = $this->db->query("INSERT INTO Class (name, crewSize, maxSpeed, fuelCapacity, techLevel) VALUES ('$name', $crewSize, $maxSpeed, $fuelCapacity, $techLevel)");
        $id = $this->db->insert_id();
        $createScience = $this->db->query("INSERT INTO Battleship (id, phaserStrength, torpedoType) VALUES ($id, $sensorRange, $labType)");
        return $createScience && $createClass;
    }    
    
    // Delete starship class
    public function deleteClass($id){
        $category = $this->db->query("SELECT category FROM Class WHERE id = $id")->result_array()['category'];
        $deleteClass = $this->db->query("DELETE FROM Class WHERE id = $id");
        if($category === 'Battleship'){
            $deleteCategory = $this->db->query("DELETE FROM Battleship WHERE id = $id");
        }else if($category === 'Explorer'){
            $deleteCategory = $this->db->query("DELETE FROM Explorer WHERE id = $id");
        }else if($category === 'Science'){
            $deleteCategory = $this->db->quere("DELETE FROM Science WHERE id = $id");
        }
        return $deleteClass && $deleteCategory;
    }
    
    // Get all officers in the fleet by species
    public function getAllOfficersBySpecies(){
        return $this->db->query("SELECT species.name, COUNT(*) FROM Officers officers JOIN Species species ON species.code = officers.species GROUP BY species.code")->result_array();
    }
    
    // Get all unassigned officers
    public function getAllUnassignedOfficers(){
        return $this->db->query("select officers.lname, officers.fname, rank.title, species.name, officers.status from Officers officers join Species species on species.code = officers.species join Rank rank On rank.number = officers.rank where officers.serviceNumber not in (select officerID from Assignment where officerID is not null) order by officers.lname ASC")->result_array();
    }
}
