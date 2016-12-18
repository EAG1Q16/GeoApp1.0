/**
 * Created by Andrea on 05/12/2016.
 */

app.controller('PositionCtrl', function ($scope, $http,$rootScope, $ionicPopup, $stateParams, $state, $timeout) {


  //Make sure to get at least one GPS coordinate in the foreground before starting background services
  navigator.geolocation.getCurrentPosition(function() {
    console.log("Succesfully retreived our GPS position, we can now start our background tracker.");
  }, function(error) {
    console.error(error);
  });

//Get plugin
  var bgLocationServices =  window.plugins.backgroundLocationServices;

//Congfigure Plugin
  bgLocationServices.configure({
    //Both
    desiredAccuracy: 20, // Desired Accuracy of the location updates (lower means more accurate but more battery consumption)
    distanceFilter: 5, // (Meters) How far you must move from the last point to trigger a location update
    debug: true, // <-- Enable to show visual indications when you receive a background location update
    interval: 9000, // (Milliseconds) Requested Interval in between location updates.
    useActivityDetection: true, // Uses Activitiy detection to shut off gps when you are still (Greatly enhances Battery Life)

    //Android Only
    notificationTitle: 'BG Plugin', // customize the title of the notification
    notificationText: 'Tracking', //customize the text of the notification
    fastestInterval: 5000 // <-- (Milliseconds) Fastest interval your app / server can handle updates

  });

//Register a callback for location updates, this is where location objects will be sent in the background
  bgLocationServices.registerForLocationUpdates(function(location) {
    console.log("We got an BG Update" + JSON.stringify(location));
  }, function(err) {
    console.log("Error: Didnt get an update", err);
  });

//Register for Activity Updates

//Uses the Detected Activies / CoreMotion API to send back an array of activities and their confidence levels
//See here for more information:
//https://developers.google.com/android/reference/com/google/android/gms/location/DetectedActivity
  bgLocationServices.registerForActivityUpdates(function(activities) {
    console.log("We got an activity update" + activities);
  }, function(err) {
    console.log("Error: Something went wrong", err);
  });

//Start the Background Tracker. When you enter the background tracking will start, and stop when you enter the foreground.
  bgLocationServices.start();


///later, to stop
  bgLocationServices.stop();



});
