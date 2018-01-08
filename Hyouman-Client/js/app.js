
'use strict';

//core modules
angular.module('coreModule', ['ngRoute', 'ui.router', 'ngCookies']);

//other app modules
angular.module('loginModule', []);
angular.module('homeModule', []);
angular.module('programsModule', []);
angular.module('programModule', []);
angular.module('storyModule', []);
angular.module('profileModule', []);
angular.module('adminModule', []);

//app
var app = angular.module('app', ['coreModule', 'loginModule', 'homeModule', 'storyModule',
								 'programsModule', 'programModule', 'profileModule' , 'adminModule']);

//constants
app.constant('APP_CONSTANTS', { REST: "http://localhost:3210/Hyouman/rest/" });
