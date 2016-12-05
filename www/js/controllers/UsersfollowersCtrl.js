/**
 * Created by Andrea on 02/12/2016.
 */


app.controller('UsersfollowersCtrl', function ($scope, $http ,$rootScope, $ionicPopup, $stateParams, $state, $timeout) {
  
    $http.get(base_url + '/user/my/' + $rootScope.UserID)
      .success(function(data) {
        console.log("entro en el iiiifff my perfil");
        console.log(data.followers)
        $scope.followers = data.followers;
  
      })
      .error(function(data) {
        console.log('Error: ' + data);
      })

});
