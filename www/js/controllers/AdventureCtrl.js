/**
 * Created by Marta_ on 28/11/2016.
 */
var base_url = "http://localhost:3000";
app.controller('AdventureCtrl', function ($scope, $ionicPopup, $http, $rootScope, $stateParams, $timeout, $state){
  console.log("rootscope: "+$rootScope.UserID);
  var adventureID = window.location.href.split("/").pop();
  console.log("AdventureID: " + adventureID);

  $http.get(base_url+'/adventures/id/' + adventureID)
    .success(function(data){
      $scope.AdventureProfile = data;
      $scope.comments = data.comments;
      console.log($scope.AdventureProfile);
      console.log($scope.comments);
    })
    .error(function (data) {
      console.log("Error: " + data);
    })

  $scope.NewComment={};

  //$scope.NewCommenr.user = $rootScope.UserID;
  $scope.PostComment = function () {
    $http.post(base_url+'/comments/' + $rootScope.UserID, $scope.NewComment)
      .success(function(data) {
        console.log("Add Comment");
        console.log($scope.NewComment.text);
        $scope.bodycomment = data;
        $scope.NewComment = {};
        console.log($scope.bodycomment);
        $http.post(base_url + '/comments/addtoadventure/' + adventureID, $scope.bodycomment)
          .success(function (data) {
            console.log("entro en el success");
            $scope.comments = data.comments;
            console.log("aqui");
          })
          .error(function (data) {
            console.log("Error" + data)
          })
      })
      .error(function (data) {
        console.log("Error" + data);
      });
  };

})
