// The default controller for the application.
starfleet.controller('StarfleetController', function($scope, StarfleetService){
    
    /****
     * Utility variables and functions
     ****/
    
    // This is the main function to do service calls.
    $scope.run = function(){
        var op = operationList[$scope.operation];
        StarfleetService.runQuery(op.method, op.data).then(function(data){
            op.resolve(data);
        },function(data){
            op.reject(data);
        });
    };
    
    // Program title
    $scope.title = 'Starfleet Staffing Services';
    
    // The four levels of tech experience that an officer may have, and that a class belongs to.
    $scope.techLevel = [2290, 2330, 2350, 2370];
    
    // The statuses of an officer.
    $scope.statuses = ['Alive', 'Retired', 'Dead'];
    
    // Starship categories
    $scope.categories = ['Battleship', 'Explorer', 'Science'];
    
    // The current operation. Determines which template to display.
    $scope.operation = ''
    
    // Easily hide and show the appropriate forms.
    $scope.setOperation = function(op){
        $scope.operation = op;
    };
    
    // Conveniently display success
    alertSuccess = function(msg){
        $scope.alert = {type: 'success', msg: msg};
    }
    
    // Conveniently display failure
    alertFailure = function(msg){
        $scope.alert = {type: 'success', msg: msg};
    }
    
    /****
     * Initialization calls
     ****/
    
    // Fetch rank list.
    StarfleetService.getRanks().then(function(data){
        $scope.ranks = data;
    },function(data){
        alertFailure('Unable to retrieve ranks.');
    });
    
    // Fetch species list.
    StarfleetService.getSpecies().then(function(data){
        $scope.species = data;
    },function(data){
        alertFailure('Unable to retrieve species list.');
    });
   
    // Get all officers
    StarfleetService.getOfficers().then(function(data){
        console.log(data);
        $scope.officers = data;
    },function(data){
        alertFailure('Unable to retrieve officers.');
    });
    
    // Get all classes
    StarfleetService.getClasses().then(function(data){
        console.log(data);
        $scope.classes = data;
    },function(data){
        alertFailure('Unable to retrieve classes.');
    });
    
    /****
     * SQL calls
     ****/
    
    
    // Objects used for the views
    $scope.newOfficer = {};
    $scope.existingOfficer = {};
    $scope.officerToDelete = {};
    $scope.commissionStarship = {};
    $scope.updateStarship = {};
    $scope.decommissionStarship = {};
    $scope.createPosition = {};
    $scope.updatePosition = {};
    $scope.deletePosition = {};
    $scope.newClass = {};
    $scope.updateClass = {};
    $scope.deleteClass = {};
    
    // This is the variable that holds all the forms, their associated data, calls, and functions for handling success and failure.
    // If using this makes things too confusing, feel free to write your own controller and service calls.
    operationList = {
        'createOfficer': {data: $scope.newOfficer, method: 'createOfficer', resolve: function(data){ alertSuccess('Officer added!'); }, reject: function(data){ alertFailure('Unable to create officer!'); }},
        'updateOfficer': {data: $scope.existingOfficer, method: 'updateOfficer', resolve: function(data){alertSuccess('Officer updated!');}, reject: function(data){alertFailure('Unable to update officer!');}},
        'deleteOfficer': {data: $scope.officerToDelete, method: 'deleteOfficer', resolve: function(data){alertSuccess('Officer deleted!');}, reject: function(data){alertFailure('Unable to delete officer!');}},
        'commissionStarship': {data: $scope.newShip, method: 'commissionStarship', resolve: function(data){alertSuccess('New starship added!');}, reject: function(data){alertFailure('Unable to commission starship!');}},
        'decommissionStarship': {data: $scope.shipToDecommission, method: 'decommissionStarship', resolve: function(data){alertSuccess('Starship decommissioned!');}, reject: function(data){alertFailure('Unable to decommission starship!');}},
        'createClass': {data: $scope.newClass, method: 'createClass', resolve: function(data){alertSuccess('Class created!');}, reject: function(data){alertFailure('Unable to create class!');}},
        'updateClass': {data: $scope.updateClass, method: 'updateClass', resolve: function(data){alertSuccess('Class updated!');}, reject: function(data){alertFailure('Unable to update class!');}},
        'deleteClass': {data: $scope.classToDelete, method: 'deleteClass', resolve: function(data){alertSuccess('Class deleted!');}, reject: function(data){alertFailure('Unable to delete class!');}}
    };
    
    $scope.getOfficer = function(){
        var id = $scope.existingOfficer.officer;
        angular.forEach($scope.officers, function(value,key){
            if(id === value.serviceNumber){
                $scope.existingOfficer = value;
            }
        });
        console.log($scope.existingOfficer);
    }
    
////     Create a new officer in the database.
//    $scope.createOfficer = function(){
//        console.log('createofficer called');
//        console.log($scope.newOfficer);
//        StarfleetService.createOfficer($scope.newOfficer).then(function(data){
//            $scope.alert = {
//                type: 'success',
//                msg: 'Officer added!'
//            };
//        },function(){
//            $scope.alert = {
//                type: 'danger',
//                msg: 'Unable to add officer!'
//            };
//        });
//    };    
});