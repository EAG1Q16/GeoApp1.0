/**
 * Created by Andrea on 02/12/2016.
 */

app.controller('AllusersCtrl', function ($scope, $http ,$rootScope, $ionicPopup, $stateParams, $state, $timeout) {

  $scope.input = {busqueda : '' };

  $http.get(base_url + '/user')
    .success(function(data) {
      $scope.users = data;
      console.log(data);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

  $scope.deleteInputForm = function () {
    console.log("ELIMINAR");
    $scope.input = {busqueda : '' };
  };
  $scope.doRefresh = function() {
    $http.get(base_url + '/user')
      .success(function(data) {
        $scope.users = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      })
      .finally(function() {
        // Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
      });
  };

});
