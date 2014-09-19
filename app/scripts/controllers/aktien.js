'use strict';

/**
 * @ngdoc function
 * @name aktienApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the aktienApp
 */
angular.module('aktienApp')
    .controller('AktienCtrl', function ($scope, $firebase, $location, userservice, yql) {
        /**
         yql.getHistoricalDataWithCallback(function(data) {
            console.log("YAHOO");
            $scope.items = data;
        }, "AAPL", "2014-08-26", "2014-09-03");
         *
         */
        $scope.StockItems = Array();
        $scope.stockData = Array();
        $scope.stockKPI = Array();
        $scope.data1 = {

            series: ['5 Tage', '4 Tage', '3 Tage', '2 Tage', 'Heute'],

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


        $scope.$watchCollection('stockData', function (newValue, oldValue) {
            // Aktien in den Index Schreiben
            var series = Array();

            var seriesData = Array();
            var days = 10;
            console.log("stockdata");
            console.log(newValue);
            console.log(newValue.length);

            for (var i = 0; i < days; i++) {
                var obj = {};
                if (i == 0) {
                    obj.x = "Heute";
                } else if (i == 1) {
                    obj.x = "Gestern";
                } else {
                    obj.x = "Tag " + (i + 1);
                }
                obj.y = Array();
                for (var q = 0; q < newValue.length; q++) {
                    series[q] = newValue[q][0];
                    obj.y.push(parseInt(newValue[q][1][i]["Close"]));
                }

                seriesData.push(obj);

            }
            $scope.data1.series = series;
            $scope.data1.data = seriesData;

            console.log(" ==== ==== ");
            console.log(seriesData);
            /**   $scope.data1.data= [{
                x: "Tag 1",
                y: [100, 500],
                tooltip: "this is tooltip"
            }, {
                x: "Tag 2",
                y: [300, 100]
            }, {
                x: "Tag 3",
                y: [351,11]
            }, {
                x: "Tag 4",
                y: [54, 0]
            }, {
                x: "Tag 5",
                y: [54, 0]
            }];**/
            console.log(" ==== ==== ");
            console.log($scope.data1.data);
            //$scope.$apply();
        });
        $scope.chartType = 'line';
        $scope.config1 = {
            labels: false,
            title: "Aktien",
            legend: {
                display: true,
                position: 'left'
            },
            innerRadius: 0
        };
        $scope.addStock = function () {
            if ($scope.newStock != "") {
                var user = userservice.getUser();
                var uid = user.uid;
                var usersRef = userservice.ref.child("users/" + uid + "/aktien");
                var obj = {};
                obj.name = $scope.newStock;
                obj.wert = $scope.newStockVal;
                obj.stueck = $scope.newStockCount;
                obj.datum = $scope.newStockDate;
                usersRef.push(obj);
            }
        };
        $scope.getStock = function () {
            var user = userservice.getUser();
            var uid = user.uid;
            var usersRef = userservice.ref.child("users/" + uid + "/aktien");

            usersRef.on('value', function (snapshot) {
                var obj = snapshot.val();
                var log = [];
                angular.forEach(obj, function (value, key) {
                    this.push(value);
                }, log);
                $scope.StockItems = log;
                var now = Date.today();
                var nowtxt = now.toString('yyyy-MM-dd');
                var last = (-14).days().fromNow();
                var lasttxt = last.toString('yyyy-MM-dd');


                angular.forEach(log, function (value, key) {
                    console.log("search for: " + value.name);
                    var promise = yql.getHistoricalDataWithQ(value.name, lasttxt, nowtxt);
                    var aktie = value.name;
                    var wert = value.wert;
                    var stueck = value.stueck;
                    promise.then(function (data) {
                        console.log(" DATA ");
                        console.log(data);
                        var lastclose = data[0].Close;
                        var stockvalue;
                        if (lastclose < wert) {
                            stockvalue = wert - lastclose * stueck * -1;
                        } else {
                            stockvalue = lastclose - wert * stueck;
                        }
                        $scope.stockData.push(Array(aktie, data));
                        $scope.stockKPI.push(Array(aktie, wert, stueck, lastclose, stockvalue));


                    });
                });
                console.log(log);
            }, function (errorObject) {
                console.log('The read failed: ' + errorObject.code);
            });
        };
    });
