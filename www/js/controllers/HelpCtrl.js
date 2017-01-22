/**
 * Created by Marta_ on 21/01/2017.
 */

app.controller('HelpCtrl', function ($scope, $rootScope, $ionicModal, $ionicPopup, $http, $stateParams, $timeout, $state) {

  $ionicModal.fromTemplateUrl('templates/sugerencias.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });


})
