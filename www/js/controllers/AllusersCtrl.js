/**
 * Created by Andrea on 02/12/2016.
 */





app.controller('AllusersCtrl', function ($scope, $http ,$rootScope, $ionicPopup, $stateParams, $state, $timeout) {

  $http.get(base_url + '/user')
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
