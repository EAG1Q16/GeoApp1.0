/**
 * Created by Andrea on 04/12/2016.
 */


app.controller('UsersfollowingCtrl', function ($scope, $http ,$rootScope, $ionicPopup, $stateParams, $state, $timeout) {

  var puserID = window.location.href.split("/").pop();

    $http.get(base_url + '/user/my/' + puserID)
      .success(function(data) {
        console.log("entro en el iiiifff my perfil");
        console.log(data.following)
        $scope.following = data.following;

      })
      .error(function(data) {
        console.log('Error: ' + data);
      });

});
