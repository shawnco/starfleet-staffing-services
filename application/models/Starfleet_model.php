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
}
