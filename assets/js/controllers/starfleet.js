// The default controller for the application.
starfleet.controller('StarfleetController', function($scope, StarfleetService){
    
    /****
     * Utility variables and functions
     ****/
    
    // This is the main function to do service calls.
    $scope.run = function(){
        var op = operationList[$scope.operation];
        console.log(op);
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
    $scope.statuses = ['Alive', 'Dead', 'Retired'];
    
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
    
    // Get all the information in one fell swoop.
    StarfleetService.getData().then(function(data){
        $scope.ranks = data.ranks;
        $scope.species = data.species;
        $scope.officers = data.officers;
        $scope.classes = data.classes;
        $scope.starships = data.starships;
        $scope.positions = data.positions;
        $scope.departments = data.departments;
        
        // Objects used for the views
        $scope.newOfficer = {};
        $scope.existingOfficer = {};
        $scope.officerToDelete = {};
        $scope.newShip = {};
        $scope.shipToUpdate = {};
        $scope.shipToDecommission = {};
        $scope.createPosition = {};
        $scope.updatePosition = {};
        $scope.deletePosition = {};
        $scope.newClass = {};
        $scope.updateClass = {};
        $scope.classToDelete = {};

        // Some variables
        $scope.officerIndex = 0; 
        $scope.shipIndex = 0;
        $scope.classIndex = 0;
        $scope.positionIndex = 0;
        
        // This is the variable that holds all the forms, their associated data, calls, and functions for handling success and failure.
        // If using this makes things too confusing, feel free to write your own controller and service calls.
        operationList = {
            'createOfficer': {data: $scope.newOfficer, method: 'createOfficer', resolve: function(data){ alertSuccess('Officer added!'); }, reject: function(data){ alertFailure('Unable to create officer!'); }},
            'updateOfficer': {data: $scope.officers[$scope.officerIndex], method: 'updateOfficer', resolve: function(data){alertSuccess('Officer updated!');}, reject: function(data){alertFailure('Unable to update officer!');}},
            'deleteOfficer': {data: $scope.officerIndex, method: 'deleteOfficer', resolve: function(data){alertSuccess('Officer deleted!');}, reject: function(data){alertFailure('Unable to delete officer!');}},
            'commissionStarship': {data: $scope.newShip, method: 'commissionStarship', resolve: function(data){alertSuccess('New starship added!');}, reject: function(data){alertFailure('Unable to commission starship!');}},
            'updateStarship': {data: $scope.shipToUpdate, method: 'updateStarship', resolve: function(data){alertSuccess('Starship updated!');}, reject: function(data){alertFailure('Unable to update starship!');}},
            'decommissionStarship': {data: $scope.shipToDecommission, method: 'decommissionStarship', resolve: function(data){alertSuccess('Starship decommissioned!');}, reject: function(data){alertFailure('Unable to decommission starship!');}},
            'createClass': {data: $scope.newClass, method: 'createClass', resolve: function(data){alertSuccess('Class created!');}, reject: function(data){alertFailure('Unable to create class!');}},
            'updateClass': {data: $scope.updateClass, method: 'updateClass', resolve: function(data){alertSuccess('Class updated!');}, reject: function(data){alertFailure('Unable to update class!');}},
            'deleteClass': {data: $scope.classToDelete, method: 'deleteClass', resolve: function(data){alertSuccess('Class deleted!');}, reject: function(data){alertFailure('Unable to delete class!');}},
            'listAllOfficersBySpecies': {data: {}, method: 'getAllOfficersBySpecies', resolve: function(data){$scope.speciesCount = data;}, reject: function(data){alertFailure('Unable to get officers');}},
            'listAllUnassignedOfficers': {data: {}, method: 'getAllUnassignedOfficers', resolve: function(data){$scope.unassignedOfficers = data;}, reject: function(data){alertFailure('Unable to get unassigned officers!');}},
            'listAllVacantPositions': {data: {}, method: 'getAllVacantPositions', resolve: function(data){$scope.vacantPositions = data;}, reject: function(data){alertFailure('Unable to get vacant  positions!');}}
        };
        
    },function(data){
        alertFailure('Unable to get information!');
    });  
});