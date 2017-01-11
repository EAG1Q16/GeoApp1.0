/**
 * Created by Andrea on 02/12/2016.
 */


app.controller('UsersfollowersCtrl', function ($scope, $http ,$rootScope, $ionicPopup, $stateParams, $state, $timeout) {

  var puserID = window.location.href.split("/").pop();

    $http.get(base_url + '/user/my/' + puserID)
      .success(function(data) {
        $scope.name = data.username;
        $scope.followers = data.followers;

      })
      .error(function(data) {
        console.log('Error: ' + data);
      })

});
