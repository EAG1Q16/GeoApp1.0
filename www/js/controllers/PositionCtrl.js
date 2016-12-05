/**
 * Created by Andrea on 05/12/2016.
 */

app.controller('PositionCtrl', function ($scope, $http,$rootScope, $ionicPopup, $stateParams, $state, $timeout) {


  document.addEventListener("deviceready", onDeviceReady, false);

  var watchID = null;

  // device APIs are available
  //
  function onDeviceReady() {
    // Throw an error if no update is received every 30 seconds
    var options = { timeout: 30000 };
    watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);
  }

  // onSuccess Geolocation
  //
  function onSuccess(position) {
    var element = document.getElementById('geolocation');
    element.innerHTML = 'Latitude: '  + position.coords.latitude      + '<br />' +
      'Longitude: ' + position.coords.longitude     + '<br />' +
      '<hr />'      + element.innerHTML;
  }

  // onError Callback receives a PositionError object
  //
  function onError(error) {
    alert('code: '    + error.code    + '\n' +
      'message: ' + error.message + '\n');
  }

  

});
