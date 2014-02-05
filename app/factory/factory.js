budgetApp.factory('userData', function($http) {
    var factory = {};
    factory.getAccountsList = function() {
        return $http.get('/budgetajs/app/dummydata.json');
    },
    factory.getSomething = function() {
        return 1234;
    }

    return factory;

});