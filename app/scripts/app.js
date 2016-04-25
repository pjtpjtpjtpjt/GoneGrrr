(function() {
     function config($stateProvider, $locationProvider) {
         $locationProvider
             .html5Mode({
                 enabled: true,
                 requireBase: false
             });

         $stateProvider
         .state('home', {
             url: '/',
             templateUrl: '/templates/home.html',
             controller: 'GrrrController'
         });  
     }

var app = angular.module('GoneGrrrapp', ['firebase','ui.router']);
    app.config(config);
    app.controller('GrrrController', function($scope, $firebaseArray) {
        var ref = new Firebase('https://blistering-fire-9917.firebaseio.com');
        $scope.tasks = $firebaseArray(ref.child('tasks'));
        $scope.addTask = function(){
            console.log($scope.firstTask);
            $scope.tasks.$add({
                taskTitle: $scope.firstTask,
                taskActive: true
            });
        }
 });})();
