<html ng-app="starfleet" ng-controller="StarfleetController">
    <head>
        <title>{{title}}</title>
        <?php
        // Include our CSS files.
        foreach($css as $c){
            ?><link rel="stylesheet" type="text/css" href="http://lvh.me/starfleet-staffing-services/assets/css/<?php echo $c; ?>"/><?php
        }
        ?>
    </head>
    <body ng-include="'/starfleet-staffing-services/application/views/main.html'">
        