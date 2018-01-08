var storiesModule = angular.module('storiesModule');

storiesModule.controller('storiesController', function($scope, $rootScope, $location, $stateParams, storiesService)
{
	$scope.init = function()
	{
		$scope.session = $rootScope.session;
		$scope.programId = $stateParams.programId;
		console.log("programId = "+$scope.programId);
		$scope.getProgram();
	};

	$scope.getProgram = function()
	{
		storiesService.getProgram($scope.programId, getProgramOnSuccess, getProgramOnFailure);
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
		storiesService.getProgramStories($scope.programId, getProgramStoriesOnSuccess, getProgramStoriesOnFailure);
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


storiesModule.factory('storiesService', function($http, APP_CONSTANTS)
{
	var storiesService = {};

	storiesService.getProgram = function(programId, onSuccess, onFailure)
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

	storiesService.getProgramStories = function(programId, onSuccess, onFailure)
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

	return storiesService;
});