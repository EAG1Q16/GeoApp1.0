/**
 * Created by Andrea on 30/11/2016.
 */
var base_url_local="http://localhost:3000";

app.controller('UserProfileCtrl', function ($scope, $http ,$rootScope, $ionicPopup, $stateParams, $state, $timeout) {

  // when landing on the page get user
  $http.get(base_url + '/user/my/' + $rootScope.UserID)
    .success(function(data) {
      $scope.UserProfileInfo = data;
      //$scope.FollowingUsers = data.following;
      console.log($scope.UserProfileInfo);
      console.log($scope.UserProfileInfo.username);

    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

});
