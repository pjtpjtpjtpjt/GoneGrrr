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
         
         $stateProvider
         .state('task-history', {
             url: '/',
             templateUrl: '/templates/task-history.html',
             controller: 'GrrrController'
         }); 
         
     }

var app = angular.module('GoneGrrrapp', ['firebase','ui.router']);
    app.config(config);
    app.controller('GrrrController', function($scope, $firebaseArray) {
        
        var ref = new Firebase('https://blistering-fire-9917.firebaseio.com');
        $scope.tasks = $firebaseArray(ref.child('tasks'));
        
        setInterval(function () {
        var timeNow = Date.now()
            for(i =0; i < $scope.tasks.length; i++){
                if ($scope.tasks[i].taskCompleted === true){
                    return
                };
                var timeDiff = (timeNow-$scope.tasks[i].taskCreatedActual)
                var expiredTime = (timeDiff/1000)/60;
                    if(expiredTime > 1){
                        $scope.tasks[i].taskActive = false;
                        $scope.tasks.$save($scope.tasks[i]);
                    } 
                }
        }, 10000);

        $scope.hideCriteriaTest = function(){
            if(this.task.taskCompleted === true || !this.task.taskActive){
            return true;
            };
        }
        
        $scope.updateTaskCompleted = function (){
            if(this.task.taskCompleted === true){
                this.task.taskCompleted = false
                $scope.tasks.$save(this.task);
            } else {
                this.task.taskCompleted = true;
                $scope.tasks.$save(this.task);
            }
        }
        
        $scope.taskPriorityList = ['Low','Medium','High'];
            $scope.setPriority = function(){
                $scope.taskPrioritySelected = $scope.taskPriority;
                $scope.priorityIndex = $scope.taskPriorityList.indexOf($scope.taskPriority);
            }
            
        $scope.addTask = function(){
                $scope.createdTime = Date.now()
                $scope.createdTimeString = new Date().toLocaleString()
                $scope.tasks.$add({
                    taskTitle: $scope.firstTask,
                    taskActive: true,
                    taskCompleted: false,
                    taskCreatedActual: $scope.createdTime,
                    taskCreated: $scope.createdTimeString,
                    taskPriority: $scope.taskPrioritySelected,
                    taskPriorityIndex: $scope.priorityIndex
                });
            $scope.taskPriorityList = [];
            $scope.firstTask = '';
            
            }
 });})();
