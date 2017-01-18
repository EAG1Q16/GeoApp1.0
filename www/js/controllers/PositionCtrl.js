
app.controller('PositionCtrl', function($scope, $http, $cordovaGeolocation, $state, $ionicLoading, $compile, $rootScope, $ionicPopup, $ionicModal) {

//Get plugin
  var bgLocationServices =  window.plugins.backgroundLocationServices;
  $scope.position ="";
  var idbueno ='0';
  var pistas_modal=[];

//Congfigure Plugin
  bgLocationServices.configure({
    //Both
    desiredAccuracy: 20, // Desired Accuracy of the location updates (lower means more accurate but more battery consumption)
    distanceFilter: 5, // (Meters) How far you must move from the last point to trigger a location update
    debug: true, // <-- Enable to show visual indications when you receive a background location update
    interval: 5000, // (Milliseconds) Requested Interval in between location updates.
    useActivityDetection: false, // Uses Activitiy detection to shut off gps when you are still (Greatly enhances Battery Life)

    //Android Only
    notificationTitle: 'Geofinder', // customize the title of the notification
    notificationText: 'Estas jugando una aventura', //customize the text of the notification
    fastestInterval: 1000 // <-- (Milliseconds) Fastest interval your app / server can handle updates

  });
  bgLocationServices.start();
  
//Register a callback for location updates, this is where location objects will be sent in the background
  bgLocationServices.registerForLocationUpdates(function(location) {
    console.log("We got an BG Update" + JSON.stringify(location));
    //track.push(location);
    console.log("Track" + location.latitude + ',' + location.longitude);
    $scope.position = location;
    $rootScope.cordenada = {
      latitude: location.latitude,
      longitude: location.longitude,
      advid: $rootScope.advid
    };

    $http.post(base_url+'/adventures/hintnear/', $scope.cordenada)
      .success(function (data) {
        console.log("cercanas", data);
        var id = data._id;
        console.log('id' , id)
        console.log('idbueno' , idbueno)

        if (id != idbueno){
          $ionicPopup.alert({
            title: 'Pista!',
            template: data.text
          });
          pistas_modal.push(data);
          $scope.hints=pistas_modal;
          var marker = new google.maps.Marker({
            position: new google.maps.LatLng(data.location.coordinates[1],data.location.coordinates[0]),
            title:"Hello World!",
            icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
          });

          marker.setMap(map);
          idbueno = id;
        }
      })
      .error(function (data) {
        console.log('Error: ' + data);
      });

  }, function(err) {
    console.log("Error: Didnt get an update", err);
  });

    var map;
    var myLatlng = new google.maps.LatLng(43.07493,-89.381388);

    var mapOptions = {
      center: myLatlng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map"),
      mapOptions);



    $scope.map = map;

  google.maps.event.addDomListener(window, 'load');

  track = [];
  $cordovaGeolocation.getCurrentPosition().then(
    function (position) {
      console.log("TENGO LA POSICION!" + position.coords.latitude);
      map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
      var myLocation = new google.maps.Marker({
        position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
        map: map,
        title: "My Location"
      });
      //bgLocationServices.start();
    });


  $scope.showConfirm = function() {
      var confirmPopup = $ionicPopup.confirm({
        title: 'AVISO!',
        template: 'Está seguro de que quiere abandonar esta aventura?'
      });

      confirmPopup.then(function(res) {
        if(res) {
          $state.go("app.main");
          bgLocationServices.stop();
          /*state.go("app.adventures"+'/'+ $rootScope.advid);*/
        } else {
          console.log('You are not sure');
        }
      });
    };

///later, to stop
  //bgLocationServices.stop();
 console.log('rootscopeeee' , $rootScope.advid);

  $ionicModal.fromTemplateUrl('templates/hints.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

});


