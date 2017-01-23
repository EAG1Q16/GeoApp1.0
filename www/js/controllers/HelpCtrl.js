/**
 * Created by Marta_ on 21/01/2017.
 */

app.controller('HelpCtrl', function ($scope, $rootScope, $ionicModal, $ionicSlideBoxDelegate, $ionicPopup, $http, $stateParams, $timeout, $state) {

  //Navigation throw the slides
  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
    console.log("next");
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
    console.log("previous");
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };

  $scope.qrinfo = $rootScope.User.referalid;

  //SUGGESTIONS
  $ionicModal.fromTemplateUrl('templates/sugerencias.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.enviar = function () {
    $scope.suggestion = {};
    $scope.modal.hide();
    $scope.suggestion =  {subject: '', body: ''};
  }
})

