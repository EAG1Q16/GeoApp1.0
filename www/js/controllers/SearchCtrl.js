/**
 * Created by Marta_ on 02/12/2016.
 */

app.controller('SearchCtrl',function ($scope, $http, $ionicPopup, $stateParams, $rootScope, $timeout, $state) {

  //Para borrar el input hay que tratar el ng-model con objetos.
  $scope.input = {busqueda : '' };

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


});
