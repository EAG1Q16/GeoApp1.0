
app.controller('PositionCtrl', function($scope,$http, $cordovaGeolocation, $state, $ionicLoading, $compile, $rootScope, $ionicPopup) {

//Get plugin
  var bgLocationServices =  window.plugins.backgroundLocationServices;
  $scope.position ="";
  var idbueno ='0';

//Congfigure Plugin
  bgLocationServices.configure({
    //Both
    desiredAccuracy: 20, // Desired Accuracy of the location updates (lower means more accurate but more battery consumption)
    distanceFilter: 5, // (Meters) How far you must move from the last point to trigger a location update
    debug: true, // <-- Enable to show visual indications when you receive a background location update
    interval: 5000, // (Milliseconds) Requested Interval in between location updates.
    useActivityDetection: false, // Uses Activitiy detection to shut off gps when you are still (Greatly enhances Battery Life)

    //Android Only
    notificationTitle: 'BG Plugin', // customize the title of the notification
    notificationText: 'Tracking', //customize the text of the notification
    fastestInterval: 1000 // <-- (Milliseconds) Fastest interval your app / server can handle updates

  });


//Register a callback for location updates, this is where location objects will be sent in the background
  bgLocationServices.registerForLocationUpdates(function(location) {
    console.log("We got an BG Update" + JSON.stringify(location));
    track.push(location);
    console.log("Track" + location.latitude + ',' + location.longitude);
    $scope.position = location;
    $scope.cordenada = {
      latitude: location.latitude,
      longitude: location.longitude,
      advid: $rootScope.advid
    };

    $http.post(base_url+'/adventures/hintnear/', $scope.cordenada)
      .success(function (data) {
        //$scope.probando = (data);

        console.log("cercanas", data.text);

        var id = data._id;
        console.log('id' , id)
        console.log('idbueno' , idbueno)
        if (id != idbueno){
          $ionicPopup.alert({
            title: 'Pista!',
            template: data.text
          });
          console.log('para el map');
          console.log(data.location.coordinates[0]);
          console.log(data.location.coordinates[1]);
          var marker = new google.maps.Marker({
            position: new google.maps.LatLng(data.location.coordinates[1],data.location.coordinates[0]),
            title:"Hello World!"
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

      track = [];
      bgLocationServices.start();
    });

///later, to stop
  //bgLocationServices.stop();
 console.log('rootscopeeee' , $rootScope.advid);

});


