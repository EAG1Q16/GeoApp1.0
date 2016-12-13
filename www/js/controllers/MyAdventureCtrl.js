/**
 * Created by Marta_ on 28/11/2016.
 */

app.controller('MyAdventureCtrl', function ($scope, $rootScope, $http, $ionicPopup, $stateParams, $timeout,  $state){
  console.log("rootscope: "+$rootScope.UserID);

  $scope.Bcreated = 'false';
  $scope.Bplayed = 'true';
  $scope.Bfavs = 'false';

  $http.get(base_url+'/user/my/'+$rootScope.UserID)
    .success(function (response) {
      $scope.items = response.adventures.played;
    })
    .error(function (response) {
      console.log("Error: "+response);
    })

  $scope.showCreadas = function(){
    $http.get(base_url+'/user/my/'+$rootScope.UserID)
      .success(function (response) {
        $scope.items = response.adventures.created;
        $scope.Bplayed = 'false';
        $scope.Bcreated = 'true';
        $scope.Bfavs = 'false';
      })
      .error(function (response) {
        console.log("Error: "+response);
      })

  }
  $scope.showJugadas = function(){
    $http.get(base_url+'/user/my/'+$rootScope.UserID)
      .success(function (response) {
        $scope.items = response.adventures.played;
        $scope.Bplayed = 'true';
        $scope.Bcreated = 'false';
        $scope.Bfavs = 'false';
      })
      .error(function (response) {
        console.log("Error: "+response);
      })

  }
  $scope.showFav = function(){
    $http.get(base_url+'/user/my/'+$rootScope.UserID)
      .success(function (response) {
        $scope.items = response.adventures.favs;
        $scope.Bplayed = 'false';
        $scope.Bcreated = 'false';
        $scope.Bfavs = 'true';
      })
      .error(function (response) {
        console.log("Error: "+response);
      })

  }

})
