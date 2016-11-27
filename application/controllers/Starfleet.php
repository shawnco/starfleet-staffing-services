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
        
        // Return all classes.
        public function getClasses(){
            echo json_encode($this->Starfleet_model->getClasses());
        }
        
        
        // Create an officer
        public function createOfficer(){
            // Collect the variables and pass them to the model.
            $fname = $this->input->get('fname');
            $lname = $this->input->get('lname');
            $rank = $this->input->get('rank');
            $techLevel = $this->input->get('techLevel');
            $species = $this->input->get('species');
            $status = $this->input->get('status');
            echo json_encode($this->Starfleet_model->createOfficer($fname, $lname, $rank, $techLevel, $species, $status));
        }
        
        // Create an officer
        public function updateOfficer(){
            // Collect the variables and pass them to the model.
            $serviceNumber = $this->input->get('officer');
            $fname = $this->input->get('fname');
            $lname = $this->input->get('lname');
            $rank = $this->input->get('rank');
            $techLevel = $this->input->get('techLevel');
            $species = $this->input->get('species');
            $status = $this->input->get('status');
            echo json_encode($this->Starfleet_model->updateOfficer($serviceNumber, $fname, $lname, $rank, $techLevel, $species, $status));
        }
        
        // Delete an officer
        public function deleteOfficer(){
            $id = $this->input->get('officer');
            var_dump($this->input->get());
            echo json_encode($this->Starfleet_model->deleteOfficer($id));
        }
        
        // Create new starship
        public function commissionStarship(){
            $name = $this->input->get('name');
            $class = $this->input->get('class');
            echo json_encode($this->Starfleet_model->commissionStarship($name, $class));
        }
        
        // Decommission starship
        public function decommissionStarship(){
            $id = $this->input->get('id');
            echo json_encode($this->Starfleet_model->decommissionStarship($id));
        }
        
        // Create class
        public function createClass(){
            $name = $this->input->get('name');
            $crewSize = $this->input->get('crewSize');
            $maxSpeed = $this->input->get('maxSpeed');
            $fuelCapacity = $this->input->get('fuelCapacity');
            $techLevel = $this->input->get('techLevel');
            $category = $this->input->get('category');
            
            if($category === 'Battleship'){
                $phaserStrength = $this->input->get('phaserStrength');
                $torpedoType = $this->input->get('torpedoType');
                echo json_encode($this->Starfleet_model->createBattleship($name, $crewSize, $maxSpeed, $fuelCapacity, $techLevel, $phaserStength, $torpedoType));
            }else if($category === 'Explorer'){
                $regionSpecialty = $this->input->get('regionSpeciality');
                echo json_encode($this->Starfleet_model->createExplorer($name, $crewSize, $maxSpeed, $fuelCapacity, $techLevel, $regionSpecialty));
            }else if($category === 'Science'){
                $sensorRange = $this->input->get('sensorRange');
                $labType = $this->input->get('labType');
                echo json_encode($this->Starfleet_model->createScience($name, $crewSize, $maxSpeed, $fuelCapacity, $techLevel, $sensorRange, $labType));
            }
        }
        
        // Update class
        
        
        // Remove class
        public function deleteClass(){
            $id = $this->input->get('id');
            echo json_encode($this->Starfleet_model->deleteClass($id));
        }
        
        // List all officers in Starfleet by species
        public function getAllOfficersBySpecies(){
            echo json_encode($this->Starfleet_model->getAllOfficersBySpecies());
        }
        
        // List all unassigned officers
        public function getAllUnassignedOfficers(){
            echo json_encode($this->Starfleet_model->getAllUnassignedOfficers());
        }
        
        // Get all vacant positions
        public function getAllVacantPositions(){
            echo json_encode($this->Starfleet_model->getAllVacantPositions());
        }
}