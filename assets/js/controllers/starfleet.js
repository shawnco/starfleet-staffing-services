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
    
    $scope.updateOfficer = function(index){
        var data = $scope.officers[index];
        console.log(data);
        StarfleetService.runQuery('updateOfficer', data).then(function(data){
            operationList.updateOfficer.resolve(data);
        },function(data){
            operationList.updateOfficer.reject(data);
        });
    };
    
    $scope.deleteOfficer = function(index){
        StarfleetService.runQuery('deleteOfficer', {serviceNumber: index}).then(function(data){
            operationList.deleteOfficer.resolve(data);
        },function(data){
            operationList.deleteOfficer.reject(data);
        });
    };
    
    $scope.updateStarship = function(index){
        StarfleetService.runQuery('updateStarship', $scope.starships[index]).then(function(data){
            operationList.updateStarship.resolve(data);
        },function(data){
            operationList.updateStarship.reject(data);
        });
    };
    
    $scope.decommissionStarship = function(index){
        console.log(index);
        StarfleetService.runQuery('decommissionStarship', {registryNumber: index}).then(function(data){
            operationList.decommissionStarship.resolve(data);
        },function(data){
            operationList.decommissionStarship.reject(data);
        });
    };
    
    $scope.updateClas = function(index){
        StarfleetService.runQuery('updateClass', $scope.classes[index]).then(function(data){
            operationList.updateClass.resolve(data);
        },function(data){
            operationList.updateClass.reject(data);
        });
    };
    
    $scope.deleteClass = function(index){
        StarfleetService.runQuery('deleteClass', {id: index}).then(function(data){
            console.log(data);
            operationList.deleteClass.resolve(data);
        },function(data){
            operationList.deleteClass.reject(data);
        });
    };
    
    $scope.destroyStarship = function(index){
        StarfleetService.runQuery('destroyStarship', {registryNumber: index}).then(function(data){
            operationList.destroyStarship.resolve(data);
        },function(data){
            operationList.destroyStarship.reject(data);
        });
    };
    
    $scope.updatePosition = function(index){
        StarfleetService.runQuery('updatePosition', $scope.positions[index]).then(function(data){
            operationList.updatePosition.resolve(data);
        },function(data){
            operationList.updatePosition.reject(data);
        });
    };
    
    $scope.deletePosition = function(index){
        StarfleetService.runQuery('deletePosition', $scope.positions[index].code).then(function(data){
            operationList.deletePosition.resolve(data);
        },function(data){
            operationList.deletePosition.reject(data);
        });
    };
    
    $scope.getSpeciesOnStarship = function(index){
        StarfleetService.runQuery('getSpeciesOnStarship', {registryNumber: index}).then(function(data){
            operationList.getSpeciesOnStarship.resolve(data);
        },function(data){
            operationList.getSpeciesOnStarship.reject(data);
        });
    };
    
    $scope.getShipCrew = function(index){
        StarfleetService.runQuery('getShipCrew', {registryNumber: index}).then(function(data){
            operationList.getShipCrew.resolve(data);
        },function(data){
            operationList.getShipCrew(data);
        });
    };
    
    $scope.getShipsWithVacancy = function(code){
        StarfleetService.runQuery('getShipsWithVacancy', {code: code}).then(function(data){
            operationList.getShipsWithVacancy.resolve(data);
        },function(data){
            operationList.getShipsWithVacancy.reject(data);
        });
    };
    
    $scope.getOfficersForPosition = function(code){
        StarfleetService.runQuery('getOfficersForPosition', {code: code}).then(function(data){
            operationList.getOfficersForPosition.resolve(data);
        },function(data){
            operationList.getOfficersForPosition.reject(data);
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
        $scope.newPosition = {};
        $scope.newClass = {};
        $scope.updateClass = {};
        $scope.classToDelete = {};

        // Some variables
        $scope.officerIndex = -1; 
        $scope.shipIndex = -1;
        $scope.classIndex = -1;
        $scope.positionIndex = -1;
        
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
            'listAllUnassignedOfficers': {data: {}, method: 'getAllUnassignedOfficers', resolve: function(data){$scope.unassignedOfficers = data;console.log(data);}, reject: function(data){alertFailure('Unable to get unassigned officers!');}},
            'listAllVacantPositions': {data: {}, method: 'getAllVacantPositions', resolve: function(data){$scope.vacantPositions = data;}, reject: function(data){alertFailure('Unable to get vacant  positions!');}},
            'destroyStarship': {data: {}, method: 'destroyStarship', resolve: function(data){alertSuccess('Starship was destroyed with all crew lost!');}, reject: function(data){alertFailure('Unable to destroy starship!');}},
            'createPosition': {data: $scope.newPosition, method: 'createPosition', resolve:function(data){alertSuccess('Position created!');},reject:function(data){alertFailure('Unable to create position!');}},
            'updatePosition': {data: {}, method: 'createPosition', resolve:function(data){alertSuccess('Position updated!');},reject:function(data){alertFailure('Unable to update position!');}},
            'deletePosition': {data: {}, method: 'createPosition', resolve:function(data){alertSuccess('Position deleted!');},reject:function(data){alertFailure('Unable to delete position!');}},
            'getClassesByTechLevel': {data:{}, method:'getClassesByTechLevel', resolve:function(data){$scope.classesByTechLevel = data;}, reject:function(data){alertFailure('Unable to get classes!');}},
            'getSpeciesOnStarship': {data:$scope.registryNumber, method:'getSpeciesOnStarship', resolve:function(data){$scope.speciesOnStarship = data;}, reject:function(data){alertFailure('Unable to get species count!')}},
            'getOfficersInDepartmentBySpecies': {data:{}, method:'getOfficersInDepartmentBySpecies', resolve:function(data){$scope.deptBySpecies = data;console.log(data);}, reject:function(data){alertFailure('Unable to retrieve species information!');}},
            'getShipCrew': {method:'getShipCrew', resolve:function(data){$scope.shipCrew = data;}, reject:function(data){alertFailure('Unable to get ship crew!');}},
            'getShipsWithVacancy': {method:'getShipsWithVacancy', resolve:function(data){$scope.shipsWithVacancy = data;}, reject:function(data){alertFailure('Unable to get ships with vacant position!');}},
            'getOfficersForPosition': {method:'getOfficersForPosition', resolve:function(data){$scope.officersForPosition = data;}, reject:function(data){alertFailure('Unable to get officers for position!');}}
        };
        
    },function(data){
        alertFailure('Unable to get information!');
    }); 
    
    $scope.showIndex = function(index){
        console.log(index);
        console.log($scope.classes[index]);
    }
    
});