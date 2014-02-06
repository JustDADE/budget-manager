budgetApp.controller('accountsListRender', ['$scope', 'userData', function($scope, userData) {
    $scope.accountsList = userData.getUserData().success(function(data) {
        $scope.accountsList = data.accounts_list;
    });
}]);

budgetApp.controller('incomeRender', ['$scope', 'userData', 'graphUsage', function($scope, userData, graphUsage) {
    $scope.incomeThisMonth = 0;
    $scope.incomeLastMonth = 0;

    var graphData = graphUsage.createGraph([ 65, 59, 90, 81, 56, 55, 40], '#ffba61');
    $scope.incomeData = graphData['data'];
    $scope.incomeOptions = graphData['options'];


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
}]);

budgetApp.controller('spendingRender', ['$scope', 'userData', 'graphUsage', function($scope, userData, graphUsage) {
    $scope.spendingThisMonth = 0;
    $scope.spendingLastMonth = 0;

    var graphData = graphUsage.createGraph([ 65, 59, 90, 81, 56, 55, 40], '#b34444');
    $scope.spendingData = graphData['data'];
    $scope.spendingOptions = graphData['options'];

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
}]);