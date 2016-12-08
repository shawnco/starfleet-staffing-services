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
        
        // Get starting data
        public function getData(){
            echo json_encode($this->Starfleet_model->getData());
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
            $serviceNumber = $this->input->get('serviceNumber');
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
            $id = $this->input->get('serviceNumber');
            echo json_encode($this->Starfleet_model->deleteOfficer($id));
        }
        
        // Create new starship
        public function commissionStarship(){
            $name = $this->input->get('name');
            $class = $this->input->get('class');
            echo json_encode($this->Starfleet_model->commissionStarship($name, $class));
        }
        
        // Update a starship
        public function updateStarship(){
            $id = $this->input->get('registryNumber');
            $name = $this->input->get('name');
            $class = $this->input->get('class');
            echo json_encode($this->Starfleet_model->updateStarship($id, $name, $class));
        }
        
        // Decommission starship
        public function decommissionStarship(){
            var_dump($this->input->get());
            $id = $this->input->get('registryNumber');
            echo json_encode($this->Starfleet_model->decommissionStarship($id));
        }
        
        // Destroy starship
        public function destroyStarship(){
            $registryNumber = $this->input->get('registryNumber');
            echo json_encode($this->Starfleet_model->destroyStarship($registryNumber));
        }
        
        // Create class
        public function createClass(){
//            var_dump($this->input->get());
            $name = $this->input->get('name');
            $crewSize = $this->input->get('crewSize');
            $maxSpeed = $this->input->get('maxSpeed');
            $fuelCapacity = $this->input->get('fuelCapacity');
            $techLevel = $this->input->get('techLevel');
            $category = $this->input->get('category');
            
            if($category === 'Battleship'){
                $phaserStrength = $this->input->get('phaserStrength');
                $torpedoType = $this->input->get('torpedoType');
                echo json_encode($this->Starfleet_model->createBattleship($name, $crewSize, $maxSpeed, $fuelCapacity, $techLevel, $phaserStrength, $torpedoType));
            }else if($category === 'Explorer'){
                $regionSpecialty = $this->input->get('regionSpecialty');
                echo json_encode($this->Starfleet_model->createExplorer($name, $crewSize, $maxSpeed, $fuelCapacity, $techLevel, $regionSpecialty));
            }else if($category === 'Science'){
                $sensorRange = $this->input->get('sensorRange');
                $labType = $this->input->get('labType');
                echo json_encode($this->Starfleet_model->createScience($name, $crewSize, $maxSpeed, $fuelCapacity, $techLevel, $sensorRange, $labType));
            }
        }
        
        // Update class
        public function updateClass(){
            var_dump($this->input->get());
        }
        
        // Remove class
        public function deleteClass(){
//            var_dump($this->input->get());
            $id = $this->input->get('id');
            echo json_encode($this->Starfleet_model->deleteClass($id));
        }
        
        // Create position
        public function createPosition(){
            // code, name, suggestedRank, suggestExp, department
            $code = $this->input->get('code');
            $name = $this->input->get('name');
            $suggestedRank = $this->input->get('suggestedRank');
            $suggestedExp = $this->input->get('suggestedExp');
            $department = $this->input->get('department');
            echo json_encode($this->Starfleet_model->createPosition($code, $name, $suggestedRank, $suggestedExp, $department));
        }
        
        // Update position
        public function updatePosition(){
            $code = $this->input->get('code');
            $name = $this->input->get('name');
            $suggestedRank = $this->input->get('suggestedRank');
            $suggestedExp = $this->input->get('suggestedExp');
            $department = $this->input->get('department');
            echo json_encode($this->Starfleet_model->updatePosition($code, $name, $suggestedRank, $suggestedExp, $department));
        }        
        
        // Delete position
        public function deletePosition($code){
            echo json_encode($this->Starfleet_model->deletePosition($code));
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
        
        // Get all classes by tech level
        public function getClassesByTechLevel(){
            echo json_encode($this->Starfleet_model->getClassesByTechLevel());
        }
        
        // Get all officers of species on starship
        public function getSpeciesOnStarship(){
            $registryNumber = $this->input->get('registryNumber');
            echo json_encode($this->Starfleet_model->getSpeciesOnStarship($registryNumber));
        }
        
        // Get all officers in department by species
        public function getOfficersInDepartmentBySpecies(){
            echo json_encode($this->Starfleet_model->getOfficersInDepartmentBySpecies());
        }
        
        // Get crew of ship
        public function getShipCrew(){
            $registryNumber = $this->input->get('registryNumber');
            echo json_encode($this->Starfleet_model->getShipCrew($registryNumber));
        }
        
        // Get all unassigned officers
        public function getUnassignedOfficers(){
            echo json_encode($this->getUnassignedOfficers());
        }
        
        // Get all ships with a vacancy
        public function getShipsWithVacancy(){
            $code = $this->input->get('code');
            echo json_encode($this->Starfleet_model->getShipsWithVacancy($code));
        }
        
        // Get all officers best for position
        public function getOfficersForPosition(){
            $code = $this->input->get('code');
            echo json_encode($this->Starfleet_model->getOfficersForPosition($code));
        }
}