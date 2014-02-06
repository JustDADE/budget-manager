budgetApp.controller('accountsListRender', function($scope, userData) {
    $scope.accountsList = userData.getUserData().success(function(data) {
        $scope.accountsList = data.accounts_list;
    });
});

budgetApp.controller('incomeRender', function($scope, userData) {
    $scope.incomeThisMonth = 0;
    $scope.incomeLastMonth = 0;

    $scope.incomeData = {
        labels : [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
        datasets : [
        {
            fillColor : 'rgba(238,241,244,.5)',
            strokeColor : '#c4cedb',
            pointColor : '#ffba61',
            pointStrokeColor : '#fff',
            data : [ 65, 59, 90, 81, 56, 55, 40]
        }]
    };

    $scope.incomeOptions = {
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
    };

    $scope.incomeList = userData.getUserData().success(function(data) {
        var incomeList = data.income_list;

        angular.forEach(incomeList, function(income, idx) {
            var todayMonth = new Date().getMonth()+1;
            var incomeMonth = income.date.split('-')[1];
            if (todayMonth < 10) { todayMonth = '0'+todayMonth; }
            if (todayMonth == incomeMonth) { $scope.incomeThisMonth = $scope.incomeThisMonth + income.amount; }
            if (todayMonth-1 == incomeMonth) { $scope.incomeLastMonth = $scope.incomeLastMonth + income.amount; }
        });
    });
});

budgetApp.controller('spendingRender', function($scope, userData) {
    $scope.spendingThisMonth = 0;
    $scope.spendingLastMonth = 0;

    $scope.spendingData = {
        labels : [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
        datasets : [
            {
                fillColor : 'rgba(238,241,244,.5)',
                strokeColor : '#c4cedb',
                pointColor : '#b34444',
                pointStrokeColor : '#fff',
                data : [ 65, 59, 90, 81, 56, 55, 40]
            }]
    };

    $scope.spendingOptions = {
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
    };

    $scope.spendingList = userData.getUserData().success(function(data) {
        var spendingList = data.spending_list;

        angular.forEach(spendingList, function(spending, idx) {
            var todayMonth = new Date().getMonth()+1;
            var incomeMonth = spending.date.split('-')[1];
            if (todayMonth < 10) { todayMonth = '0'+todayMonth; }
            if (todayMonth == incomeMonth) { $scope.spendingThisMonth = $scope.spendingThisMonth + spending.amount; }
            if (todayMonth-1 == incomeMonth) { $scope.spendingLastMonth = $scope.spendingLastMonth + spending.amount; }
        });
    });
});