angular.module('gonegrrrapp', ['firebase','ui.router']);
    app.controller('GrrrController', function($scope, $firebaseObject) {
  var ref = new Firebase('https://blistering-fire-9917.firebaseio.com/');
  // download the data into a local object
  var syncObject = $firebaseObject(ref);
  // synchronize the object with a three-way data binding
  // click on `index.html` above to see it used in the DOM!
  syncObject.$bindTo($scope, "data");

});