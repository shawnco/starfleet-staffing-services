<?php

class Starfleet_model extends CI_Model {
    public function __construct(){
        parent::__construct();
        $this->load->database();
    }
    
    // Get starting info.
    public function getData(){
        $output = array();
        $output['ranks'] = $this->db->query('SELECT * FROM Rank')->result_array();
        $output['species'] = $this->db->query('SELECT * FROM Species ORDER BY name')->result_array();
        $output['officers'] = $this->db->query('SELECT * FROM Officers ORDER BY lname, fname, serviceNumber')->result_array();
        $output['starships'] = $this->db->query("select ship.registryNumber, ship.name, c.name as class, c.crewSize from Starship ship join Class c on c.id = ship.class order by ship.registryNumber ASC")->result_array();
        $output['positions'] = $this->db->query('SELECT * FROM Stations ORDER BY name')->result_array();
        $output['departments'] = $this->db->query('SELECT * FROM Department ORDER BY name')->result_array();
        
        $classes = $this->db->query('SELECT * FROM Class ORDER BY name')->result_array();
        
        foreach($classes as $k => $class){
            // Get the id for the class, find what category it belongs to
            $id = $class['id'];
            $category = $this->getCategory($id);
            $classes[$k]['category'] = $category;
            
            // Get the information for that category and add it to the ship.
            if($category !== FALSE){
                $result = $this->db->query("SELECT * FROM $category WHERE id = $id")->row();
                foreach($result as $key => $row){
                    $classes[$k][$key] = $row;
                }
            }
        }
        $output['classes'] = $classes;
        
        return $output;
    }
    
    // Adds an officer to the database.
    public function createOfficer($fname, $lname, $rank, $techLevel, $species, $status){
        return $this->db->query("INSERT INTO Officers (fname, lname, rank, techLevel, species, status) VALUES ('$fname', '$lname', $rank, $techLevel, $species, '$status')");
    }
    
    // Updates an officer in the database.
    public function updateOfficer($serviceNumber, $fname, $lname, $rank, $techLevel, $species, $status){
        return $this->db->query("UPDATE Officers SET fname = '$fname', lname = '$lname', rank = $rank, techLevel = $techLevel, species = $species, status = '$status' WHERE serviceNumber = $serviceNumber");
    }    
    
    // Delete an officer
    public function deleteOfficer($id){
        return $this->db->query("DELETE FROM Officers WHERE serviceNumber = $id");
    }
    
    // Commission starship
    public function commissionStarship($name, $class){
        return $this->db->query("INSERT INTO Starship (name, class) VALUES ('$name', $class)");
        
        // This should probably return a registry ID as well as call a trigger to put crew on the ship.
    }
    
    // Update a starship
    public function updateStarship($id, $name, $class){
        return $this->db->query("UPDATE Starship SET name = '$name', class = $class WHERE registryNumber = $id");
    }
    
    // Decommission starhip
    public function decommissionStarship($id){
        // Delete the starship and all assignments
        $delStarship = $this->db->query("DELETE FROM Starship WHERE registryNumber = $id");
        $delAssignment = $this->db->query("DELETE FROM Assignment WHERE starshipID = $id");
        // Should we delete from Station as well?
        return $delStarship && $delAssignment;
    }
    
    // Destroy starship
    public function destroyStarship($registryNumber){
        // TODO: Add trigger to mark all crew as dead
        return $this->decommissionStarship($registryNumber);
    }
    
    // Create a battleship
    public function createBattleship($name, $crewSize, $maxSpeed, $fuelCapacity, $techLevel, $phaserStrength, $torpedoType){
        $createClass = $this->db->query("INSERT INTO Class (name, crewSize, maxSpeed, fuelCapacity, techLevel) VALUES ('$name', $crewSize, $maxSpeed, $fuelCapacity, $techLevel)");
        $id = $this->db->insert_id();
        $createBattleship = $this->db->query("INSERT INTO Battleship (id, phaserStrength, torpedoType) VALUES ($id, $phaserStrength, $torpedoType)");
        return $createBattleship && $createClass;
    }
     
    // Create an explorer
    public function createExplorer($name, $crewSize, $maxSpeed, $fuelCapacity, $techLevel, $regionSpecialty){
        $createClass = $this->db->query("INSERT INTO Class (name, crewSize, maxSpeed, fuelCapacity, techLevel) VALUES ('$name', $crewSize, $maxSpeed, $fuelCapacity, $techLevel)");
        $id = $this->db->insert_id();
        $createExplorer = $this->db->query("INSERT INTO Explorer (id, regionSpecialty) VALUES ($id, $regionSpecialty)");
        return $createExplorer && $createClass;
    }    
    
    // Create a science ship
    public function createScience($name, $crewSize, $maxSpeed, $fuelCapacity, $techLevel, $sensorRange, $labType){
        $createClass = $this->db->query("INSERT INTO Class (name, crewSize, maxSpeed, fuelCapacity, techLevel) VALUES ('$name', $crewSize, $maxSpeed, $fuelCapacity, $techLevel)");
        $id = $this->db->insert_id();
        $createScience = $this->db->query("INSERT INTO Science (id, sensorRange, labType) VALUES ($id, $sensorRange, $labType)");
        return $createScience && $createClass;
    }    
    
    // Delete starship class
    public function deleteClass($id){
        $category = $this->getCategory($id);
        if($category !== FALSE){
            $deleteCategory = $this->db->query("DELETE FROM $category WHERE id = $id");
        }else{
            $deleteCategory = FALSE;
        }
        $deleteClass = $this->db->query("DELETE FROM Class WHERE id = $id");
        
        return $deleteClass && $deleteCategory;
    }
    
    // Create position
    public function createPosition($code, $name, $suggestedRank, $suggestedExp, $department){
        return $this->db->query("INSERT INTO Stations (code, name, suggestedRank, suggestedExp, department) VALUES ('$code', '$name', $suggestedRank, $suggestedExp, '$department')");
    }
    
    // Update position
    public function updatePosition($code, $name, $suggestedRank, $suggestedExp, $department){
        return $this->db->query("UPDATE Stations SET name = '$name', suggestedRank = $suggestedRank, suggestedExp = $suggestedExp, department = '$department' WHERE code = '$code'");
    }

    // Delete position
    public function deletePosition($code){
        return $this->db->query("DELETE FROM Stations WHERE code = '$code'");
    }
    
    // Get all officers in the fleet by species
    public function getAllOfficersBySpecies(){
        return $this->db->query("SELECT species.name, COUNT(*) AS cnt FROM Officers officers JOIN Species species ON species.code = officers.species GROUP BY species.code")->result_array();
    }
    
    // Get all unassigned officers
    public function getAllUnassignedOfficers(){
        return $this->db->query("select officers.lname, officers.fname, rank.title, species.name, officers.status from Officers officers join Species species on species.code = officers.species join Rank rank On rank.number = officers.rank where officers.serviceNumber not in (select officerID from Assignment where officerID is not null) order by officers.lname ASC")->result_array();
    }
    
    // Get all vacant positions
    public function getAllVacantPositions(){
        return $this->db->query("select ship.name, stations.name as position_name from Assignment assign join Stations stations on stations.id = assign.stationCode join Starship ship on ship.registryNumber = assign.starshipID where assign.officerID is null")->result_array();
    }
    
    // Get all classes by tech level
    public function getClassesByTechLevel(){
        return $this->db->query('SELECT name, techLevel FROM Class ORDER BY techLevel')->result_array();
    }
    
    // Get all species on a starship
    public function getSpeciesOnStarship($registryNumber){
        return $this->db->query("select species.name, count(*) as cnt from Officers officers join Species species on species.code = officers.species join Assignment assign on assign.officerID = officers.serviceNumber join Starship ships on ships.registryNumber = assign.starshipID where ships.registryNumber = $registryNumber group by species.code")->result_array();
    }
    
    // Get all officers in department by species
    public function getOfficersInDepartmentBySpecies(){
        return $this->db->query("select stations.department, count(*) as cnt from Officers officers join Assignment assign on assign.officerID = officers.serviceNumber join Stations stations on stations.code = assign.stationCode join Species species on species.code = officers.species group by species.name")->result_array();
    }
    
    // Get crew of ship
    public function getShipCrew($registryNumber){
        return $this->db->query("select fname, lname, rank, techLevel, species, Stations.name as stations from Starship starship join Assignment assignment on assignment.starshipId = starship.registryNumber join stations on assignment.stationCode = stations.code  join Officers officers on officers.serviceNumber = assignment.officerId where starship.registryNumber = $registryNumber")->result_array();
    }
    
    // Get all ships with vacancy
    public function getShipsWithVacancy($code){
        return $this->db->query("SELECT starship.name FROM Starship starship JOIN Assignment assignment ON assignment.starshipId = starship.registryNumber WHERE assignment.officerId = NULL AND assignment.stationCode = '$code'")->result_array();
    }
    
    // Find best officers for a position
    public function getOfficersForPosition($station){
        return $this->db->query("set @station := '$station';
select officers.lname as Last, 
officers.fname as First, 
rank.title as Rank, 
officers.experience as Exp,
species.name as Species, 
officers.status as Status
from Officers officers
join Species species
	on species.code = officers.species
join Rank rank
	on rank.number = officers.rank
where officers.serviceNumber not in
(select officerID from Assignment where officerID is not null)
and officers.rank = 
(select suggestedRank from Stations where code = @station)
union
select 		officers.lname as Last, 
officers.fname as First, 
rank.title as Rank, 
officers.experience as Exp,
species.name as Species, 
officers.status as Status
from Officers officers
join Species species
	on species.code = officers.species
join Rank rank
	on rank.number = officers.rank
where officers.serviceNumber not in
(select officerID from Assignment where officerID is not null)
and officers.rank = 
(select suggestedRank from Stations where code = @station)+1
union
select 		officers.lname as Last, 
officers.fname as First, 
rank.title as Rank, 
officers.experience as Exp,
species.name as Species, 
officers.status as Status
from Officers officers
join Species species
	on species.code = officers.species
join Rank rank
	on rank.number = officers.rank
where officers.serviceNumber not in
(select officerID from Assignment where officerID is not null)
and officers.rank = 
(select suggestedRank from Stations where code = @station)-1")->result_array();
    }
    
    
    
    
    
    
    // Get the category of the ship
    private function getCategory($id){
        if(count($this->db->query("SELECT * FROM Battleship WHERE id = $id")->result_array()) > 0){
            $category = 'Battleship';
        }else if(count($this->db->query("SELECT * FROM Explorer WHERE id = $id")->result_array()) > 0){
            $category = 'Explorer';
        }else if(count($this->db->query("SELECT * FROM Science WHERE id = $id")->result_array()) > 0){
            $category = 'Science';
        }else{
            $category = FALSE;
        } 
        return $category;
    }
}
