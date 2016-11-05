<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Starfleet extends MY_Controller {

	// We really shouldn't need to mess with this. Most of our code will go in the Angular section.
	public function index()
	{
		$this->load->view('template/header', $this->data);
                $this->load->view('template/footer', $this->data);
	}
}
