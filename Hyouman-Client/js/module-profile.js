var profileModule = angular.module('profileModule');

//______________ MAIN CONTROLLER __________________________________________________________________________________________________________
//_________________________________________________________________________________________________________________________________________

profileModule.controller('profileController', function($scope, $rootScope, $location) 
{

});

profileModule.controller('personalInfoController', function($scope, $rootScope, $location, personalInfoService) 
{
	$scope.initPersonalInfo = function()
	{
		$('footer').hide();
		$scope.session = $rootScope.session;
		var email = $scope.session.user.email;
		personalInfoService.getProfile(email, getProfileOnSuccess, getProfileOnFailure);
	}

	var getProfileOnSuccess = function(response)
	{
		$scope.profile = response;
	};

	var getProfileOnFailure = function()
	{

	};

	$scope.editProfile = function() 
	{
		$scope.tempProfile = angular.copy($scope.profile);
	}

	$scope.updateProfile = function(tempProfile, currentModal) 
	{
		console.log("tempProfile = "+JSON.stringify(tempProfile));
		personalInfoService.updateProfile(tempProfile, updateProfileOnSuccess, updateProfileOnFailure);
		$(currentModal).modal('toggle');
	};

	var updateProfileOnSuccess = function(response)
	{
		if(response != null)
		{
			console.log("profile updated = "+JSON.stringify(response));
			$scope.profile = response;
			$scope.session.user = $scope.profile;
			$rootScope.session.user = $scope.profile;
		}
		else
		{
			$scope.error = "Error while updating your profile.";
		}
		
	};

	var updateProfileOnFailure = function()
	{
		$scope.error = "Error while updating your profile.";
	};
	
});

profileModule.factory('personalInfoService', function($http, APP_CONSTANTS)
{
	var personalInfoService = {};

	personalInfoService.getProfile = function(email, onSuccess, onFailure)
	{
		var query = "user/getUser?email="+email;
		$http.get(APP_CONSTANTS.REST+query)
			.then(
				function success(response)
				{
					console.log("REST, getProfile, Success = "+JSON.stringify(response.data));
					onSuccess(response.data);
				},
				function failure()
				{
					console.log("REST, getProfile, Failure");
					onFailure();
				}
			);
	};

	personalInfoService.updateProfile = function(profile, onSuccess, onFailure)
	{
		var query = "user/updateUser";
		$http.post(APP_CONSTANTS.REST+query, profile)
			.then(
				function success(response)
				{
					console.log("REST, updateProfile, Success = "+JSON.stringify(response.data));
					onSuccess(response.data);
				},
				function failure(response)
				{
					console.log("REST, updateProfile, Failure");
					onFailure();
				}
			);
	};

	return personalInfoService;

});


//______________ PAYMENT INFO CONTROLLER ____________________________________________________________________________________________________
//___________________________________________________________________________________________________________________________________________

profileModule.controller('paymentInfoController', function($scope, $rootScope, $location, paymentInfoService) 
{

	$scope.initPaymentInfo = function()
	{
		$('footer').hide();
		$scope.session = $rootScope.session;
		var email = $scope.session.user.email;
		$scope.creditCards = {};
		paymentInfoService.getCreditCards(email, getCreditCardsOnSuccess, getCreditCardsOnFailure);
	}

	$scope.getCreditCards = function()
	{
		var email = $scope.session.user.email;
		paymentInfoService.getCreditCards(email, getCreditCardsOnSuccess, getCreditCardsOnFailure);
	};

	var getCreditCardsOnSuccess = function(response)
	{
		$scope.creditCards = response;
	};

	var getCreditCardsOnFailure = function()
	{

	};

	$scope.addCreditCard = function(creditCard, currentModal) 
	{
		var email = $scope.session.user.email;
		var card = {};
		card.userEmail = email;
		card.nameOnCard = creditCard.nameOnCard;
		card.cardNumber = ""+creditCard.number_1_4+creditCard.number_5_8+creditCard.number_9_12+creditCard.number_13_16;
		card.cvv = creditCard.cvv;
		card.expiryMonth = creditCard.expiryMonth;
		card.expiryYear = creditCard.expiryYear;

		console.log("addingCreditCard = "+JSON.stringify(card));
		paymentInfoService.addCreditCard(card, addCreditCardOnSuccess, addCreditCardOnFailure, currentModal);
	};

	var addCreditCardOnSuccess = function(response, currentModal)
	{
		$scope.getCreditCards();
		$(currentModal).modal('toggle');
	};

	var addCreditCardOnFailure = function()
	{
		$scope.error = "Error in adding this card.";
	};

	$scope.initDeleteCreditCard = function(creditCard)
	{
		$scope.cardToDelete = creditCard;
	};

	$scope.deleteCreditCard = function(creditCard, currentModal) 
	{
		console.log("deletingCreditCard = "+JSON.stringify(creditCard));
		paymentInfoService.deleteCreditCard(creditCard, deleteCreditCardOnSuccess, deleteCreditCardOnFailure, currentModal);
	};

	var deleteCreditCardOnSuccess = function(response, currentModal)
	{
		$scope.getCreditCards();
		$scope.message = "Card Removed!";
		$scope.error = "";
		$(currentModal).modal('toggle');
	};

	var deleteCreditCardOnFailure = function()
	{
		$scope.message = "";
		$scope.error = "Error in deleting this card.";
	};

});

profileModule.factory('paymentInfoService', function($http, APP_CONSTANTS)
{
	var paymentInfoService = {};

	paymentInfoService.getCreditCards = function(email, onSuccess, onFailure)
	{
		var query = "creditCard/getCreditCards?email="+email;
		$http.get(APP_CONSTANTS.REST+query)
			.then(
				function success(response)
				{
					console.log("REST, getCreditCards, Success = "+JSON.stringify(response.data));
					onSuccess(response.data);
				},
				function failure()
				{
					console.log("REST, getCreditCards, Failure");
					onFailure();
				}
			);
	};

	paymentInfoService.addCreditCard = function(creditCard, onSuccess, onFailure, currentModal)
	{
		var query = "creditCard/addCreditCard";
		$http.post(APP_CONSTANTS.REST+query, creditCard)
			.then(
				function success(response)
				{
					console.log("REST, addCreditCard, Success = "+JSON.stringify(response.data));
					onSuccess(response.data, currentModal);
				},
				function failure(response)
				{
					console.log("REST, addCreditCard, Failure");
					onFailure();
				}
			);
	};

	paymentInfoService.deleteCreditCard = function(creditCard, onSuccess, onFailure, currentModal)
	{
		var query = "creditCard/deleteCreditCard";
		$http.post(APP_CONSTANTS.REST+query, creditCard)
			.then(
				function success(response)
				{
					console.log("REST, deleteCreditCard, Success = "+JSON.stringify(response.data));
					onSuccess(response.data, currentModal);
				},
				function failure()
				{
					console.log("REST, deleteCreditCard, Failure");
					onFailure();
				}
			);
	};

	return paymentInfoService;
});


//______________ USER STORIES CONTROLLER _________________________________________________________________________________________________________
//________________________________________________________________________________________________________________________________________________

profileModule.controller('userStoriesController', function($scope, $rootScope, $location, userStoriesService) 
{
	$scope.initUserStories = function()
	{
		$('footer').hide();
		$scope.session = $rootScope.session;
		if($scope.session.user == null || $scope.session.user == "")
		{
			$location.path("/home");
		}

		$scope.getPrograms();
		$scope.getUserStories();
	};

	$scope.getPrograms = function()
	{
		userStoriesService.getPrograms(getProgramsOnSuccess, getProgramsOnFailure);
	};

	var getProgramsOnSuccess = function(response)
	{
		if(response != null)
		{
			$scope.programs = response;
			console.log("$scope.programs");
		}
	};

	var getProgramsOnFailure = function()
	{

	};

	$scope.getUserStories = function()
	{
		userStoriesService.getUserStories($scope.session.user.email, getUserStoriesOnSuccess, getUserStoriesOnFailure);
	};

	var getUserStoriesOnSuccess = function(response)
	{
		if(response != null)
		{
			$scope.userStories = response;
			console.log("$scope.userStories");
		}
	};

	var getUserStoriesOnFailure = function()
	{

	};

	$scope.addStory = function(story)
	{
		story.userEmail = $scope.session.user.email;
		story.programId = $scope.selectedProgram.id;
		console.log("startDate, endDate = "+story.startDate+", "+story.endDate);
		var addStoryStartDate = ""+story.startDate;
		var addStoryEndDate = ""+story.endDate;
		story.startDate = addStoryStartDate.substring(4, 15);
		story.endDate = addStoryEndDate.substring(4, 15);
		console.log("startDate, endDate = "+story.startDate+", "+story.endDate);
		userStoriesService.addStory(story, addStoryOnSuccess, addStoryOnFailure);
	};

	var addStoryOnSuccess = function(response)
	{
		if(response != null)
		{
			$scope.getUserStories();
		}
	};

	var addStoryOnFailure = function()
	{
		$scope.message = "";
		$scope.error = "Error while adding the story.";
	};
	
});

profileModule.factory('userStoriesService', function($http, APP_CONSTANTS)
{
	var userStoriesService = {};

	userStoriesService.getPrograms = function(onSuccess, onFailure)
	{
		var query = "program/getPrograms";
		$http.get(APP_CONSTANTS.REST+query)
			.then(
					success = function(response)
					{
						console.log("REST, getPrograms, SUCCESS");
						onSuccess(response.data);
					},
					failure = function()
					{
						console.log("REST, getPrograms, FAILURE");
						onFailure();
					}
			);
	};

	userStoriesService.getUserStories = function(email, onSuccess, onFailure)
	{
		var query = "story/getUserStories?userEmail="+email;
		$http.get(APP_CONSTANTS.REST+query)
			.then(
					success = function(response)
					{
						console.log("REST, getUserStories, SUCCESS");
						onSuccess(response.data);
					},
					failure = function()
					{
						console.log("REST, getUserStories, FAILURE");
						onFailure();
					}
			);
	};

	userStoriesService.addStory = function(story, onSuccess, onFailure)
	{
		var query = "story/addStory";
		$http.post(APP_CONSTANTS.REST+query, story)
			.then(
					success = function(response)
					{
						console.log("REST, addStory, SUCCESS");
						onSuccess(response.data);
					},
					failure = function()
					{
						console.log("REST, addStory, FAILURE");
						onFailure();
					}
			);
	}

	return userStoriesService;
});


//______________ USER DONATIONS CONTROLLER ____________________________________________________________________________________________________
//_____________________________________________________________________________________________________________________________________________

profileModule.controller('userDonationsController', function($scope, $rootScope, $location, userDonationsService) 
{
	//=====================================================================
	$scope.initDonationsInfo = function()
	{
		$('footer').hide();
		$scope.session = $rootScope.session;
		if($scope.session.user == null || $scope.session.user == "")
		{
			$location.path("/home");
		}
		else
		{
			var userEmail = $scope.session.user.email;
			userDonationsService.getUserDonations(userEmail, initDonationsInfoOnSuccess, initDonationsInfoOnFailure);
		}
	};

	var initDonationsInfoOnSuccess = function(response)
	{
		$scope.userDonations = response;
	};

	var initDonationsInfoOnFailure = function()
	{
		$scope.message = "";
		$scope.error = "System Error!";
	};
	//=====================================================================
});

profileModule.factory('userDonationsService', function($http, APP_CONSTANTS)
{
	var userDonationsService = {};

	userDonationsService.getUserDonations = function(userEmail, onSuccess, onFailure)
	{
		var url = APP_CONSTANTS.REST + "donation/getUserDonations?userEmail=" + userEmail;
		$http.get(url)
			.then(
					success = function(response)
					{
						console.log("REST, getUserDonations, SUCCESS");
						onSuccess(response.data);
					},
					failure = function()
					{
						console.log("REST, getUserDonations, FAILURE");
						onFailure();
					}
				);
	};

	return userDonationsService;
});


//______________ CART CONTROLLER ____________________________________________________________________________________________________
//_____________________________________________________________________________________________________________________________________________

profileModule.controller('cartController', function($scope, $rootScope, $location, cartService) 
{
	//=====================================================================
	$scope.initCart = function()
	{
		$('footer').hide();
		$scope.session = $rootScope.session;
		if($scope.session.user == null || $scope.session.user == "")
		{
			$location.path("/home");
		}
		else
		{
			var userEmail = $scope.session.user.email;
			cartService.getUserDonations(userEmail, getUserDonationsOnSuccess, getUserDonationsOnFailure);
		}
	};

	var getUserDonationsOnSuccess = function(response)
	{
		$scope.userDonations = response;
		$scope.loadCart();
	};

	var getUserDonationsOnFailure = function()
	{
		$scope.message = "";
		$scope.error = "System Error!";
	};

	
	//________________________________________________________________________

	$scope.loadCart = function()
	{
		var cart = [];

		var userDonations = $scope.userDonations;
		userDonations.forEach(function(donation, index)
			{
				if(donation.status == 'saved')
				{
					cart.push(donation);
				}
			});

		$scope.cart = cart;
		$scope.totalAmount = 0;
		console.log("cart = "+JSON.stringify(cart));
	};

	//______________________________________________________________________

	$scope.calcTotalAmount = function()
	{
		var cart = $scope.cart;

		$scope.totalAmount = 0;
		cart.forEach(function(item, index)
		{
			if(item.checked == true)
			{
				$scope.totalAmount = $scope.totalAmount + item.amount;
			}
		});
	};


	//______________________________________________________________________

	$scope.initDonate = function()
	{
		console.log("initDonate() clicked..");
		$('#donateFromCartModal').modal('toggle');
		$scope.donationData = {};
		cartService.getUserCreditCards($scope.session.user.email, getUserCreditCardsOnSuccess, getUserCreditCardsOnFailure);
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

	//_______________________________________________________________________

	$scope.donate = function(donationData)
	{
		$scope.donationData.totalAmount = $scope.totalAmount;

		var cart = $scope.cart;
		cart.forEach(function(item, index)
		{
			if(item.checked == true)
			{
				var donation = {};
				donation.id = item.id;
				donation.userEmail = $scope.session.user.email;
				donation.storyId = parseInt(item.story.id);
				donation.creditCardId = donationData.creditCard.id;
				donation.amount = parseFloat(item.amount);
				donation.status = "completed";
				console.log("donation = "+JSON.stringify(donation));
				cartService.addDonation(donation, addDonationOnSuccess, addDonationOnFailure)
			}
		});

		
	};

	var addDonationOnSuccess = function(response)
	{
		if(response != null)
		{
			if(response == true)
			{
				$scope.initCart();
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

profileModule.factory('cartService', function($http, APP_CONSTANTS)
{
	var cartService = {};

	cartService.getUserDonations = function(userEmail, onSuccess, onFailure)
	{
		var url = APP_CONSTANTS.REST + "donation/getUserDonations?userEmail=" + userEmail;
		$http.get(url)
			.then(
					success = function(response)
					{
						console.log("REST, getCart, SUCCESS");
						onSuccess(response.data);
					},
					failure = function()
					{
						console.log("REST, getUserDonations, FAILURE");
						onFailure();
					}
				);
	};

	cartService.getUserCreditCards = function(userEmail, onSuccess, onFailure)
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

	cartService.addDonation = function(donation, onSuccess, OnFailure)
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

	return cartService;
});

