


app.controller('RegisterCtrl', function ($scope, $http, $ionicPopup, $stateParams, $state, $timeout) {
  $scope.NewUser = {};

  $scope.Register = function(){

    if($scope.NewUser.password == $scope.NewUser.repeat){
      $http.post(base_url+'/user/signup', $scope.NewUser)
        .success(function(response){
          $scope.NewUser = {}; //clear the form
          console.log('Usuario registrado');
          console.log(response);
          $state.go('login');
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
