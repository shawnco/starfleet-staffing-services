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
}
