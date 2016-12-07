// This is where we put Ajax calls to the server.
starfleet.service('StarfleetService', function($q, $http){
    this.api = 'http://lvh.me/starfleet-staffing-services/index.php/Starfleet/';
    
    // Initial service call.
    this.getData = function(){
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: this.api + 'getData'
        }).then(function(data){
            console.log(data);
            deferred.resolve(data.data);
        },function(data){
            deferred.reject();
        });
        return deferred.promise;
    } 
    
    // Generic service call.
    this.runQuery = function(method, data){
        console.log(data);
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: this.api + method,
            params: data,
        }).then(function(data){
            deferred.resolve(data.data);
        },function(data){
            deferred.reject(data);
        });
        return deferred.promise;
    }
    
    // Create an officer in the database.
    this.createOfficer = function(officer){
        console.log(officer);
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: this.api + 'createOfficer',
            params: officer
        }).then(function(data){
            deferred.resolve(data);
        },function(data){
            deferred.reject(data);
        });
        return deferred.promise;
    }
    
});