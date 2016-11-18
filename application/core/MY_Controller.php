<?php

class MY_Controller extends CI_Controller {
    public $data;
    
    // Create the controller class and load in default JavaScript and CSS files.
    public function __construct(){
        parent::__construct();
        $this->data['js'] = array();
        $this->data['css'] = array();
        $this->addJs(array(
            'angular/angular.min.js',            
            'angular/angular-animate.min.js',
            'angular/angular-aria.min.js',
            'angular/angular-cookies.min.js',
            'angular/angular-loader.min.js',
            'angular/angular-message-format.min.js',
            'angular/angular-messages.min.js',
            'angular/angular-parse-ext.min.js',
            'angular/angular-resource.min.js',
            'angular/angular-route.min.js',
            'angular/angular-sanitize.min.js',
            'angular/angular-touch.min.js',
            'modules/starfleet.js',
            'controllers/starfleet.js',
            'services/StarfleetService.js',
            'bootstrap/ui.bootstrap.min.js'
        ));
        
        $this->addCss(array(
            'bootstrap/bootstrap-theme.min.css',
            'bootstrap/bootstrap.min.css',
            'default.css'
        ));
    }
    
    // Easily adds JavaScript files.
    public function addJs($js){
        if(gettype($js) === 'string'){
            $this->data['js'][] = $js;
        }else{
            foreach($js as $j){
                $this->data['js'][] = $j;
            }
        }
    }
    
    // Easily adds CSS files.
    public function addCss($css){
        if(gettype($css) === 'string'){
            $this->data['css'][] = $css;
        }else{
            foreach($css as $c){
                $this->data['css'][] = $c;
            }
        }
    }
}
