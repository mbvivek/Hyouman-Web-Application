
var adminModule = angular.module('adminModule');

//______________ MAIN CONTROLLER _________________

adminModule.controller('adminController', function($scope, $rootScope, $location, adminService)
{
	$scope.init = function()
	{
		$('footer').hide();
	};

});


adminModule.factory('adminService', function()
{
	var adminService = {};

	return adminService;
});


//______________ ADMIN DASHBOARD CONTROLLER _________________

adminModule.controller('adminDashboardController', function($scope, $rootScope, $location, adminDashboardService)
{
	$scope.init = function()
	{
		
	};

});


adminModule.factory('adminDashboardService', function()
{
	var adminDashboardService = {};

	return adminDashboardService;
});


//______________ MANAGE PROGRAMS CONTROLLER __________________

adminModule.controller('manageProgramsController', function($scope, $rootScope, $location, manageProgramsService)
{
	$scope.initManagePrograms = function()
	{
		$scope.session = $rootScope.session;
		$scope.getPrograms(getProgramsOnSuccess, getProgramsOnFailure);
	};

	$scope.getPrograms = function(getProgramsOnSuccess, getProgramsOnFailure)
	{
		manageProgramsService.getPrograms(getProgramsOnSuccess, getProgramsOnFailure);
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

	$scope.initAddProgram = function()
	{
		$scope.newProgram = "";
		$scope.message = "";
		$scope.error = "";
	};

	$scope.addProgram = function(program)
	{
		manageProgramsService.addProgram(program, addProgramOnSuccess, addProgramOnFailure);
	};

	var addProgramOnSuccess = function(response)
	{
		if(response == true)
		{
			$scope.message = "Program was added.";
			$scope.error = "";
			$scope.getPrograms(getProgramsOnSuccess, getProgramsOnFailure);
			$('#addProgramCollapse').collapse('toggle');
		}
		else
		{
			$scope.message = "";
			$scope.error = "Error while adding the program.";
		}
	};

	var addProgramOnFailure = function()
	{
		$scope.message = "";
		$scope.error = "Error while adding the program.";
	};

	$scope.initDeleteProgram = function(program)
	{
		$scope.message = "";
		$scope.error = "";
		$scope.programToRemove = program;
		manageProgramsService.getProgramStories(program.id, initDeleteProgramOnSuccess, initDeleteProgramOnFailure);
	}

	var initDeleteProgramOnSuccess = function(response)
	{
		if(response != null)
		{
			var stories = response;

			var totalStories = stories.length;
			var pendingStories = 0;
			var activeStories = 0;
			var invalidStories = 0;

			stories.forEach(function(story, index)
			{
				if(story.status == 'pending')
				{
					pendingStories++;
				}
				else if(story.status == 'active')
				{
					activeStories++;
				}
				else if(story.status == 'invalid')
				{
					invalidStories++;
				}
			});

			$scope.programToRemove.totalStories = totalStories;
			$scope.programToRemove.pendingStories = pendingStories;
			$scope.programToRemove.activeStories = activeStories;
			$scope.programToRemove.invalidStories = invalidStories;
		}
	};

	var initDeleteProgramOnFailure = function()
	{
		$scope.message = "";
		$scope.error = "System Error.";
	};

	$scope.deleteProgram = function(program)
	{
		manageProgramsService.deleteProgram(program.id, deleteProgramOnSuccess, deleteProgramOnFailure);
	};

	var deleteProgramOnSuccess = function(response)
	{
		if(response == true)
		{
			$('#deleteProgramModal').modal('toggle');
			$scope.getPrograms(getProgramsOnSuccess, getProgramsOnFailure);
		}
	};

	var deleteProgramOnFailure = function()
	{
		$scope.message = "";
		$scope.error = "Could not delete the program.";
	};

});


adminModule.factory('manageProgramsService', function($http, APP_CONSTANTS)
{
	var manageProgramsService = {};

	manageProgramsService.getPrograms = function(onSuccess, onFailure)
	{
		var query = "program/getPrograms";
		$http.get(APP_CONSTANTS.REST+query)
			.then(
				success = function(response)
				{
					console.log("REST, getPrograms, Success");
					onSuccess(response.data);
				},
				failure = function()
				{
					console.log("REST, getPrograms, Failure");
					onFailure();
				}
			);
	};

	manageProgramsService.addProgram = function(program, onSuccess, onFailure)
	{
		$http.post(APP_CONSTANTS.REST+"program/addProgram", program)
			.then(
				success = function(response)
				{
					console.log("REST, addProgram, Success");
					onSuccess(response.data);
				},
				failure = function()
				{
					console.log("REST, addProgram, Failure");
					onFailure();
				}
			);
	};

	manageProgramsService.deleteProgram = function(programId, onSuccess, onFailure)
	{
		$http.post(APP_CONSTANTS.REST+"program/deleteProgram", programId)
			.then(
				success = function(response)
				{
					console.log("REST, deleteProgram, Success");
					onSuccess(response.data);
				},
				failure = function()
				{
					console.log("REST, deleteProgram, Failure");
					onFailure();
				}
			);
	};

	manageProgramsService.getProgramStories = function(programId, onSuccess, onFailure)
	{
		var query = "story/getProgramStories?programId="+programId;
		$http.get(APP_CONSTANTS.REST+query)
			.then(
				success = function(response)
				{
					console.log("REST, getProgramStories, Success");
					onSuccess(response.data);
				},
				failure = function()
				{
					console.log("REST, getPrograms, Failure");
					onFailure();
				}
			);
	};

	return manageProgramsService;
});


//_________________ MANAGE STORIES CONTROLLER _________________

adminModule.controller('manageStoriesController', function($scope, $rootScope, $location, manageStoriesService)
{
	$scope.initManageStories = function()
	{
		$scope.session = $rootScope.session;
		$scope.getStories();
	};


	//====================================================================================
	$scope.getStories = function()
	{
		manageStoriesService.getStories(getStoriesOnSuccess, getStoriesOnFailure);
	};

	var getStoriesOnSuccess = function(response)
	{
		if(response != null)
		{
			$scope.stories = response;
		}
	};

	var getStoriesOnFailure = function()
	{
		$scope.message = "";
		$scope.error = "System Error!";
	};
	//======================================================================================

	//======================================================================================
	$scope.initApproveStory = function(story)
	{
		$scope.storyToApprove = story;
		$('#approveStoryModal').modal('toggle');
	};

	$scope.approveStory = function(storyId)
	{
		manageStoriesService.approveStory(storyId, approveStoryOnSuccess, approveStoryOnFailure);
	};

	var approveStoryOnSuccess = function(response)
	{
		if(response != null)
		{
			if(response == true)
			{
				$scope.getStories();
				$('#approveStoryModal').modal('toggle');
			}
			else 
			{
				$scope.message = "";
				$scope.error = "Error in updating the status!";		
			}	
		}
	};

	var approveStoryOnFailure = function()
	{
		$scope.message = "";
		$scope.error = "System Error!";
	};
	//======================================================================================

	//======================================================================================
	$scope.initDeleteStory = function(story)
	{
		$scope.storyToDelete = story;
		$('#deleteStoryModal').modal('toggle');
	};

	$scope.deleteStory = function(storyId)
	{
		manageStoriesService.deleteStory(storyId, deleteStoryOnSuccess, deleteStoryOnFailure);
	};

	var deleteStoryOnSuccess = function(response)
	{
		if(response != null)
		{
			if(response == true)
			{
				$scope.getStories();
				$('#deleteStoryModal').modal('toggle');
			}
			else 
			{
				$scope.message = "";
				$scope.error = "Error in updating the status!";		
			}	
		}
	};

	var deleteStoryOnFailure = function()
	{
		$scope.message = "";
		$scope.error = "System Error!";
	};
	//======================================================================================


});


adminModule.factory('manageStoriesService', function($http, APP_CONSTANTS)
{
	var manageStoriesService = {};

	manageStoriesService.getStories = function(onSuccess, onFailure)
	{
		var query = "story/getAllStories";
		$http.get(APP_CONSTANTS.REST+query)
			.then(
					success = function(response)
					{
						console.log("REST, getStories, SUCCESS");
						onSuccess(response.data);
					},
					failure = function()
					{
						console.log("REST, getStories, FAILURE");
						onFailure();
					}
			);
	};

	manageStoriesService.approveStory = function(storyId, onSuccess, onFailure)
	{
		var url = APP_CONSTANTS.REST + "story/approveStory";
		$http.post(url, storyId)
			.then(
					success = function(response)
					{
						console.log("REST, approveStory, SUCCESS");
						onSuccess(response.data);
					},
					failure = function()
					{
						console.log("REST, approveStory, FAILURE");
						onFailure();
					}
				);
	};

	manageStoriesService.deleteStory = function(storyId, onSuccess, onFailure)
	{
		var url = APP_CONSTANTS.REST + "story/deleteStory";
		$http.post(url, storyId)
			.then(
					success = function(response)
					{
						console.log("REST, deleteStory, SUCCESS");
						onSuccess(response.data);
					},
					failure = function()
					{
						console.log("REST, deleteStory, FAILURE");
						onFailure();
					}
				);
	};

	return manageStoriesService;
});
 

//__________________ DIRECTIVES __________________________

adminModule.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
}]);
