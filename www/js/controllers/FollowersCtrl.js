/**
 * Created by Andrea on 04/12/2016.
 */
app.controller('FollowersCtrl', function ($scope, $http ,$rootScope, $ionicPopup, $stateParams, $state, $timeout) {
  

  $http.get(base_url + '/user/my/' +  $rootScope.searched)
    .success(function (data) {
      console.log("entro en el elseee otrooo perfil");
      console.log(data.followers)
      $scope.followers = data.followers;

    })
    .error(function (data) {
      console.log('Error: ' + data);
    })

});
