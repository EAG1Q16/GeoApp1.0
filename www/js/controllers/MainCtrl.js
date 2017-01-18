/**
 * Created by Marta_ on 28/11/2016.
 */

//var base_url = "http://localhost:3000";


var base_url="http://192.168.1.36:3000";

//var base_url="http://147.83.7.156:3000"; //server
//var base_url="http://10.193.144.123:3000";


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
    //GPS
    var posOptions = {timeout: 1000, enableHighAccuracy: false};
    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {
        $scope.coordenada = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          //Por defecto en metros 30000m 30km
          radius: '30000'
        };

        console.log('coooordeeee', $scope.coordenada);
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

      }, function(err) {
        console.log(err);
        $ionicPopup.alert({
          title: 'AVISO!',
          template: 'Activa la ubicación en tu dispositivo!'
        });
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
      });
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
