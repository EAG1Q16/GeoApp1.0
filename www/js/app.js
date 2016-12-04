// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic']);

app.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)

        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})
app.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.tabs.position("bottom");
  $stateProvider

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })
    .state('app.main', {
      url: '/main',
      views: {
        'menuContent': {
          templateUrl: 'templates/mainpage.html',
          controller: 'MainCtrl'
        }
      }
    })

    .state('app.myadventures', {
      url: '/myadventures',
      views: {
        'menuContent': {
          templateUrl: 'templates/myadventures.html',
          controller: 'MyAdventureCtrl'
        }
      }
    })
    .state('app.adventures', {
      url: '/adventures/:id',
      views: {
        'menuContent': {
          templateUrl: 'templates/adventure.html',
          controller: 'AdventureCtrl'
        }
      }
    })

    .state('app.user', {
      url: '/user',
      views: {
        'menuContent': {
          templateUrl: 'templates/user.html',
          controller: 'EditUserCtrl'
        }
      }
    })
    .state('app.userprofile', {
      url: '/userprofile/:id',
      views: {
        'menuContent': {
          templateUrl: 'templates/userprofile.html',
          controller: 'UserProfileCtrl'
        }
      }
    })

    .state('app.usersfollowers', {
      url: '/usersfollowers',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/usersfollowers.html',
          controller: 'UsersfollowersCtrl'
        }
      }
    })

    .state('app.allusers', {
      url: '/allusers',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/allusers.html',
          controller: 'AllusersCtrl'
        }
      }
    })

    .state('app.usersfollowing', {
      url: '/usersfollowing',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/usersfollowing.html',
          controller: 'UsersfollowingCtrl'
        }
      }
    })

    .state('app.following', {
      url: '/following',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/following.html',
          controller: 'FollowingCtrl'
        }
      }
    })

    .state('app.followers', {
      url: '/followers',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/followers.html',
          controller: 'FollowersCtrl'
        }
      }
    })

    .state('login', {
      url: '/login',
      cache: false,
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
    })

    .state('createcount', {
      url: '/createcount',
      cache: false,
      templateUrl: 'templates/register.html',
      controller: 'RegisterCtrl'
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});


