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
            var todayMonth = new Date().getMonth()+1;
            var incomeMonth = income.date.split('-')[1];
            if (todayMonth < 10) { todayMonth = '0'+todayMonth; }
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
            var todayMonth = new Date().getMonth()+1;
            var incomeMonth = spending.date.split('-')[1];
            if (todayMonth < 10) { todayMonth = '0'+todayMonth; }
            if (todayMonth == incomeMonth) { $scope.spendingThisMonth = $scope.spendingThisMonth + spending.amount; }
            if (todayMonth-1 == incomeMonth) { $scope.spendingLastMonth = $scope.spendingLastMonth + spending.amount; }
        });
    });
    
}]);