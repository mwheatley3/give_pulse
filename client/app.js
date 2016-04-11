'use strict';

angular.module('myApp', [
    'ui.router',
    'myApp.main',
    'myApp.chart1',
    'myApp.chart2',
    'myApp.services',
    'highcharts-ng'
  ])

    .config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/views/main.html',
      controller: 'MainCtrl'
    })
    .state('chart1', {
      url: '/chart1',
      templateUrl: 'app/views/chart1.html',
      controller: 'Chart1Ctrl'
    })
    .state('chart2', {
      url: '/chart2',
      templateUrl: 'app/views/chart2.html',
      controller: 'Chart2Ctrl'
    });
        
});