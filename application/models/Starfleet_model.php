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
    
    // Adds an officer to the database.
    public function createOfficer($fname, $lname, $rank, $techLevel, $species){
        return $this->db->query("INSERT INTO Officers (fname, lname, rank, techLevel, species) VALUES ('$fname', '$lname', $rank, $techLevel, $species)");
    }
}
