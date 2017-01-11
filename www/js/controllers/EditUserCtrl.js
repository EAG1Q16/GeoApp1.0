/**
 * Created by Marta_ on 28/11/2016.
 */

app.controller('EditUserCtrl', function ($scope, $rootScope, $ionicPopup, $http, $stateParams, $timeout, $state) {

// when landing on the page get user
  $scope.load = function() {

    $http.get(base_url + '/user/my/' + $rootScope.UserID)
      .success(function(data) {
        $scope.UserProfileInfo = data;
        $scope.UserProfileInfo.registerdate = moment($scope.UserProfileInfo.registerdate, "").fromNow();
        //$scope.FollowingUsers = data.following;
        console.log($scope.UserProfileInfo);
        console.log($scope.UserProfileInfo.username);
        $scope.UpdatedUser = $scope.UserProfileInfo;
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
    console.log("LOAD", $scope.UpdatedUser);
  }


  $scope.EditUser = function() {
    console.log('modificamos usuario');
    console.log($scope.UpdatedUser);
    if($scope.UpdatedUser.name == null)
      $scope.UpdatedUser.name = $scope.UserProfileInfo.name;
    /*
    if($scope.UpdatedUser.email == null)
      $scope.UpdatedUser.email = $scope.UserProfileInfo.email;*/

    $http.put(base_url + '/user/update/name/' + $rootScope.UserID, $scope.UpdatedUser)
      .success(function (data) {
        console.log(data);
        $scope.UserProfileInfo = data;
        console.log($scope.UserProfileInfo);
        //$scope.UpdatedUser = {};
      })
      .error(function (data) {
        console.log('Error' + data);
        $scope.UpdatedUser = {};
      });

    if($scope.UpdatedUser.username == null)
      $scope.UpdatedUser.username = $scope.UserProfileInfo.username;
    console.log($scope.UpdatedUser);
    $http.put(base_url + '/user/update/username/' + $rootScope.UserID, $scope.UpdatedUser)
      .success(function (data) {
        console.log(data);
        $scope.UserProfileInfo = data;
        console.log($scope.UserProfileInfo);
        $scope.UpdatedUser = {};
      })
      .error(function (data) {
        console.log('Error' + data);
        $scope.UpdatedUser = {};
      });

    if($scope.UpdatedUser.description == null)
      $scope.UpdatedUser.description = $scope.UserProfileInfo.description;
    console.log($scope.UpdatedUser.description);
    $http.put(base_url + '/user/update/description/' + $rootScope.UserID, $scope.UpdatedUser)
      .success(function (data) {
        console.log(data);
        $scope.UserProfileInfo = data;
        console.log($scope.UserProfileInfo);
        $scope.UpdatedUser = {};
      })
      .error(function (data) {
        console.log('Error' + data);
        $scope.UpdatedUser = {};
      });

    if($scope.UpdatedUser.photo == null)
      $scope.UpdatedUser.photo = $scope.UserProfileInfo.photo;
    console.log($scope.UpdatedUser);
    $http.put(base_url + '/user/update/photo/' + $rootScope.UserID, $scope.UpdatedUser)
      .success(function (data) {
        console.log(data);
        $scope.UserProfileInfo = data;
        console.log($scope.UserProfileInfo);
        $scope.UpdatedUser = {};
      })
      .error(function (data) {
        console.log('Error' + data);
        $scope.UpdatedUser = {};
      });


    console.log($scope.UpdatedUser);
    if ($scope.UpdatedUser.password == $scope.UpdatedUser.repnewpassword) {
      $http.put(base_url + '/user/update/password/' + $rootScope.UserID, $scope.UpdatedUser)
        .success(function (data) {
          console.log(data);
          $scope.UserProfileInfo = data;
          console.log($scope.UserProfileInfo);
          $scope.UpdatedUser = {};
        })
        .error(function (data) {
          console.log('Error' + data);
          $scope.UpdatedUser = {};
        })
    } else {
      var errorPopup = $ionicPopup.alert({
        title: 'Las contraseñas no coinciden'
      })
    }
};
/*
    console.log('Entra en el controller EditUserCtrl');
    console.log('Entra en el EditProfile del controller');
    var confirmPopup = $ionicPopup.confirm({
      title: 'Guardar cambios?'
    });

    confirmPopup.then(function(res) {
      if (res) {
        var savePopup = $ionicPopup.alert({
          title: 'Cambios guardados'
        })
      } else {
        var errorPopup = $ionicPopup.alert({
          title: 'No se han podido guardar los cambios realizados'
        })

      }

    });*/




});
