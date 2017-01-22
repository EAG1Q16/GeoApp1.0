/**
 * Created by Andrea on 04/12/2016.
 */


app.controller('UsersfollowingCtrl', function ($scope, $http ,$rootScope, $ionicPopup, $stateParams, $state, $timeout) {

  var getid = ($state.params.obj);
    $http.get(base_url + '/user/my/' + getid)
      .success(function(data) {
        $scope.name = data.username;
        $scope.following = data.following;

      })
      .error(function(data) {
        console.log('Error: ' + data);
      });

  $scope.goselprofile = function (id) {
    $state.go('app.userprofile', {obj: id});
  }

});
