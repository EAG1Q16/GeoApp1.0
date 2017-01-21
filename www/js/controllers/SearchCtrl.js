/**
 * Created by Marta_ on 02/12/2016.
 */

app.controller('SearchCtrl',function ($scope, $http, $ionicPopup, $stateParams, $rootScope, $timeout, $state) {

  //Para borrar el input hay que tratar el ng-model con objetos.
  $scope.input = {busqueda : '' };
  $scope.dificultad = {difficulty : ''};

  $http.get(base_url+'/adventures')
    .success(function (response) {
      console.log("aventuriiiis");
      $scope.items = response;
      console.log(response);
    })
    .error(function(data) {
      console.log('Error: '+data);
    });

  $scope.deleteInputForm = function () {
    $scope.input = {busqueda : '' };
  };

  $scope.Facil = function () {
    $scope.dificultad = {difficulty: 'Fácil'};
  };
  $scope.Media = function () {
    $scope.dificultad = {difficulty: 'Media'};
  };
  $scope.Dificil = function () {
    $scope.dificultad = {difficulty: 'Difícil'};
  };

  $scope.doRefresh = function() {
    $http.get(base_url+'/adventures')
      .success(function (response) {
        console.log("aventuriiiis");
        $scope.items = response;
        console.log(response);
      })
      .error(function(data) {
        console.log('Error: '+data);
      })
      .finally(function() {
        // Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
      });
  };
  
});
