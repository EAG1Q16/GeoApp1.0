/**
 * Created by Andrea on 30/11/2016.
 */



app.controller('UserProfileCtrl', function ($scope, $http ,$rootScope, $ionicPopup, $stateParams, $state, $timeout) {
  
    $scope.loadinfo = function () {
      var puserID = window.location.href.split("/").pop();
      console.log(puserID);
      $http.get(base_url + '/user/my/' + puserID)
        .success(function(data) {
          $scope.UserProfileInfo = data;
          //$scope.FollowingUsers = data.following;
          console.log($scope.UserProfileInfo);
          console.log($scope.UserProfileInfo.username);
          $rootScope.searched = $scope.UserProfileInfo._id;
          $scope.CreatedAdventures = data.adventures.created;
          $scope.AdventuresLength = data.adventures.created.length;
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });

      $http.get(base_url +'/user/isfollowing/' + puserID +'/'+ $rootScope.UserID)
        .success(function(data) {
          console.log(data);
          $scope.isfollowing = data;
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };
  
  

  $scope.followUser = function () {
    $http.post(base_url +'/user/follow/' + puserID, $rootScope.User)//user
      .success(function(data){
        $http.get(base_url +'/user/isfollowing/' + puserID +'/'+ $rootScope.UserID)//userid
          .success(function(data) {
            $scope.isfollowing = data;
            $http.get(base_url +'/user/my/' + puserID)
              .success(function(data) {
                $scope.UserProfileInfo = data;
                $scope.CreatedAdventures = data.adventures.created;
                $scope.AdventuresLength = data.adventures.created.length;
              })
              .error(function(data) {
                console.log('Error: ' + data);
              });
          })
          .error(function(data) {
            console.log('Error: ' + data);
          });
      })
      .error(function(data) {
        console.log('Error' + data);
      });
  };

  $scope.stopfollowUser = function () {
    $http.delete(base_url +'/user/unfollow/' + puserID +'/'+ $rootScope.UserID)
      .success(function(data){
        $http.get(base_url +'/user/isfollowing/' + puserID +'/'+ $rootScope.UserID)
          .success(function(data) {
            $scope.isfollowing = data;
            $http.get(base_url +'/user/my/' + puserID)
              .success(function(data) {
                $scope.UserProfileInfo = data;
                $scope.CreatedAdventures = data.adventures.created;
                $scope.AdventuresLength = data.adventures.created.length;
              })
              .error(function(data) {
                console.log('Error: ' + data);
              });
          })
          .error(function(data) {
            console.log('Error: ' + data);
          });
      })
      .error(function(data) {
        console.log('Error' + data);
      });
  };
  $scope.EditProfile = function () {
    $state.go('app.user')
  }

});
