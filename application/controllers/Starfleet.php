<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Starfleet extends MY_Controller {
        public function __construct(){
            parent::__construct();
            $this->load->model('Starfleet_model');
        }

	// We really shouldn't need to mess with this. Most of our code will go in the Angular section.
	public function index()
	{
		$this->load->view('template/header', $this->data);
                $this->load->view('template/footer', $this->data);
	}
        
        // Return the current ranks.
        public function getRanks(){
            echo json_encode($this->Starfleet_model->getRanks());
        }
        
        // Return the current species
        public function getSpecies(){
            echo json_encode($this->Starfleet_model->getSpecies());
        }
        
        // Return all officers.
        public function getOfficers(){
            echo json_encode($this->Starfleet_model->getOfficers());
        }
        
        
        // Create an officer
        public function createOfficer(){
            // Collect the variables and pass them to the model.
            $fname = $this->input->get('fname');
            $lname = $this->input->get('lname');
            $rank = $this->input->get('rank');
            $techLevel = $this->input->get('techLevel');
            $species = $this->input->get('species');
            echo json_encode($this->Starfleet_model->createOfficer($fname, $lname, $rank, $techLevel, $species));
        }
}
