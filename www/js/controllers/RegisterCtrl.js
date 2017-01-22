


app.controller('RegisterCtrl', function ($scope, $http, $ionicPopup, $rootScope, $stateParams, $state, $timeout) {
  $scope.NewUser = {};

  $scope.Register = function(){

    if($scope.NewUser.password == $scope.NewUser.repeat){
      $http.post(base_url+'/user/signup', $scope.NewUser)
        .success(function(response){
          console.log('Usuario registrado');
          console.log(response);
          console.log("register");
          $scope.UserRegistred = {
            username: $scope.NewUser.username,
            password: $scope.NewUser.password
          }
          console.log($scope.UserRegistred);
          $http.post(base_url + '/user/login', $scope.UserRegistred)
            .success(function (response) {
              console.log('login');
              console.log(response);
              $rootScope.UserID = response._id;
              $rootScope.User = response;
              $state.go('app.main');
            })
            .error(function (err) {
              console.log('Error: '+err);
            });

        })
        .error(function(err){
          console.log('Error:' + err);
          $ionicPopup.alert({
            title: 'Error',
            template: 'No se ha podido registrar el usuario'
          });
          console.log('Error: '+err);
        })
    }
    else{
      $ionicPopup.alert({
        title: 'Error',
        template: 'Las contraseñas no coinciden'
      });
    }

  };

});
