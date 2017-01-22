/**
 * Created by Marta_ on 28/11/2016.
 */

//var base_url="http://192.168.1.33:3000";
var base_url = "http://localhost:3000";
//var base_url="http://147.83.7.156:3000"; //server

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

  $scope.doRefresh = function() {
    if ($scope.Bfriends == 'true'){
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
        .finally(function() {
          // Stop the ion-refresher from spinning
          $scope.$broadcast('scroll.refreshComplete');
        });
    }else {
      if ($scope.Bnear == 'true') {
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
            $http.post(base_url + '/adventures/near/', $scope.coordenada)
              .success(function (response) {
                console.log("todas las aventuras cercanas en 20km");
                $scope.items = response;
                $scope.Ball = 'false';
                $scope.Bnear = 'true';
                $scope.Bfriends = 'false';
              })
              .error(function (data) {
                console.log("Error: " + data);
              })
              .finally(function () {
                // Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');
              });

          }, function (err) {
            console.log(err);
          });

      } else {
        if ($scope.Ball == 'true') {
          $http.get(base_url + '/adventures')
            .success(function (response) {
              console.log("todas las aventuras");
              $scope.items = response;
              $scope.Ball = 'true';
              $scope.Bnear = 'false';
              $scope.Bfriends = 'false';

            })
            .error(function (data) {
              console.log("Error: " + data);
            })
            .finally(function () {
              // Stop the ion-refresher from spinning
              $scope.$broadcast('scroll.refreshComplete');
            });
        }
      }
    }
  };

});
