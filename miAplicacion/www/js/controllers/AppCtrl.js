var base_url = "http://localhost:3000";
app.controller('AppCtrl', function ($scope, $state, $http, $ionicModal, $rootScope, $ionicPopover, $timeout, $ionicPopup) {
    // Form data for the login modal
    $scope.loginData = {};
    console.log('AppCtrl');
    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function () {
            this.classList.toggle('active');
        });
    }

    var template = '<ion-popover-view>' +
                    '   <ion-header-bar>' +
                    '       <h1 class="title">My Popover Title</h1>' +
                    '   </ion-header-bar>' +
                    '   <ion-content class="padding">' +
                    '       My Popover Contents' +
                    '   </ion-content>' +
                    '</ion-popover-view>';

    $scope.popover = $ionicPopover.fromTemplate(template, {
        scope: $scope
    });
    $scope.closePopover = function () {
        $scope.popover.hide();
    };
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.popover.remove();
    });

  $http.get(base_url+'/user/my/'+$rootScope.UserID)
    .success(function (response) {
      $scope.user = response;
    })
    .error(function (response) {
      console.log("Error: "+response);
    })
})

/*app.controller('MainCtrl', function ($scope, $ionicPopup, $http, $rootScope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, $state){
  console.log("rootscope: "+$rootScope.UserID);
  $http.get(base_url+'/adventures')
    .success(function (response) {
      console.log("aventuriiiis");
      $scope.items = response;
      console.log(response);
    })
    .error(function(data) {
      console.log('Error: '+data);
    })

  $scope.clean = function(busqueda){
    $scope.busqueda = {};
  }

  $scope.showNear = function(){

  }
  $scope.AdvProfile = function(id){
    console.log("click")
    $state.go("adventures"+'/'+id);
  }


  $scope.showAll = function(){
    $http.get(base_url+'/adventures')
      .success(function (response) {
        console.log("todas las aventuras");
        $scope.items = response;
        console.log(response);
      })
      .error(function(data) {
        console.log('Error: '+data);
      })

  }

})*/
/*
app.controller('MyAdventureCtrl', function ($scope, $rootScope, $http, $ionicPopup, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, $state){
  console.log("rootscope: "+$rootScope.UserID);
  $http.get(base_url+'/user/my/'+$rootScope.UserID)
    .success(function (response) {
        $scope.adventures = response.adventures.created;
      console.log(response);
      console.log(response.adventures.created);
    })
    .error(function (response) {
      console.log("Error: "+response);
    })

  $scope.showCreadas = function(){

  }
  $scope.showJugadas = function(){

  }
})*/
/*
app.controller('EditUserCtrl', function ($scope, $ionicPopup, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, $state) {
 $scope.user = {
   username: 'martacou',
   name: 'Marta Couto',
   image: '/img/geofinderico.png',
   email: 'marta.couto.g@gmail.com',
   birthdate: '30/07/1993',
   gender:'Mujer',
   registerdate: '2009'
 }

  console.log('Entra en el controller EditUserCtrl');
  $scope.EditProfile = function () {
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

    });

  };
})*/
/*
app.controller('AdventureCtrl', function ($scope, $ionicPopup, $http, $rootScope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, $state){
  console.log("rootscope: "+$rootScope.UserID);
  var adventureID = window.location.href.split("/").pop();
  console.log("AdventureID: " + adventureID);

  http.get(base_url+'/adventures/id/' + adventureID)
    .success(function(data){
      $scope.AdventureProfile = data;
      $scope.comments = data.comments;
      console.log($scope.AdventureProfile);
      console.lof($scope.comments);
    })
    .error(function (data) {
      console.log("Error: " + data);
    })

})*/
