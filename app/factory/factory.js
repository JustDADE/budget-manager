budgetApp.factory('userData', ['$http', '$q', function($http, $q) {
    return {
        getUserData : function(callback) {
            $http.get('/budgetajs/app/dummydata.json').success(callback);
        },
        getEachMonthIncome : function() {
            var amount = $q.defer();
            this.getUserData(function(data) {
                var incomeList = data.income_list;
                var monthlyIncome = { '01' : 0, '02' : 0, '03' : 0, '04' : 0, '05' : 0, '06' : 0, '07' : 0, '08' : 0, '09' : 0, '10' : 0, '11' : 0, '12' : 0 }
                angular.forEach(incomeList, function(income, idx) {
                    var month = income.date.split('-')[1];
                    monthlyIncome[month] = monthlyIncome[month] + income.amount;
                });
                amount.resolve(monthlyIncome);
            });
            return amount.promise;
        },
        getEachMonthSpending : function() {
            var amount = $q.defer();
            this.getUserData(function(data) {
                var spendingList = data.spending_list;
                var monthlySpending = { '01' : 0, '02' : 0, '03' : 0, '04' : 0, '05' : 0, '06' : 0, '07' : 0, '08' : 0, '09' : 0, '10' : 0, '11' : 0, '12' : 0 }
                angular.forEach(spendingList, function(spending, idx) {
                    var month = spending.date.split('-')[1];
                    monthlySpending[month] = monthlySpending[month] + spending.amount;
                });
                amount.resolve(monthlySpending);
            });
            return amount.promise;
        },
        getCurrentMonthIncome: function() {
            var amount = $q.defer();
            this.getUserData(function(data) {
                var incomeList = data.income_list;
                var incomeThisMonth = 0;
                angular.forEach(incomeList, function(idx) {
                    var currentMonth = moment().month();
                    var incomeMonth = moment(idx['date'], 'YYYY-MM-DD').month();

                    if (currentMonth == incomeMonth) {
                        incomeThisMonth = incomeThisMonth + idx['amount'];
                    }
                });
                amount.resolve(incomeThisMonth);
            });
            return amount.promise;
        },
        getCurrentMonthSpending: function() {
            var amount = $q.defer();
            this.getUserData(function(data) {
                var spendingList = data.spending_list;
                var spendingThisMonth = 0;
                angular.forEach(spendingList, function(idx) {
                    var currentMonth = moment().month();
                    var spendingMonth = moment(idx['date'], 'YYYY-MM-DD').month();

                    if (currentMonth == spendingMonth) {
                        spendingThisMonth = spendingThisMonth + idx['amount'];
                    }
                });
                amount.resolve(spendingThisMonth);
            });
            return amount.promise;
        }
    };
}]);

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