// This is where we put Ajax calls to the server.
starfleet.service('StarfleetService', function($q, $http){
    this.api = 'http://lvh.me/starfleet-staffing-services/index.php/Starfleet/';
    
    // Get all the ranks.
    this.getRanks = function(){
        console.log('called');
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: this.api + 'getRanks'
        }).then(function(data){
            deferred.resolve(data.data);
        },function(data){
            deferred.reject(data);
        });
        return deferred.promise;
    },
    
    // Get all species.
    this.getSpecies = function(){
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: this.api + 'getSpecies'
        }).then(function(data){
            deferred.resolve(data.data);
        },function(data){
            deferred.reject(data);
        });
        return deferred.promise;
    },
    
    // Get all officers
    this.getOfficers = function(){
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: this.api + 'getOfficers'
        }).then(function(data){
            deferred.resolve(data.data);
        },function(data){
            deferred.reject(data);
        });
        return deferred.promise;
    }
    
    // Generic service call.
    this.runQuery = function(method, data){
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: this.api + method,
            params: data
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