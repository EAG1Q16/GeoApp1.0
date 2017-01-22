
app.controller('PositionCtrl', function($scope, $http, $cordovaGeolocation,  $cordovaLocalNotification, $state, $ionicLoading, $compile, $rootScope, $ionicPopup, $ionicModal) {

//Get plugin
  var bgLocationServices =  window.plugins.backgroundLocationServices;
  $scope.position ="";
  var idbueno ='0';
  var pistas_modal=[];

//Congfigure Plugin
  bgLocationServices.configure({
    //Both
    desiredAccuracy: 5, // Desired Accuracy of the location updates (lower means more accurate but more battery consumption)
    distanceFilter: 1, // (Meters) How far you must move from the last point to trigger a location update
    debug: true, // <-- Enable to show visual indications when you receive a background location update
    interval: 5000, // (Milliseconds) Requested Interval in between location updates.
    useActivityDetection: false, // Uses Activitiy detection to shut off gps when you are still (Greatly enhances Battery Life)

    //Android Only
    notificationTitle: 'Geofinder', // customize the title of the notification
    notificationText: 'Estas jugando una aventura', //customize the text of the notification
    fastestInterval: 1000 // <-- (Milliseconds) Fastest interval your app / server can handle updates

  });

  //Empieza el servicio
  bgLocationServices.start();

//Register a callback for location updates, this is where location objects will be sent in the background
  bgLocationServices.registerForLocationUpdates(function(location) {

    //Post para buscar pistas cercanas a nuestra posicion
    $http.post(base_url+'/adventures/hintnear/',
      {
        latitude: location.latitude,
        longitude: location.longitude,
        advid: $rootScope.advid
      })
      .success(function (data) {

        var id = data._id;

        if (id != idbueno){
          //si es la pista final
          console.log("es la final?", data.final);
          if(data.final == true){
            navigator.vibrate(2000);
            $cordovaLocalNotification.schedule({
              id: 1,
              title: 'Felicidades has finalizado esta aventura!',
              text: data.text,
              data: {
                customProperty: 'custom value'
              }
            });


            var played = {
              user_id: $rootScope.UserID
            };


            pistas_modal.push(data);
            $scope.hints=pistas_modal;

            var marker = new google.maps.Marker({
              position: new google.maps.LatLng(data.location.coordinates[1],data.location.coordinates[0]),
              title:"Hello World!",
              icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
            });

            marker.setMap(map);
            idbueno = id;

            //Para el servicio
            bgLocationServices.stop();

            $http.post(base_url+'/user/advplay/', played)
              .success(function (data) {
                console.log(data);
                console.log('esta vez etro en el modal si o si');
                $scope.modal2.show();
     /*           var alertPopup = $ionicPopup.alert({
                  title: '¡Felicidades!',
                  template: 'Has ganado 30 puntos por finalizar esta aventura'
                });
                alertPopup.then(function(res) {
                  $state.go("app.main");

                });*/

              }).error(function (err) {
              console.log(err);
            });



          }else{

          navigator.vibrate(2000);
          $cordovaLocalNotification.schedule({
            id: 1,
            title: 'Pista!',
            text: data.text,
            data: {
              customProperty: 'custom value'
            }
          });
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


  $cordovaGeolocation.getCurrentPosition().then(
    function (position) {
      console.log("TENGO LA POSICION!" + position.coords.latitude);
      map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
      var myLocation = new google.maps.Marker({
        position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
        map: map,
        title: "My Location"
      });
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
        } else {
          console.log('You are not sure');
        }
      });
    };

  $scope.endgame = function() {
    console.log("estamos en el endgame");
    $cordovaLocalNotification.clearAll();
    var alertPopup = $ionicPopup.alert({
      title: '¡Felicidades!',
      template: 'Has ganado 30 puntos por finalizar esta aventura'
    });
    alertPopup.then(function(res) {
        $state.go("app.main");
        $scope.modal2.remove();
    });
  };


 console.log('rootscopeeee' , $rootScope.advid);

  $ionicModal.fromTemplateUrl('templates/gif.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal2 = modal;
  });

  $ionicModal.fromTemplateUrl('templates/hints.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

});


