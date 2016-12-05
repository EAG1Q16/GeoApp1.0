/**
 * Created by Marta_ on 28/11/2016.
 */



app.controller('MyAdventureCtrl', function ($scope, $rootScope, $http, $ionicPopup, $stateParams, $timeout,  $state){
  console.log("rootscope: "+$rootScope.UserID);
  $http.get(base_url+'/user/my/'+$rootScope.UserID)
    .success(function (response) {
      $scope.adventures = response.adventures.created;
      console.log(response);
      console.log(response.adventures.created);
    })
    .error(function (response) {
      console.log("Error: "+response);
    })

  $scope.showCreadas = function(){

  }
  $scope.showJugadas = function(){

  }
})
