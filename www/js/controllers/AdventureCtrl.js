/**
 * Created by Marta_ on 28/11/2016.
 */




app.controller('AdventureCtrl', function ($scope, $ionicPopup, $http, $rootScope, $stateParams, $timeout, $state){
  console.log("rootscope: "+$rootScope.UserID);
  var adventureID = window.location.href.split("/").pop();
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

  //FAV y UNFAV
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

  //Tweet
  $scope.AddTweet = function () {

  };

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
      title: 'Esta seguro que quiere eliminar este comentario?'
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
