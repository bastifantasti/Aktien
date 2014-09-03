'use strict';

/**
 * @ngdoc function
 * @name aktienApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the aktienApp
 */
angular.module('aktienApp')
  .controller('AktienCtrl', function ($scope,$firebase,Markit,$location) {



        $scope.data1 = {
            series: ['Sales', 'Income', 'asd', 'Laptops', 'Keyboards'],
            data: [{
                x: "Sales",
                y: [100, 500, 0],
                tooltip: "this is tooltip"
            }, {
                x: "Not Sales",
                y: [300, 100, 100]
            }, {
                x: "Tax",
                y: [351]
            }, {
                x: "Not Tax",
                y: [54, 0, 879]
            }]
        };



        $scope.chartType = 'line';

        $scope.config1 = {
            labels: false,
            title: "Products",
            legend: {
                display: true,
                position: 'left'
            },
            innerRadius: 0
        };



        /*
         GET /stockquote.asmx/GetQuote?symbol=string HTTP/1.1
         Host: www.webservicex.net
         */



        var test = function (obj){
            console.log("callback");
            console.log(obj);

        };
        var makechart = function (obj){
            console.log(obj);
         //   Markit.RenderChart(obj,"#container");

        };
        Markit.QuoteService("AAPL",test);
        Markit.InteractiveChartApi("AAPL",7,makechart);


    });
