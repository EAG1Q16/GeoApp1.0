/**
 * Created by Marta_ on 28/11/2016.
 */

app.controller('EditUserCtrl', function ($scope, $rootScope, $ionicModal, $ionicPopup, $http, $stateParams, $timeout, $state,  $cordovaCamera, $cordovaImagePicker) {

// when landing on the page get user
  $scope.load = function() {
    $http.get(base_url + '/user/my/' + $rootScope.UserID)
      .success(function(data) {
        $scope.UpdatedUser = data;
        $scope.UserProfileInfo = {
          name: data.name,
          username: data.username,
          photo: data.photo,
          description: data.description,
          email: data.email,
          referalid: data.referalid
        };
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
    console.log("LOAD", $scope.UpdatedUser);
  }

   $scope.camera = function () {
    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.sourceType,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 100,
      targetHeight: 100,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
      correctOrientation:true
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {
      var image = document.getElementById('myImage');
      $scope.UpdatedUser.photo = "data:image/jpeg;base64," + imageData;
      $http.put(base_url +'/user/update/photo/' + $rootScope.UserID, $scope.UpdatedUser)
        .success(function(data){
          console.log(data);
          $rootScope.User = data;
          $scope.UserProfileInfo = data;
          console.log($scope.UserProfileInfo);
          $scope.UpdatedUser = data;
        })
        .error(function(data) {
          console.log('Error' + data);
          $scope.UpdatedUser = {};
        });
    }, function(err) {
      // error
      console.log("camara", err)
    });
  }

  $scope.gallery = function () {
    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 100,
      targetHeight: 100,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
      correctOrientation:true
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {
      var image = document.getElementById('myImage');
      $scope.UpdatedUser.photo = "data:image/jpeg;base64," + imageData;
      $http.put(base_url +'/user/update/photo/' + $rootScope.UserID, $scope.UpdatedUser)
        .success(function(data){
          console.log(data);
          $rootScope.User = data;
          $scope.UserProfileInfo = data;
          console.log($scope.UserProfileInfo);
          $scope.UpdatedUser = data;
        })
        .error(function(data) {
          console.log('Error' + data);
          $scope.UpdatedUser = {};
        });
    }, function(err) {
      // error
      console.log("camara", err)
    });
  }

  $scope.UpdateName = function() {
    if($scope.UpdatedUser.name == ""){
      $scope.UpdatedUser.name = $scope.UserProfileInfo.name;
    }
    if ($scope.UpdatedUser.name != $scope.UserProfileInfo.name){
      $http.put(base_url+'/user/update/name/' + $rootScope.UserID, $scope.UpdatedUser)
        .success(function(data){
          console.log(data);
          $scope.UpdatedUser = data;
          $scope.UserProfileInfo = {
            name: data.name,
            username: data.username,
            photo: data.photo,
            description: data.description,
            email: data.email
          }
        })
        .error(function(data) {

          console.log('Error' + data);
          $ionicPopup.alert({
            title: 'Error',
            template: 'No se han podido modificar los datos'
          })
        })
    }
  };
  $scope.UpdateUsername = function() {
    console.log('username2',$scope.UserProfileInfo.username);
    if($scope.UpdatedUser.username == ""){
      $scope.UpdatedUser.username = $scope.UserProfileInfo.username;
    }
    if ($scope.UpdatedUser.username != $scope.UserProfileInfo.username) {
      console.log($scope.UpdatedUser);
      $http.put(base_url+'/user/update/username/' + $rootScope.UserID, $scope.UpdatedUser)
        .success(function (data) {
          console.log(data);
          $scope.UpdatedUser = data;
          $scope.UserProfileInfo = {
            name: data.name,
            username: data.username,
            photo: data.photo,
            description: data.description,
            email: data.email
          };
        })
        .error(function (data) {
          console.log('Error' + data);
          $ionicPopup.alert({
            title: 'Error',
            template: 'No se han podido modificar los datos'
          })
        });
    }
  };

  $scope.UpdateEmail = function() {
    if($scope.UpdatedUser.email == ""){
      $scope.UpdatedUser.email = $scope.UserProfileInfo.email;
    }
    if ($scope.UpdatedUser.email != $scope.UserProfileInfo.email) {
      $http.put(base_url+'/user/update/email/' + $rootScope.UserID, $scope.UpdatedUser)
        .success(function (data) {
          console.log(data);
          $scope.UpdatedUser = data;
          $scope.UserProfileInfo = {
            name: data.name,
            username: data.username,
            photo: data.photo,
            description: data.description,
            email: data.email
          };
        })
        .error(function (data) {
          console.log('Error' + data);
          $ionicPopup.alert({
            title: 'Error',
            template: 'No se han podido modificar los datos'
          })
        });
    }
  };

  $scope.UpdateDescription = function() {
    if($scope.UpdatedUser.description == ""){
      $scope.UpdatedUser.description = $scope.UserProfileInfo.description;
    }
    if ($scope.UpdatedUser.description != $scope.UserProfileInfo.description) {
      console.log($scope.UpdatedUser.description);
      $http.put(base_url+'/user/update/description/' + $rootScope.UserID, $scope.UpdatedUser)
        .success(function (data) {
          console.log(data);
          $scope.UpdatedUser = data;
          $scope.UserProfileInfo = {
            name: data.name,
            username: data.username,
            photo: data.photo,
            description: data.description,
            email: data.email
          };
        })
        .error(function (data) {
          console.log('Error' + data);
          $ionicPopup.alert({
            title: 'Error',
            template: 'No se han podido modificar los datos'
          })
        });
    }
  };

  $ionicModal.fromTemplateUrl('templates/newpassword.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.changePassword = function(password) {
    console.log("HOLIIII CHANGE PASSWORD");
    if(password.pass == password.repetir){
      $scope.UpdatedUser.password = password.pass;
      console.log($scope.password);
      $http.put(base_url + '/user/update/password/' + $rootScope.UserID, $scope.UpdatedUser)
        .success(function (data) {
          console.log("success");
          console.log(data);
          $scope.changePassword = {pass:'', repetir:''};
        })
        .error(function (data) {
          console.log('Error' + data);
          $ionicPopup.alert({
            title: 'Error',
            template: 'No se ha podido modificar la contraseña'
          })
          $scope.changePassword = {pass:'', repetir:''};
        })
      $scope.modal.hide();
    }
    else{
      $ionicPopup.alert({
        title: 'Error',
        template: 'Las contraseñas no coinciden'
      })
    }
  };

});
