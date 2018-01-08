
var configModule = angular.module('app').config(function($urlRouterProvider, $stateProvider)
{
	$urlRouterProvider.otherwise('/home');

	$stateProvider

	.state("home", {
		url : "/home",
		templateUrl : "includes/home.html",
		controller : "homeController"
	})

	.state("programs", {
		url : "/programs",
		templateUrl : "includes/programs.html",
		controller : "programsController"
	})

	.state("program", {
		url : "/program/:programId",
		templateUrl : "includes/program.html",
		controller : "programController"
	})

	.state("story", {
		url : "/story/:storyId",
		templateUrl : "includes/story.html",
		controller : "storyController"
	})

	.state("profile", {
		url : "/profile",
		abstract : true,
		templateUrl : "includes/profile.html",
		controller : "profileController"
	})

	.state("profile.personalInfo", {
		url : "/personalInfo",
		templateUrl : "includes/personalInfo.html",
		controller : "personalInfoController"
	})

	.state("profile.paymentInfo", {
		url : "/paymentInfo",
		templateUrl : "includes/paymentInfo.html",
		controller : "paymentInfoController"
	})

	.state("profile.userStories", {
		url : "/stories",
		templateUrl : "includes/userStories.html",
		controller : "paymentInfoController"
	})

	.state("profile.userDonations", {
		url : "/donations",
		templateUrl : "includes/userDonations.html",
		controller : "userDonationsController"
	})

	.state("profile.cart", {
		url : "/cart",
		templateUrl : "includes/cart.html",
		controller : "cartController"
	})

	.state("admin", {
		url : "/admin",
		abstract : true,
		templateUrl : "includes/admin.html",
		controller : "adminController"
	})

	.state("admin.dashboard", {
		url : "/dashboard",
		templateUrl : "includes/adminDashboard.html",
		controller : "adminDashboardController"
	})

	.state("admin.managePrograms", {
		url : "/managePrograms",
		templateUrl : "includes/managePrograms.html",
		controller : "manageProgramsController"
	})

	.state("admin.manageStories", {
		url : "/manageStories",
		templateUrl : "includes/manageStories.html",
		controller : "manageStoriesController"
	})

});

configModule.run();