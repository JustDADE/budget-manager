budgetApp.factory('userData', function($http) {
    var factory = {};
    factory.getUserData = function() {
        return $http.get('/budgetajs/app/dummydata.json');
    }
    return factory;
});