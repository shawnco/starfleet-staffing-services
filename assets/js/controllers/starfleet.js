// The default controller for the application.
starfleet.controller('StarfleetController', function($scope, StarfleetService){
    $scope.title = 'Starfleet Staffing Services';
    
    // The current operation. Determines which template to display.
    $scope.operation = ''
    
    $scope.setOperation = function(op){
        console.log(op);
        $scope.operation = op;
        console.log($scope.operation);
    }
    
    StarfleetService.getRanks().then(function(data){
        $scope.ranks = data;
        console.log($scope.ranks);
    },function(data){
        $scope.alert = {
            type: 'danger',
            msg: 'Unable to retrieve ranks.'
        };
    });
    
    $scope.createOfficer = function(){
        
    }
});