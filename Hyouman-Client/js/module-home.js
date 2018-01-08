
var homeModule = angular.module('homeModule');

homeModule.controller('homeController', function($scope, $rootScope, $location, homeService)
{
	$scope.init = function()
	{
		$scope.getAllPrograms();
		$scope.getAllStories();
		$scope.getAllDonations();
	};

	//____________________________________________________________________

	$scope.getAllPrograms = function()
	{
		homeService.getAllPrograms(getAllProgramsOnSuccess, getAllProgramsOnFailure);
	}

	var getAllProgramsOnSuccess = function(response)
	{
		if(response != null)
		{
			$scope.programs = response;
		}
	};

	var getAllProgramsOnFailure = function()
	{

	};

	//____________________________________________________________________

	$scope.getAllStories = function()
	{
		homeService.getAllStories(getAllStoriesOnSuccess, getAllStoriesOnFailure);
	}

	var getAllStoriesOnSuccess = function(response)
	{
		if(response != null)
		{
			$scope.stories = response;
		}
	};

	var getAllStoriesOnFailure = function()
	{

	};

	//____________________________________________________________________

	$scope.getAllDonations = function()
	{
		homeService.getAllDonations(getAllDonationsOnSuccess, getAllDonationsOnFailure);
	}

	var getAllDonationsOnSuccess = function(response)
	{
		if(response != null)
		{
			$scope.donations = response;
			$scope.totalDonations = 0;

			response.forEach(function(donation, index)
			{
				$scope.totalDonations += donation.amount;
			});
		}
	};

	var getAllDonationsOnFailure = function()
	{

	};

	//____________________________________________________________________
	

});


homeModule.factory('homeService', function($http, APP_CONSTANTS)
{
	var homeService = {};

	homeService.getAllPrograms = function(onSuccess, onFailure)
	{
		url = APP_CONSTANTS.REST + "program/getPrograms";
		$http.get(url)
			.then(
					success = function(response)
					{
						console.log("REST, getAllPrograms, SUCCESS");
						onSuccess(response.data);
					},
					failure = function()
					{
						console.log("REST, getAllPrograms, FAILURE");
						onFailure();
					}
				);
	};

	homeService.getAllStories = function(onSuccess, onFailure)
	{
		url = APP_CONSTANTS.REST + "story/getAllStories";
		$http.get(url)
			.then(
					success = function(response)
					{
						console.log("REST, getAllPrograms, SUCCESS");
						onSuccess(response.data);
					},
					failure = function()
					{
						console.log("REST, getAllPrograms, FAILURE");
						onFailure();
					}
				);
	};

	homeService.getAllDonations = function(onSuccess, onFailure)
	{
		url = APP_CONSTANTS.REST + "donation/getAllDonations";
		$http.get(url)
			.then(
					success = function(response)
					{
						console.log("REST, getAllPrograms, SUCCESS");
						onSuccess(response.data);
					},
					failure = function()
					{
						console.log("REST, getAllPrograms, FAILURE");
						onFailure();
					}
				);
	};

	return homeService;
});