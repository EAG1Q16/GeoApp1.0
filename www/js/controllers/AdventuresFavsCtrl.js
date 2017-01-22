/**
 * Created by Marta_ on 22/01/2017.
 */
app.controller('AdventuresFavsCtrl', function ($scope, $http ,$rootScope, $ionicPopup, $stateParams, $state, $timeout) {

  var puserID = window.location.href.split("/").pop();

  $http.get(base_url+'/user/my/'+ puserID)
    .success(function (response) {
      $scope.name = response.username;
      $scope.items = response.adventures.favs;
    })
    .error(function (response) {
      console.log("Error: "+response);
    })

});
