/**
 * Created by Marta_ on 21/01/2017.
 */

app.controller('HelpCtrl', function ($scope, $rootScope, $ionicModal, $ionicPopup, $http, $stateParams, $timeout, $state) {

  // Called to navigate to the main app
  $scope.startApp = function() {
    $state.go('main');
  };
  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };

  $ionicModal.fromTemplateUrl('templates/sugerencias.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });


})
