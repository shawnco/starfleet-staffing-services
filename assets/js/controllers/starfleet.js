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
        $scope.officers = data;
    },function(data){
        alertFailure('Unable to retrieve officers.');
    });
    
    // Get all classes
    StarfleetService.getClasses().then(function(data){
        $scope.classes = data;
    },function(data){
        alertFailure('Unable to retrieve classes.');
    });
    
    // Get all starships
    StarfleetService.getStarships().then(function(data){
        $scope.starships = data;
    },function(data){
        alertFailure('Unable to retrieve starships!');
    });
    
    /****
     * SQL calls
     ****/
    
    
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
    $scope.deleteClass = {};
    
    // This is the variable that holds all the forms, their associated data, calls, and functions for handling success and failure.
    // If using this makes things too confusing, feel free to write your own controller and service calls.
    operationList = {
        'createOfficer': {data: $scope.newOfficer, method: 'createOfficer', resolve: function(data){ alertSuccess('Officer added!'); }, reject: function(data){ alertFailure('Unable to create officer!'); }},
        'updateOfficer': {data: $scope.existingOfficer, method: 'updateOfficer', resolve: function(data){alertSuccess('Officer updated!');}, reject: function(data){alertFailure('Unable to update officer!');}},
        'deleteOfficer': {data: $scope.officerToDelete, method: 'deleteOfficer', resolve: function(data){alertSuccess('Officer deleted!');}, reject: function(data){alertFailure('Unable to delete officer!');}},
        'commissionStarship': {data: $scope.newShip, method: 'commissionStarship', resolve: function(data){alertSuccess('New starship added!');}, reject: function(data){alertFailure('Unable to commission starship!');}},
        'updateStarship': {data: $scope.shipToUpdate, method: 'updateStarship', resolve: function(data){alertSuccess('Starship updated!');}, reject: function(data){alertFailure('Unable to update starship!');}},
        'decommissionStarship': {data: $scope.shipToDecommission, method: 'decommissionStarship', resolve: function(data){alertSuccess('Starship decommissioned!');}, reject: function(data){alertFailure('Unable to decommission starship!');}},
        'createClass': {data: $scope.newClass, method: 'createClass', resolve: function(data){alertSuccess('Class created!');}, reject: function(data){alertFailure('Unable to create class!');}},
        'updateClass': {data: $scope.updateClass, method: 'updateClass', resolve: function(data){alertSuccess('Class updated!');}, reject: function(data){alertFailure('Unable to update class!');}},
        'deleteClass': {data: $scope.classToDelete, method: 'deleteClass', resolve: function(data){alertSuccess('Class deleted!');}, reject: function(data){alertFailure('Unable to delete class!');}},
        'listAllOfficersBySpecies': {data: {}, method: 'getAllOfficersBySpecies', resolve: function(data){$scope.speciesCount = data;}, reject: function(data){alertFailure('Unable to get officers');}},
        'listAllUnassignedOfficers': {data: {}, method: 'getAllUnassignedOfficers', resolve: function(data){$scope.unassignedOfficers = data;}, reject: function(data){alertFailure('Unable to get unassigned officers!');}},
        'listAllVacantPositions': {data: {}, method: 'getAllVacantPositions', resolve: function(data){$scope.vacantPositions = data;}, reject: function(data){alertFailure('Unable to get vacan  positions!');}}
    };
    
    $scope.getOfficer = function(){
        var id = $scope.existingOfficer.officer;
        angular.forEach($scope.officers, function(value,key){
            if(id === value.serviceNumber){
                
                // Better do it all manually.
                $scope.existingOfficer.officer = value.serviceNumber;
                $scope.existingOfficer.rank = value.rank;
                $scope.existingOfficer.fname = value.fname;
                $scope.existingOfficer.lname = value.lname;
                $scope.existingOfficer.techLevel = value.techLevel;
                $scope.existingOfficer.species = value.species;
                $scope.existingOfficer.status = value.status;
            }
        });
    };
    
    $scope.getStarship = function(){
        console.log($scope.shipToUpdate);
        var id = $scope.shipToUpdate.id;
        angular.forEach($scope.starships, function(value,key){
            if(id === value.registryNumber){
                $scope.shipToUpdate.id = value.registryNumber;
                $scope.shipToUpdate.name = value.name;
                $scope.shipToUpdate.class = value.class;
            }
        });
    };
    
    $scope.getClass = function(){
        var id = $scope.updateClass.id;
        angular.forEach($scope.classes, function(value,key){
            if(id === value.id){
                $scope.updateClass.id = value.id;
                $scope.updateClass.name = value.name;
                $scope.updateClass.category = value.category;
                $scope.updateClass.crewSize = value.crewSize;
                $scope.updateClass.maxSpeed = value.maxSpeed;
                $scope.updateClass.fuelCapacity = value.fuelCapacity;
                $scope.updateClass.techLevel = value.techLevel;
                
                switch ($scope.updateClass.category) {
                    case 'Battleship':
                        $scope.updateClass.phaserStrength = value.phaserStrength;
                        $scope.updateClass.torpedoType = value.torpedoType;
                        break;
                    case 'Explorer':
                        $scope.updateClass.regionSpecialty = value.regionSpecialty;
                        break;
                    case 'Science':
                        $scope.updateClass.sensorRange = value.sensorRange;
                        $scope.updateClass.labType = value.labType;
                        break;
                    default:
                        alertFailure('There was an error retrieving class.');
                }
            }
        })
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