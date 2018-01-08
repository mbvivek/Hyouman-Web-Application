var programModule = angular.module('programModule');

programModule.controller('programController', function($scope, $rootScope, $location, $stateParams, programService) 
{
	$scope.init = function()
	{
		$scope.session = $rootScope.session;
		$scope.programId = $stateParams.programId;
		$scope.getProgram();
	};

	$scope.getProgram = function()
	{
		programService.getProgram($scope.programId, getProgramOnSuccess, getProgramOnFailure);
	};

	var getProgramOnSuccess = function(response)
	{
		$scope.program = response;
		$scope.getProgramStories();
	};

	var getProgramOnFailure = function()
	{
		$scope.message = "";
		$scope.error = "System Error!";
	};

	$scope.getProgramStories = function()
	{
		programService.getProgramStories($scope.programId, getProgramStoriesOnSuccess, getProgramStoriesOnFailure);
	};

	var getProgramStoriesOnSuccess = function(response)
	{
		$scope.stories = response;
	};

	var getProgramStoriesOnFailure = function()
	{
		$scope.message = "";
		$scope.error = "System Error!";
	};

});

programModule.factory('programService', function($http, APP_CONSTANTS)
{
	var programService = {};

	programService.getProgram = function(programId, onSuccess, onFailure)
	{
		var url = APP_CONSTANTS.REST+"program/getProgram?programId=" +programId;
		$http.get(url)
			.then(
					success = function(response)
					{
						console.log("REST, getProgram, SUCCESS");
						onSuccess(response.data);
					},
					failure = function(response)
					{
						console.log("REST, getProgram, FAILURE");
						onFailure();
					})
	};

	programService.getProgramStories = function(programId, onSuccess, onFailure)
	{
		var url = APP_CONSTANTS.REST+"story/getProgramStories?programId=" +programId;
		$http.get(url)
			.then(
					success = function(response)
					{
						console.log("REST, getProgram, SUCCESS");
						onSuccess(response.data);
					},
					failure = function(response)
					{
						console.log("REST, getProgram, FAILURE");
						onFailure();
					})
	};
	
	return programService;
});