
app.controller('LoginCtrl',function ($scope, $http, $ionicPopup, $stateParams, $rootScope, $timeout, $state, $cordovaOauth) {

  $scope.user = {};
  //---------------------Login as localstorage token------------------------------------------------------//
  $scope.isLoggedIn = function() {
    if(window.localStorage.getItem("userid") !== null) {
      var usersaved = {
        id: window.localStorage.getItem("userid")
      };
      console.log(usersaved);
      $http.post(base_url + '/user/app/easy/login', usersaved)
        .success(function (response) {
          console.log(response);
          $rootScope.UserID = response._id;
          $rootScope.User = response;
          $state.go('app.main');
        })
        .error(function (err) {
          console.log('Error: '+err);
        });
    } else {
      if(window.localStorage.getItem("facebook") !== null) {
        var faceinfo ={
          id: window.localStorage.getItem("facebook")
        };
        $http.post(base_url + '/user/app/facebook/login', faceinfo)
          .success(function (response) {
            console.log(response);
            $rootScope.UserID = response._id;
            $rootScope.User = response;
            $state.go('app.main');
          })
          .error(function (err) {
            console.log('Error: '+err);
          });
      }else{
        if(window.localStorage.getItem("twitter") !== null) {
          var twitterinfo ={
            user_id: window.localStorage.getItem("twitter")
          };
          $http.post(base_url + '/user/app/twitter/login', twitterinfo)
            .success(function (response) {
              console.log(response);
              $rootScope.UserID = response._id;
              $rootScope.User = response;
              $state.go('app.main');
            })
            .error(function (err) {
              $ionicPopup.alert({
                title: 'Error',
                template: 'Usuario incorrecto'
              });
        });
      }
    }
  }
  };
  //---------------------Login user normal strategy------------------------------------------------------//
  $scope.login = function () {
    console.log("Función de login");
    console.log('username: ' + $scope.user.username);
    console.log('pass: ' + $scope.user.password);

      $http.post(base_url + '/user/login', $scope.user)
        .success(function (response) {
          console.log(response);
          $rootScope.UserID = response._id;
          $rootScope.User = response;
          console.log($scope.user.username);
          window.localStorage.setItem("userid", response._id);
          $state.go('app.main');
        })
        .error(function (err) {
          $ionicPopup.alert({
            title: 'Error',
            template: 'Usuario o contraseña incorrecto'
          });
          console.log('Error: '+err);
        });
    };
  $scope.Register = function () {
    $state.go('createcount')
  };
  $scope.main = function () {
    $state.go('app.main')
  };

//-----------------Oauth social login strategy-----------------------------------------//
 $scope.twitterLogin = function () {
   $cordovaOauth.twitter("Rb30dgakrgaXEnf2GOhkviPjL", "wKylIDwtjpIHCjRpbJuIVWBm24QxJ9rDCgwCDgwFnmIZdzmjTn").then(function(result) {
     console.log(JSON.stringify(result));

       $http.post(base_url + '/user/app/twitter/login', result)
         .success(function (response) {
           console.log(response);
           $rootScope.UserID = response._id;
           $rootScope.User = response;
           window.localStorage.setItem("twitter", result.user_id);
           $state.go('app.main');
         })
         .error(function (err) {
           $ionicPopup.alert({
             title: 'Error',
             template: 'Usuario incorrecto'
           });
           console.log('Error: '+err);
         });

     }, function(error) {
       alert("There was a problem getting your profile.  Check the logs for details.");
       console.log(error);
     });
 };

 $scope.facebookLogin = function () {
   $cordovaOauth.facebook("633409766839184", ["email","user_website"], {"auth_type": "rerequest"}).then(function(result) {
     console.log(JSON.stringify(result));
     var token = result.access_token;
     console.log(token);
     // we get the user info with the login token
     $http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: token, fields: "id,name,picture", format: "json" }}).then(function(result) {
       console.log(result.data);
       var faceinfo = {
         id: result.data.id,
         name: result.data.name,
         picture: result.data.picture.data.url
       };
       console.log(faceinfo);
       //Make a call to our api and make the final login procees
       $http.post(base_url + '/user/app/facebook/login', faceinfo)
         .success(function (response) {
           console.log(response);
           $rootScope.UserID = response._id;
           $rootScope.User = response;
           window.localStorage.setItem("facebook", faceinfo.id);
           $state.go('app.main');
         })
         .error(function (err) {
           $ionicPopup.alert({
             title: 'Error',
             template: 'Usuario incorrecto'
           });
           console.log('Error: '+err);
         });

     }, function(error) {
       alert("There was a problem getting your profile.  Check the logs for details.");
       console.log(error);
     });
   }, function(error) {
     console.log(JSON.stringify(error));
   });
 };
})


