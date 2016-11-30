/**
 * Created by Marta_ on 28/11/2016.
 */

var base_url = "http://localhost:3000";
app.controller('MainCtrl', function ($scope, $ionicPopup, $http, $rootScope, $stateParams, $timeout, $state){
  console.log("mainctrl");
  console.log("rootscope: "+$rootScope.UserID);
  $http.get(base_url+'/adventures')
    .success(function (response) {
      console.log("aventuriiiis");
      $scope.items = response;
      console.log(response);
    })
    .error(function(data) {
      console.log('Error: '+data);
    });

  $scope.clear = function(){
    $scope.busqueda = null;
  };

  $scope.showNear = function(){

  }

  $scope.AdvProfile = function(id){
    console.log("click")
    $state.go("app.adventures"+'/'+ id);
  };


  $scope.showAll = function(){
    $http.get(base_url+'/adventures')
      .success(function (response) {
        console.log("todas las aventuras");
        $scope.items = response;
        console.log(response);
      })
      .error(function(data) {
        console.log('Error: '+data);
      })

  }

});
