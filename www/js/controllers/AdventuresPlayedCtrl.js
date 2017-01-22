/**
 * Created by Marta_ on 04/01/2017.
 */

app.controller('AdventuresPlayedCtrl', function ($scope, $http ,$rootScope, $ionicPopup, $stateParams, $state, $timeout) {

 // var puserID = window.location.href.split("/").pop();
  var puserID = ($state.params.obj);
  $http.get(base_url+'/user/my/'+ puserID)
    .success(function (response) {
      $scope.name = response.username;
      $scope.items = response.adventures.played;
    })
    .error(function (response) {
      console.log("Error: "+response);
    })


});
