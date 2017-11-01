(function () {
    var app = angular.module('Patients', [])
        .controller("callPatients", function ($scope, $http, $log) {

            var successCallBack = function (response) {
                $scope.patients = response.data;
            };

            var errorCallBack = function (response) {
                $scope.error = reason.data;
            };
            $http({
                method: 'GET',
                url: 'http://localhost:52766/api/Patients'
            })
                .then(successCallBack, errorCallBack);

        });
  
})();