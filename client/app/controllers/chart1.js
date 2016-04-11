'use strict';

angular.module('myApp.chart1', [])
  .controller('Chart1Ctrl', ['$scope','Service', function($scope,Service) {
  	$scope.data = [];

		$scope.getData = function(){
			Service.getData()
			.then(function(resp) {
				$scope.data = resp;
				$scope.data.forEach(function(type) {
					$scope.chartConfig1.xAxis.categories.push(type.type);
					$scope.chartConfig1.series[0].data.push(type.hours);
				});
			})
		}();


		$scope.chartConfig1 = {
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
      	data: []
      }],
	    loading: false
		}

  }]);

  



