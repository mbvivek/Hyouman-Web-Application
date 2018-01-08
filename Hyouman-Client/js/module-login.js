
var loginModule = angular.module('loginModule');

loginModule.controller('loginController', function($scope, $rootScope, $location, $window, loginService) 
{

	$scope.init = function()
	{
		loginService.checkForExistingUserSession(checkForExistingUserSessionOnSuccess);
	};

	var checkForExistingUserSessionOnSuccess = function(response)
	{
		$scope.session = JSON.parse(response);
		$rootScope.session = $scope.session;
	};

	$scope.login = function()
	{
		var email 		= $scope.email;
		var password 	= $scope.password;
		loginService.validateUserAccount(email, password, validateUserAccountOnSuccess, validateUserAccountOnFailure);
	};

	var validateUserAccountOnSuccess = function(response)
	{
		if(response.valid == true)
		{
			var status = response.status;
			if(status == 'active')
			{
				loginService.getUserData(response.email, getUserDataOnSuccess, getUserDataOnFailure);
			}
			else if(status  == 'blocked')
			{
				$scope.message = "Your account is blocked for some reason. Please contact the administrator.";
				$scope.error = "";
			}
			else
			{	
				$scope.message = "You account yet to be activated. Please check your email for the activation link.";
				$scope.error = "";
			}
		}
		else
		{
			$scope.message = "";
			$scope.error = "Invalid Credentials!";
		}
	};

	var validateUserAccountOnFailure = function()
	{
		$scope.error = "System Error!";
	};

	var getUserDataOnSuccess = function(response)
	{
		if(response != "NULL")
		{
			$scope.session = {};
			$scope.session.valid = "true";
			$scope.session.user = response;
			$rootScope.session = $scope.session;

			//save the session in the local storage
			$window.localStorage.session = JSON.stringify($scope.session);

			//close the login modal
			$('#loginModal').modal('toggle');

			$rootScope.$broadcast('user-loggedin');
		}
	};

	var getUserDataOnFailure = function()
	{
		console.log('unable to fetch user data')
		$scope.message = "";
		$scope.error = "System Error!";
	};

	$scope.signup = function()
	{
		console.log("user registration..");
		var userDob = ""+$scope.dob;
		$scope.userDob = userDob.substring(4, 15);
		var userData = 
		{
			"email" 	: $scope.email,
			"password"	: $scope.password,
			"firstName"	: $scope.firstName,
			"lastName"	: $scope.lastName,
			"phone"		: $scope.phone,
			"dob"		: $scope.userDob,
			"admin"		: false
		};

		console.log("userData = "+userData);

		loginService.signUpUser(userData, signUpOnSuccess, signUpOnFailure);
	}

	var signUpOnSuccess = function(response)
	{
		if(response == true)
		{
			$scope.message = "";
			$scope.message = "Registration Successful!";
		}
		else
		{
			$scope.message = "";
			$scope.error = "An account already exists with this email.";
		}
	};

	var signUpOnFailure = function()
	{
		clearFields();
		$scope.error = "System Error!";
	};

	$scope.logout = function()
	{
		//clear the session
		$rootScope.session = null;
		$scope.session = null;

		//clear the session in the local storage
		$window.localStorage.session = null;

		//clear the fields
		clearFields();

		$location.path("#home");
		console.log("logged out");
	}

	$scope.clearFields = function()
	{
		clearFields();
	};

	var clearFields = function()
	{
		$scope.message = "";
		$scope.error = "";
		$scope.email = "";
		$scope.password = "";
		$scope.firstName = "";
		$scope.lastName = "";
		$scope.phone = "";
		$scope.dob = "";
	};

});

loginModule.factory('loginService', function($window, $http, APP_CONSTANTS)
{
	var loginService = {};

	loginService.validateUserAccount = function(email, password, onSuccess, onFailure)
	{
		var query = "userAccount/authenticateUser?email="+email+"&password="+password;
		$http.get(APP_CONSTANTS.REST+query)
			.then(
				function success(response)
				{
					console.log("REST, validateUserAccount, Success = "+JSON.stringify(response.data));
					onSuccess(response.data);
				},
				function failure(response)
				{
					console.log("REST, validateUserAccount, Failure");
					onFailure();
				}
			);		
	};

	loginService.getUserData = function(email, onSuccess, onFailure)
	{
		var query = "user/getUser?email="+email;
		$http.get(APP_CONSTANTS.REST+query)
			.then(
				function success(response)
				{
					console.log("REST, getUserData, Success = "+JSON.stringify(response.data));
					onSuccess(response.data);
				},
				function failure(response)
				{
					console.log("REST, getUserData, Failure");
					onFailure();
				}
			);
	};

	loginService.signUpUser = function(userData, onSuccess, onFailure)
	{
		var query = "user/setUser";
		$http.post(APP_CONSTANTS.REST+query, userData)
			.then(
				function success(response)
				{
					console.log("REST, signUpUser, Success = "+JSON.stringify(response.data));
					onSuccess(response.data);
				},
				function failure(response)
				{
					console.log("REST, signUpUser, Failure");
					onFailure();
				}
			);
	};

	loginService.checkForExistingUserSession = function(onSuccess)
	{
		var existingSession = $window.localStorage.session;
		if(typeof(existingSession) != 'undefined')
		{
			console.log('existing user session = '+existingSession);
			onSuccess(existingSession);
		}
		else
		{
			console.log('no existing user session');
		}
	};

	return loginService;
});