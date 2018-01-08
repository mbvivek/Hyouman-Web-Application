var storyModule = angular.module('storyModule');

storyModule.controller('storyController', function($scope, $rootScope, $location, $stateParams, storyService)
{

	$scope.$on('user-loggedin', function(event, args) 
	{
		$scope.session = $rootScope.session;
		$scope.init();
	});

	$scope.init = function()
	{
		$scope.session = $rootScope.session;
		$scope.storyId = $stateParams.storyId;
		$scope.getStory();
	};

	$scope.getStory = function()
	{
		storyService.getStory($scope.storyId, getStoryOnSuccess, getStoryOnFailure);
	};

	var getStoryOnSuccess = function(response)
	{
		if(response != null)
		{
			$scope.story = response;
			$scope.getBeneficiary();
			$scope.getStoryDonations();
		}
	};

	var getStoryOnFailure = function()
	{
		$scope.message = "";
		$scope.error = "System Error!";
	};

	$scope.getBeneficiary = function()
	{
		storyService.getBeneficiary($scope.story.userEmail, getBeneficiaryOnSuccess, getBeneficiaryOnFailure);
	};

	var getBeneficiaryOnSuccess = function(response)
	{
		if(response != null)
		{
			$scope.beneficiary = response;
		}
	};

	var getBeneficiaryOnFailure = function()
	{
		$scope.message = "";
		$scope.error = "System Error!";
	};


	$scope.getStoryDonations = function()
	{
		storyService.getStoryDonations($scope.storyId, getStoryDonationsOnSuccess, getStoryDonationsOnFailure);
	};

	var getStoryDonationsOnSuccess = function(response)
	{
		if(response != null)
		{
			$scope.storyDonations = response;
			$scope.getStoryFacts();
		}
	};

	var getStoryDonationsOnFailure = function()
	{
		$scope.message = "";
		$scope.error = "System Error!";
	};


	$scope.getStoryFacts = function()
	{
		var userEmail = null;

		if($scope.session != null && $scope.session.user != null)
		{
			userEmail = $scope.session.user.email;
		}

		var totalDonors = 0;
		var totalDonatedAmount = 0;

		var totalDonations = $scope.storyDonations;
		totalDonations.forEach(function(donation, index)
		{
			if(donation.status == 'completed')
			{
				totalDonors++;
				totalDonatedAmount = totalDonatedAmount + donation.amount;

				if(userEmail != null)
				{
					if(donation.userEmail == userEmail && donation.status == 'completed')
					{
						$scope.alreadyDonated = true;
					}
				}
			}

			if(userEmail != null)
			{
				if(donation.userEmail == userEmail && donation.status == 'saved')
				{
					$scope.savedForLater = true;
				}
			}
			
		});

		console.log("totalDonations = "+totalDonations.length);
		console.log("totalDonors = "+totalDonors);
		console.log("totalDonatedAmount = "+totalDonatedAmount);

		$scope.totalDonors = totalDonors;
		$scope.totalDonatedAmount = totalDonatedAmount;
	};

	$scope.initDonate = function()
	{
		$scope.donationData = {};
		if($scope.session == null || $scope.session == "" || $scope.session.user == null)
		{
			$('#loginModal').modal('toggle');
		}
		else
		{
			//show the donate modal
			$('#donateModal').modal('toggle');
			storyService.getUserCreditCards($scope.session.user.email, getUserCreditCardsOnSuccess, getUserCreditCardsOnFailure);
		}
	};

	$scope.saveForLater = function()
	{
		if($scope.session == null || $scope.session == "" || $scope.session.user == null)
		{
			$('#loginModal').modal('toggle');
		}
		else
		{
			var donation = {};
			donation.userEmail = $scope.session.user.email;
			donation.storyId = parseInt($scope.storyId);
			donation.status = "saved";
			console.log("savedForLater = "+JSON.stringify(donation));
			storyService.addDonation(donation, saveForLaterOnSuccess, saveForLaterOnFailure);
		}
	}

	var saveForLaterOnSuccess = function(response)
	{
		if(response != null)
		{
			if(response == true)
			{
				$scope.savedForLater = true;
			}
			else
			{
				$scope.message = "";
				$scope.error = "Sorry, could not save it for later.";
			}
		}
	};

	var saveForLaterOnFailure = function()
	{
		$scope.message = "";
		$scope.error = "System Error!";
	};

	var getUserCreditCardsOnSuccess = function(response)
	{
		if(response != null)
		{
			$scope.userCreditCards = response;
		}
	};

	var getUserCreditCardsOnFailure = function(response)
	{
		$scope.message = "";
		$scope.error = "";
	};

	$scope.donate = function(donationData)
	{
		var donation = {};
		donation.userEmail = $scope.session.user.email;
		donation.storyId = parseInt($scope.storyId);
		donation.creditCardId = donationData.creditCard.id;
		donation.amount = parseFloat(donationData.amount);
		donation.status = "completed";
		console.log("donation = "+JSON.stringify(donation));
		storyService.addDonation(donation, addDonationOnSuccess, addDonationOnFailure)
	};

	var addDonationOnSuccess = function(response)
	{
		if(response != null)
		{
			if(response == true)
			{
				$scope.init();
				$scope.donationData.status = 'completed';
			}
			else
			{
				$scope.message = "";
				$scope.error = "Sorry, could not process the payment. Please try again later.";
			}
		}
	};

	var addDonationOnFailure = function()
	{
		$scope.message = "";
		$scope.error = "System Error!";
	};

});



storyModule.factory('storyService', function($http, APP_CONSTANTS)
{
	var storyService = {};

	storyService.getStory = function(storyId, onSuccess, onFailure)
	{
		var url = APP_CONSTANTS.REST + "story/getStory?storyId=" + storyId;
		$http.get(url)
			.then(
					success = function(response)
					{
						console.log("REST, getStory, SUCCESS");
						onSuccess(response.data);
					},
					failure = function(response)
					{
						console.log("REST, getStory, FAILURE");
						onFailure();
					}
				);
	};

	storyService.getStoryDonations = function(storyId, onSuccess, onFailure)
	{
		var url = APP_CONSTANTS.REST + "donation/getStoryDonations?storyId=" + storyId;
		$http.get(url)
			.then(
					success = function(response)
					{
						console.log("REST, getStoryDonations, SUCCESS");
						onSuccess(response.data);
					},
					failure = function(response)
					{
						console.log("REST, getStoryDonations, FAILURE");
						onFailure();
					}
				);
	};

	storyService.getBeneficiary = function(userEmail, onSuccess, onFailure)
	{
		var url = APP_CONSTANTS.REST + "user/getUser?email=" + userEmail;
		$http.get(url)
			.then(
					success = function(response)
					{
						console.log("REST, getBeneficiary, SUCCESS = "+JSON.stringify(response.data));
						onSuccess(response.data);
					},
					failure = function(response)
					{
						console.log("REST, getBeneficiary, FAILURE");
						onFailure();
					}
				);
	};

	storyService.getUserCreditCards = function(userEmail, onSuccess, v)
	{
		var url = APP_CONSTANTS.REST + "creditCard/getCreditCards?email=" + userEmail;
		$http.get(url)
			.then(
					success = function(response)
					{
						console.log("REST, getUserCreditCards, SUCCESS = "+JSON.stringify(response.data));
						onSuccess(response.data);
					},
					failure = function(response)
					{
						console.log("REST, getUserCreditCards, FAILURE");
						onFailure();
					}
				);
	};

	storyService.addDonation = function(donation, onSuccess, OnFailure)
	{
		var url = APP_CONSTANTS.REST + "donation/addDonation";
		$http.post(url, donation)
			.then(
					success = function(response)
					{
						console.log("REST, addDonation, SUCCESS");
						onSuccess(response.data);
					},
					failure = function()
					{
						console.log("REST, addDonation, FAILURE");
						onFailure();
					}
				);
	};

	return storyService;
});