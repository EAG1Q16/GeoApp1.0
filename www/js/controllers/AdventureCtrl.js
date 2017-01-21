/**
 * Created by Marta_ on 28/11/2016.
 */
app.controller('AdventureCtrl', function ($scope, $cordovaGeolocation, $ionicModal, $ionicPopup, $http, $rootScope, $stateParams, $timeout, $state){
  console.log("rootscope: "+$rootScope.UserID);
  var adventureID = window.location.href.split("/").pop();
  $rootScope.advid = adventureID;
  console.log("AdventureID: " + adventureID);

  //Obtener los datos para mostrar detalles de una aventura
  $http.get(base_url+'/adventures/id/' + adventureID)
    .success(function(data){
      $scope.AdventureProfile = data;
      $scope.comments = data.comments;
      angular.forEach($scope.comments, function (comment, key) {
        console.log(key);
        comment.commentdate = moment(comment.commentdate, "").fromNow();
      });
      console.log($scope.AdventureProfile);
      console.log($scope.comments);
    })
    .error(function (data) {
      console.log("Error: " + data);
    });

  // Saber si la aventura esta en favs o no
  $http.get(base_url+'/user/isadvfav/' + adventureID +'/'+ $rootScope.UserID)
    .success(function(data) {
      console.log(data);
      $scope.isfav = data;
      console.log("isfav: " + $scope.isfav);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

  //FAV
  $scope.FavAdventure = function () {
      $http.post(base_url+'/user/afavadv/' + adventureID, $rootScope.User)
        .success(function(data){
          $scope.AdventureProfile = data;
          $http.get(base_url+'/user/isadvfav/' + adventureID +'/'+ $rootScope.UserID)
            .success(function(data) {
              console.log(data);
              $scope.isfav = data;
              console.log($scope.isfav);
            })
            .error(function(data) {
              console.log('Error: ' + data);
            });

        })
        .error(function(data) {
          console.log('Error' + data);
        });
  };

  //UNFAV
  $scope.UnfavAdventure = function () {
    $http.delete(base_url+'/user/uafavadv/' + adventureID +'/'+ $rootScope.UserID)
      .success(function(data){
        $scope.AdventureProfile = data;
        $http.get(base_url+'/user/isadvfav/' + adventureID +'/'+ $rootScope.UserID)
          .success(function(data) {
            console.log(data);
            $scope.isfav = data;
            console.log($scope.isfav);
          })
          .error(function(data) {
            console.log('Error: ' + data);
          });

      })
      .error(function(data) {
        console.log('Error' + data);
      });
  };



  $scope.jugar = function () {
    console.log('Estoy aquiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii');
    //$state.go('app.position');
    var posOptions = {timeout: 1000, enableHighAccuracy: false};
    $cordovaGeolocation.getCurrentPosition(posOptions).then(
      function (position) {
      console.log('hi');
     $rootScope.cordenada = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        advid: $rootScope.advid
      };
      console.log('coooordeeee', $scope.cordenada);

      $http.post(base_url+'/adventures/posicion/', $scope.cordenada)
        .success(function (data) {
          console.log('data',data);
          if(data == false){
            $ionicPopup.alert({
              title: 'AVISO!',
              template: 'Dirígete a la localización de la aventura!'
            });
            $state.go('app.adventures', {
              param1:  $rootScope.advid
            });
          }
          if(data == true){
            //here we make the post to add the adventure in the played array
            var played = {
              user_id: $rootScope.UserID,
              adventure_id: $rootScope.advid
            };


            $http.post(base_url+'/user/aplayedadv/', played)
              .success(function (data) {
                console.log(data);
                $state.go('position');
              }).error(function (err) {
              $ionicPopup.alert({
                title: 'AVISO!',
                template: 'Algo ha ocurrido mal vuelve a intentarlo!'
              });
            });
            var playedadv = {
              adventure_id: $rootScope.advid
            };
            $http.post(base_url+'/adventures/timeplayed/', playedadv)
              .success(function (data) {
                console.log(data);
                $state.go('position');
              }).error(function (err) {
              $ionicPopup.alert({
                title: 'AVISO!',
                template: 'Algo ha ocurrido mal vuelve a intentarlo!'
              });
            });
          }
        })
        .error(function (data) {
          console.log('Error: ' + data);
        });
      },function (err) {
        console.log('error', err);
        $ionicPopup.alert({
          title: 'AVISO!',
          template: 'Activa la ubicación en tu dispositivo!'
        });
      });
  };

  //Tweet
  $scope.AddTweet = function () {
  };

  //Comments modal
  $scope.CommentsModal = function () {

  }
  $ionicModal.fromTemplateUrl('templates/comments.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });


  //Comentar una aventura
  $scope.NewComment={};
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
            $scope.AdventureProfile = data;
            angular.forEach($scope.comments, function (comment, key) {
              console.log(key);
              comment.commentdate = moment(comment.commentdate, "").fromNow();
            });
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

  //Eliminar un comentario
  $scope.deletecomment = function (cmd_id) {
    var ConfirmPopup = $ionicPopup.confirm({
      title: 'Está seguro que quiere eliminar este comentario?'
    });
    ConfirmPopup.then(function (res) {
      if(res){
        $http.delete(base_url+'/comments/deletecomment/' + cmd_id + '/' + adventureID)
          .success(function (data) {
            console.log("deletecomment");
            $scope.comments = data.comments;
            angular.forEach($scope.comments, function (comment, key) {
              console.log("FOREACH");
              console.log(key);
              comment.commentdate = moment(comment.commentdate, "").fromNow();
            });
          })
          .error(function (data) {
            console.log("Error" + data);
          });
      } else {
        console.log("No eliminas el comentario");
      }
    })

  };


})
