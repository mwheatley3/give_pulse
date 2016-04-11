'use strict';

angular.module('myApp.chart2', [])
  .controller('Chart2Ctrl', ['$scope','Service', function($scope,Service) {
  	$scope.data = [];

		$scope.getData2 = function(){
			Service.getData2()
			.then(function(resp) {
				$scope.data = resp;
				$scope.data.forEach(function(skill) {
					$scope.chartConfig2.xAxis.categories.push(skill.skill);
					$scope.chartConfig2.series[0].data.push(skill.events);
					$scope.chartConfig2.series[1].data.push(skill.users);
				});
			})
		}();

		$scope.chartConfig2 = {
	    options: {
	      chart: {
	        type: 'column'
	      }
	    },
	    title: {
	      text: 'What type of skills are needed?',
	      align: 'left' 
	    },
	    xAxis: {
        categories: []
      },
      yAxis: {
        title: {
          text: 'Number of Events vs. Users'
        }
      },
      series: [{
      	name: 'events needing skill',
      	data: []
      }, {
      	name: 'users having skill',
      	data: []
      }],
      size: {
   			width: 2000,
   			height: 400
  		},
	    loading: false
		}

  }]);

  



  