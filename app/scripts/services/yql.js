'use strict';

/**
 * @ngdoc service
 * @name aktienApp.yql
 * @description
 * # yql
 * Service in the aktienApp.
 */
angular.module('aktienApp')
    .factory('yql', function ($q, $http) {
        var fixedEncodeURIComponent = function (str) {
            return encodeURIComponent(str).replace(/[!'()]/g, escape).replace(/\*/g, "%2A").replace(/\"/g, "%22");
        };
        var format = '&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=JSON_CALLBACK';

        return {

            // return a promise to controller
            getHistoricalDataWithQ: function (symbol, start, end) {
                var deferred = $q.defer();
                var query = 'select * from yahoo.finance.historicaldata where symbol = "' + symbol + '" and startDate = "' + start + '" and endDate = "' + end + '"';
                var url = 'http://query.yahooapis.com/v1/public/yql?q=' + fixedEncodeURIComponent(query) + format;
                url = url.replace("%2A", "*");

                $http.jsonp(url).success(function (json) {
                    console.log(JSON.stringify(json));
                    var quotes = json.query.results.quote;
                    console.log(quotes);
                    // filter + format quotes here if you want
                    deferred.resolve(quotes);
                }).error(function (error) {
                    console.log(JSON.stringify(error));
                });
                return deferred.promise;
            },
            // add a callback from controller
            getHistoricalDataWithCallback: function (callback, symbol, start, end) {
                var query = 'select * from yahoo.finance.historicaldata where symbol = "' + symbol + '" and startDate = "' + start + '" and endDate = "' + end + '"';
                var url = 'https://query.yahooapis.com/v1/public/yql?q=' + fixedEncodeURIComponent(query) + format;
                url = url.replace("%2A", "*");

                $http.jsonp(url).success(function (json) {
                    console.log(JSON.stringify(json));
                    var quotes = json.query.results.quote;
                    console.log(quotes);
                    // filter + format quotes here if you want
                    callback(quotes);
                }).error(function (error) {
                    console.log(JSON.stringify(error));
                });
            },
            // let angular watch the scope change implicitly
            getHistoricalDataWithWatch: function (symbol, start, end) {
                var query = 'select * from yahoo.finance.historicaldata where symbol = "' + symbol + '" and startDate = "' + start + '" and endDate = "' + end + '"';
                var url = 'http://query.yahooapis.com/v1/public/yql?q=' + fixedEncodeURIComponent(query) + format;

                console.log(url);

                var quotes = {};

                $http.jsonp(url).success(function (json) {
                    console.log(JSON.stringify(json));
                    quotes.list = json.query.results.quote;
                }).error(function (error) {
                    console.log(JSON.stringify(error));
                });
                return quotes;
            }

        };
    });