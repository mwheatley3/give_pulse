angular.module('myApp.services',[])

.factory('Service', function($http, $window, $location){
	var service = {};

  service.getData = function(){
    return $http({
      method:'GET',
      url: '/data'
    })
    .then(function(resp) {
      return resp.data || [];
    })
    .catch(function(error) {
      console.error(error);
    })
  }

  service.getData2 = function(){
    return $http({
      method:'GET',
      url: '/data2'
    })
    .then(function(resp) {
      return resp.data || [];
    })
    .catch(function(error) {
      console.error(error);
    })
  }
	
	return service;

})