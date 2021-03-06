budgetApp.controller('accountsListRender', ['$scope', 'userData', function($scope, userData) {
    /* Getting Accounts List */
    userData.getUserData(function(data) {
        $scope.accountsList = data.accounts_list;
    });
}]);

budgetApp.controller('incomeRender', ['$scope', 'userData', 'graphUsage', function($scope, userData, graphUsage) {
    $scope.incomeThisMonth = 0;
    $scope.incomeLastMonth = 0;

    /* Creating Income Graph */
    userData.getEachMonthIncome().then(function(data){
        var graphData = graphUsage.createGraph([ data['01'], data['02'], data['03'], data['03'], data['04'], data['05'], data['06'], data['07'], data['08'], data['09'], data['10'], data['11'], data['12']], '#ffba61');
        $scope.incomeData = graphData['data'];
        $scope.incomeOptions = graphData['options'];
    });

    /* Getting User Data */
    userData.getUserData(function(data) {
       var incomeList = data.income_list;
        angular.forEach(incomeList, function(income, idx) {
            var todayMonth = moment().month();
            var incomeMonth = moment(income['date'], 'YYYY-MM-DD').month();
            if (todayMonth == incomeMonth) { $scope.incomeThisMonth = $scope.incomeThisMonth + income.amount; }
            if (todayMonth-1 == incomeMonth) { $scope.incomeLastMonth = $scope.incomeLastMonth + income.amount; }
        });
    });

}]);

budgetApp.controller('spendingRender', ['$scope', 'userData', 'graphUsage', function($scope, userData, graphUsage) {
    $scope.spendingThisMonth = 0;
    $scope.spendingLastMonth = 0;

    /* Creating Income Graph */
    userData.getEachMonthSpending().then(function(data){
        var graphData = graphUsage.createGraph([ data['01'], data['02'], data['03'], data['03'], data['04'], data['05'], data['06'], data['07'], data['08'], data['09'], data['10'], data['11'], data['12']], '#b34444');
        $scope.spendingData = graphData['data'];
        $scope.spendingOptions = graphData['options'];
    });

    /* Getting User Data */
    userData.getUserData(function(data) {
        var spendingList = data.spending_list;
        angular.forEach(spendingList, function(spending, idx) {
            var todayMonth = moment().month();
            var incomeMonth = moment(spending['date'], 'YYYY-MM-DD').month();
            if (todayMonth == incomeMonth) { $scope.spendingThisMonth = $scope.spendingThisMonth + spending.amount; }
            if (todayMonth-1 == incomeMonth) { $scope.spendingLastMonth = $scope.spendingLastMonth + spending.amount; }
        });
    });

}]);

budgetApp.controller('goalsRender', ['$scope', 'userData', function($scope, userData) {
    userData.getUserGoals().then(function(data) {
        $scope.goalsList = data;
        $scope.goalsPriority = 'priority';
        angular.forEach($scope.goalsList, function(idx, e) {
            var goalETA = userData.getGoalETA(e).then(function(data) {
                var eta = data;
                userData.getCurrentMonthIncome().then(function(data) {
                    if (eta == 0) {
                        $scope.goalsList[e].percent = 100;
                        $scope.goalsList[e].time = 'Now';
                    } else if (eta == 1) {
                        var percent = data / ($scope.goalsList[e].amount / 100);
                        if (percent >= 100) { percent = 100; }
                        else { percent = Math.floor(percent); }
                        $scope.goalsList[e].percent = percent;
                        $scope.goalsList[e].time = 'Next month';
                    } else {
                        var percent = data / ($scope.goalsList[e].amount / 100);
                        if (percent >= 100) { percent = 100; }
                        else { percent = Math.floor(percent); }
                        $scope.goalsList[e].percent = percent;
                        $scope.goalsList[e].time = 'About '+eta+' months';
                    }
                });
            });
        });
    });

}]);

budgetApp.controller('budgetRender', ['$scope', 'userData', function($scope, userData) {
    $scope.spendingThisMonth = 0;

    /* Getting Total Budget */
    userData.getUserData(function(data) {
        var accountsList = data.accounts_list;
        var totalBudget = 0;
        angular.forEach(accountsList, function(idx) {
            totalBudget = totalBudget + idx['amount'];
        });
        $scope.totalBudget = totalBudget;

        // Can spend per day till end of the month
        var daysLeft = moment().daysInMonth() - moment().date();
        $scope.perDay = $scope.totalBudget / daysLeft;

        $scope.test = userData.getCurrentMonthIncome();
        // Current Month Spending
        userData.getCurrentMonthSpending().then(function(data) {
            $scope.spendingThisMonth = data;
            // Spending in %
            var thisMonthTotal = $scope.totalBudget + $scope.spendingThisMonth;
            var thisMonthSpendingInPercent = Math.round($scope.spendingThisMonth / (thisMonthTotal / 100));
            $scope.setBarPercent = { width: thisMonthSpendingInPercent+'%' };
        });
    });
}]);

budgetApp.controller('savingsRender', ['$scope', 'userData', 'modalBox', function($scope, userData, modalBox) {
    $scope.savingsRate = 0;
    userData.getCurrentSavingsRate().then(function(data) {
       $scope.savingsRate = data;
    });

    $scope.modalBox = function (id) {
        $('#modalBox').show();
        $('.modalBox .section_title').html(title);
        $('.modalBox .section_content').html('Love me tomorrow');
    }
}]);