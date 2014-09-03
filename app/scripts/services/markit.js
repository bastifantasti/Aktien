'use strict';

/**
 * @ngdoc service
 * @name aktienApp.Markit
 * @description
 * # Markit
 * Service in the aktienApp.
 */
angular.module('aktienApp')
  .service('Markit', function Markit() {
    // AngularJS will instantiate a singleton by calling "new" on this function
        var symbol;
        var fCallback;
        var ChartCallback;
        var DATA_SRC;
        var duration;

        var _fixDate = function(dateIn) {
            var dat = new Date(dateIn);
            return Date.UTC(dat.getFullYear(), dat.getMonth(), dat.getDate());
        };
        var _getOHLC = function(json) {
            var dates = json.Dates || [];
            var elements = json.Elements || [];
            var chartSeries = [];

            if (elements[0]){

                for (var i = 0, datLen = dates.length; i < datLen; i++) {
                    var dat = _fixDate( dates[i] );
                    var pointData = [
                        dat,
                        elements[0].DataSeries['open'].values[i],
                        elements[0].DataSeries['high'].values[i],
                        elements[0].DataSeries['low'].values[i],
                        elements[0].DataSeries['close'].values[i]
                    ];
                    chartSeries.push( pointData );
                };
            }
            return chartSeries;
        };
        var _getVolume = function(json) {
            var dates = json.Dates || [];
            var elements = json.Elements || [];
            var chartSeries = [];

            if (elements[1]){

                for (var i = 0, datLen = dates.length; i < datLen; i++) {
                    var dat = _fixDate( dates[i] );
                    var pointData = [
                        dat,
                        elements[1].DataSeries['volume'].values[i]
                    ];
                    chartSeries.push( pointData );
                };
            }
            return chartSeries;
        };


        var getInputParams = function() {
            return {
                Normalized: false,
                NumberOfDays: duration,
                DataPeriod: "Day",
                Elements: [
                    {
                        Symbol: symbol,
                        Type: "price",
                        Params: ["ohlc"] //ohlc, c = close only
                    },
                    {
                        Symbol: symbol,
                        Type: "volume"
                    }
                ]
                //,LabelPeriod: 'Week',
                //LabelInterval: 1
            }
        };

        var PlotChart = function(){

            var params = {
                parameters: JSON.stringify( getInputParams() )
            }

            //Make JSON request for timeseries data
            var xhr = $.ajax({
                data: params,
                url: "http://dev.markitondemand.com/Api/v2/InteractiveChart/jsonp",
                dataType: "jsonp",
                success: ChartCallback,
                error: handleError,
                context: this
            });


        };






        /**
         * Ajax success callback. fCallback is the 2nd argument in the QuoteService constructor.
         */
       var handleSuccess = function(jsonResult) {
            fCallback(jsonResult);
        };
        /**
         * Ajax error callback
         */
        var handleError = function(jsonResult) {
            console.error(jsonResult);
        };
        /**
         * Starts a new ajax request to the Quote API
         */
        var makeRequest = function() {
            //Abort any open requests
          //  if (this.xhr) { this.xhr.abort(); }
            //Start a new request
            var xhr = $.ajax({
                data: { symbol: symbol },
                url: DATA_SRC,
                dataType: "jsonp",
                success: handleSuccess,
                error: handleError,
                context: this
            });
        };

        /**
         * Define the QuoteService.
         * First argument is symbol (string) for the quote. Examples: AAPL, MSFT, JNJ, GOOG.
         * Second argument is fCallback, a callback function executed onSuccess of API.
         */
        var QuoteService = function(sSymbol, fCback) {
            symbol = sSymbol;
            fCallback = fCback;
            DATA_SRC = "http://dev.markitondemand.com/Api/v2/Quote/jsonp";
            console.log("test");
            makeRequest();
        };

        var InteractiveChartApi = function(sSymbol,dDuration,chartCallback){
            symbol = sSymbol.toUpperCase();
            duration = dDuration;
            ChartCallback = chartCallback;
            PlotChart();
        };
        var RenderChart = function(data,htmlobj){
            var ohlc = _getOHLC(data),
                volume = _getVolume(data);

            // set the allowed units for data grouping
            var groupingUnits = [[
                'week',                         // unit name
                [1]                             // allowed multiples
            ], [
                'month',
                [1, 2, 3, 4, 6]
            ]];

            // create the chart
            $(htmlobj).highcharts('StockChart', {

                rangeSelector: {
                    selected: 1
                    //enabled: false
                },

                title: {
                    text: symbol + ' Historical Price'
                },

                yAxis: [{
                    title: {
                        text: 'OHLC'
                    },
                    height: 200,
                    lineWidth: 2
                }, {
                    title: {
                        text: 'Volume'
                    },
                    top: 300,
                    height: 100,
                    offset: 0,
                    lineWidth: 2
                }],

                series: [{
                    type: 'candlestick',
                    name: symbol,
                    data: ohlc,
                    dataGrouping: {
                        units: groupingUnits
                    }
                }, {
                    type: 'column',
                    name: 'Volume',
                    data: volume,
                    yAxis: 1,
                    dataGrouping: {
                        units: groupingUnits
                    }
                }],
                credits: {
                    enabled:false
                }
            });
        };
        return {
            QuoteService: QuoteService,
            InteractiveChartApi:InteractiveChartApi,
            RenderChart:RenderChart

        };

/**
        new Markit.QuoteService("AAPL", function(jsonResult) {

            //Catch errors
            if (!jsonResult || jsonResult.Message){
                console.error("Error: ", jsonResult.Message);
                return;
            }

            //If all goes well, your quote will be here.
            console.log(jsonResult);

            //Now proceed to do something with the data.
            $("h1").first().text(jsonResult.Name);

        });
**/
  });
