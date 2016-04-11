'use strict';

angular.module('myApp.chart1', [])
  .controller('Chart1Ctrl', ['$scope','Service', function($scope,Service) {
  	$scope.data = [];
    $scope.chartConfig1 = {
	    options: {
	      chart: {
	        type: 'bar'
	      }
	    },
	    title: {
	      text: 'Hello'
	    },
	    xAxis: {
            categories: ['Apples', 'Bananas', 'Oranges']
        },
        yAxis: {
            title: {
                text: 'Fruit eaten'
            }
        },
        series: [{
            name: 'Jane',
            data: [1, 0, 4]
        }, {
            name: 'John',
            data: [5, 7, 3]
        }],
	    loading: false
		}

		$scope.getData = function(){
			Service.getData()
			.then(function(resp) {
				$scope.data = resp;
				$scope.data.forEach(function(type) {
					$scope.chartConfig2.xAxis.categories.push(type.type);
					$scope.chartConfig2.series[0].data.push(type.hours);
				});
			})
		}();


		$scope.chartConfig2 = {
	    options: {
	      chart: {
	        type: 'bar'
	      }
	    },
	    title: {
	      text: 'What type of organizations give their time?'
	    },
	    xAxis: {
            categories: []
        },
        yAxis: {
            title: {
                text: 'Hours'
            }
        },
        series: [{
        	name: 'Hours',
        	data:[]
        }],
	    loading: false
		}

  }]);

  



  