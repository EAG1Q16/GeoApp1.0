/**
 * Created by Andrea on 02/12/2016.
 */
app.controller('UsersfollowersCtrl', function ($scope, $http ,$rootScope, $ionicPopup, $stateParams, $state, $timeout) {

  $http.get(base_url + '/user/my/' + $rootScope.UserID)
    .success(function(data) {
      $scope.UserProfileInfo = data;
      console.log($scope.UserProfileInfo.followers);
      $scope.followers = $scope.UserProfileInfo.followers;

    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

});
