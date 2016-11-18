// This is where we put Ajax calls to the server.
starfleet.service('StarfleetService', function($q, $http){
    this.api = 'http://lvh.me/starfleet-staffing-services/index.php/';
    
    // Get all the ranks.
    this.getRanks = function(){
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: this.api + 'Starfleet/getRanks'
        }).then(function(data){
            deferred.resolve(data.data);
        },function(data){
            deferred.reject(data);
        });
        return deferred.promise;
    }
});