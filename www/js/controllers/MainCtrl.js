/**
 * Created by Marta_ on 28/11/2016.
 */

//var base_url = "http://localhost:3000";

var base_url="http://10.192.48.239:3000";

app.controller('MainCtrl', function ($scope, $ionicPopup, $http, $rootScope, $stateParams, $timeout, $state, $cordovaGeolocation){

  $scope.Ball = 'true';
  $scope.Bnear = 'false';
  $scope.Bfriends = 'false';

  //Mostrar todas las aventuras
  $http.get(base_url+'/adventures')
    .success(function (response) {
      $scope.items = response;
    })
    .error(function(data) {
      console.log('Error: '+data);
    });

  $scope.showNear = function(){
    $scope.items = {};

    $scope.coordenada = {
      latitude: $scope.lat,
      longitude: $scope.long,
      //Por defecto en metros 30000m 30km
      radius: '30000'
    };
    $http.post(base_url+'/adventures/near/', $scope.coordenada)
      .success(function (response) {
        console.log("todas las aventuras cercanas en 20km");
        $scope.items = response;
        $scope.Ball = 'false';
        $scope.Bnear = 'true';
        $scope.Bfriends = 'false';
      })
      .error(function(data) {
        console.log("Error: "+data);
      })
  };

  $scope.showAll = function(){
    $http.get(base_url+'/adventures')
      .success(function (response) {
        console.log("todas las aventuras");
        console.log(response);
        $scope.items = response;
        $scope.Ball = 'true';
        $scope.Bnear = 'false';
        $scope.Bfriends = 'false';
      })
      .error(function(data) {
        console.log("Error: "+data);
      })

  }

  $scope.showFriends = function () {
    $http.get(base_url+'/user/recomendedadv/' + $rootScope.UserID)
      .success(function (response) {
        console.log("Muestra las aventuras de tus amigos");
        console.log(response);
        $scope.FollowAdvs = response.following;
        $scope.Ball = 'false';
        $scope.Bnear = 'false';
        $scope.Bfriends = 'true';
      })
      .error(function (data) {
        console.log("Error");
      })
  }

  $scope.AdvProfile = function(id){
    console.log("click")
    $state.go("app.adventures"+'/'+ id);
  };

  //GPS
  var posOptions = {timeout: 10000, enableHighAccuracy: false};
  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      $scope.lat  = position.coords.latitude;
      $scope.long = position.coords.longitude;
      console.log($scope.lat + '   ' + $scope.long)
    }, function(err) {
      console.log(err)
    });

  var watchOptions = {timeout : 3000, enableHighAccuracy: false};
  var watch = $cordovaGeolocation.watchPosition(watchOptions);

  watch.then(
    null,
    function(err) {
      console.log(err)
    },
    function(position) {
      $scope.lat  = position.coords.latitude;
      $scope.long = position.coords.longitude;
      console.log($scope.lat + '' + $scope.long);
    }
  );

  watch.clearWatch();

  /*$http.get(base_url + '/user/sessionid')
    .success(function(data) {
      $rootScope.UserSessionId = data;
      $rootScope.UserSessionUri = data._id;
      $scope.UserHome = data;
      console.log("la dataaaa");
      console.log(data);

      // is logges in get users following adventures
      $http.get(base_url + '/user/recomendedadv/' + $rootScope.UserSessionUri)
        .success(function(data) {
          $scope.FollowingAdvs = data.following;
          console.log($scope.FollowingAdvs);
        })
        .error(function(data) {
          console.log('not logged');
        });
    })
    .error(function(data) {
      console.log('not logged');
    });*/

});
