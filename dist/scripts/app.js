var app = angular.module('GoneGrrrapp', ['firebase','ui.router']);
    app.controller('GrrrController', function($scope, $firebaseArray) {                                 
        
              
       var ref = new Firebase('https://blistering-fire-9917.firebaseio.com');
        $scope.tasks = $firebaseArray(ref.child('tasks'));
        
        $scope.addTask = function(){
            $scope.tasks.$add({
                taskTitle: $scope.firstTask,
                taskActive: true
            });
        }
        
       
        
        
 });
