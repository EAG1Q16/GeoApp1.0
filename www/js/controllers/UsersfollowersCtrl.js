/**
 * Created by Andrea on 02/12/2016.
 */


app.controller('UsersfollowersCtrl', function ($scope, $http ,$rootScope, $ionicPopup, $stateParams, $state, $timeout) {

  
  var getid = ($state.params.obj);
    $http.get(base_url + '/user/my/' + getid)
      .success(function(data) {
        $scope.name = data.username;
        $scope.followers = data.followers;

      })
      .error(function(data) {
        console.log('Error: ' + data);
      })

  $scope.goselprofile = function (id) {
    $state.go('app.userprofile', {obj: id});
  }

});
