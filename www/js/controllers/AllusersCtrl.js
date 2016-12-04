/**
 * Created by Andrea on 02/12/2016.
 */
var base_url_local="http://localhost:3000";

app.controller('AllusersCtrl', function ($scope, $http ,$rootScope, $ionicPopup, $stateParams, $state, $timeout) {

  $http.get(base_url_local + '/user')
    .success(function(data) {
      $scope.users = data;
      console.log(data);


    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

  $scope.clear = function(){
    $scope.busqueda = null;
  };
  
});
