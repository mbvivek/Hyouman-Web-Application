
var programsModule = angular.module('programsModule');

programsModule.controller('programsController', function($scope, $rootScope, $location, programsService) 
{
	$scope.init = function()
	{
		$scope.session = $rootScope.session;
		$scope.getPrograms(getProgramsOnSuccess, getProgramsOnFailure);
	};

	$scope.getPrograms = function(getProgramsOnSuccess, getProgramsOnFailure)
	{
		programsService.getPrograms(getProgramsOnSuccess, getProgramsOnFailure);
	};

	var getProgramsOnSuccess = function(response)
	{
		if(response != null)
		{
			$scope.programs = response;
		}
	};

	var getProgramsOnFailure = function()
	{

	};

});

programsModule.factory('programsService', function($http, APP_CONSTANTS)
{
	var programsService = {};

	programsService.getPrograms = function(onSuccess, onFailure)
	{
		var query = "program/getPrograms";
		$http.get(APP_CONSTANTS.REST+query)
			.then(
				function success(response)
				{
					console.log("REST, getPrograms, Success");
					onSuccess(response.data);
				},
				function failure()
				{
					console.log("REST, getPrograms, Failure");
					onFailure();
				}
			);
	};

	return programsService;
});