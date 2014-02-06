budgetApp.factory('userData', function($http) {
    var factory = {};
    factory.getUserData = function() {
        return $http.get('/budgetajs/app/dummydata.json');
    }
    return factory;
});

budgetApp.factory('graphUsage', ['graphConfig', function(graphConfig) {
    var factory = {};
    factory.createGraph = function(data, pointColor) {
        var graph = [];
        graph['data'] = {
            labels : [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
            datasets : [
                {
                    fillColor : 'rgba(238,241,244,.5)',
                    strokeColor : '#c4cedb',
                    pointColor : pointColor,
                    pointStrokeColor : '#fff',
                    data : data
                }]
        };
        graph['options'] = graphConfig;
        return graph;
    }
    return factory;

}]);

budgetApp.constant('graphConfig', {
       fillColor : 'rgba(238,241,244,.5)',
       strokeColor : '#c4cedb',
       pointColor : '#ffba61',
       pointStrokeColor : '#fff',
       scaleOverlay : false,
       scaleOverride : true,
       scaleSteps : 8,
       scaleStepWidth : 150,
       scaleStartValue : null,
       scaleLineColor : "rgba(0,0,0,.1)",
       scaleLineWidth : 1,
       scaleShowLabels : true,
       scaleLabel : "<%=value%>",
       scaleFontFamily : "'Arial'",
       scaleFontSize : 9,
       scaleFontStyle : "normal",
       scaleFontColor : "#949494",
       scaleShowGridLines : true,
       scaleGridLineColor : "rgba(0,0,0,.05)",
       scaleGridLineWidth : 1,
       bezierCurve : true,
       pointDot : true,
       pointDotRadius : 4,
       pointDotStrokeWidth : 2,
       datasetStroke : true,
       datasetStrokeWidth : 2,
       datasetFill : true,
       animation : true,
       animationSteps : 60,
       animationEasing : "easeOutQuart",
       onAnimationComplete : null,
       showTooltips : true
});