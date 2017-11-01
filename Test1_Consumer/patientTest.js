(function () {
    var app = angular.module('PatientsTest', [])
        .factory('dataFactory', ['$http', function ($http) {

            var urlBase = 'http://localhost:52766/api/Patients';
            var dataFactory = {};

            dataFactory.getPatients = function () {
                return $http.get(urlBase);
            };

            dataFactory.getPatient = function (id) {
                return $http.get(urlBase + '/' + id);
            };

            dataFactory.insertPatient = function (cust) {
                return $http.post(urlBase, cust);
            };

            dataFactory.updatePatient = function (cust) {
                return $http.put(urlBase + '/' + cust.ID, cust)
            };

            dataFactory.deletePatient = function (id) {
                return $http.delete(urlBase + '/' + id);
            };

            dataFactory.getAppointments = function (id) {
                return $http.get(urlBase + '/' + id + '/orders');
            };

            return dataFactory;
        }])
        .service('dataService', ['$http', function ($http) {

            var urlBase = 'http://localhost:52766/api/Patients';

            this.getPatients = function () {
                return $http.get(urlBase);
            };

            this.getPatient = function (id) {
                return $http.get(urlBase + '/' + id);
            };

            this.insertPatient = function (cust) {
                return $http.post(urlBase, cust);
            };

            this.updatePatient = function (cust) {
                return $http.put(urlBase + '/' + cust.ID, cust)
            };

            this.deletePatient = function (id) {
                return $http.delete(urlBase + '/' + id);
            };

            this.getAppointments = function (id) {
                return $http.get(urlBase + '/' + id + '/appointments');
            };
        }])
        .controller("callPatients", ['$scope', 'dataFactory',
            function ($scope, dataFactory) {
                $scope.status;
                $scope.patients;
                $scope.appointments;
                
              //  getPatients();

               $scope.getPatients = function() {
                    dataFactory.getPatients()
                        .then(function (response) {
                            $scope.patients = response.data;
                        }, function (error) {
                            $scope.status = 'Unable to load patient data: ' + error.message;
                        });
                }

                $scope.updatePatient = function (id) {
                    var cust;
                    for (var i = 0; i < $scope.patients.length; i++) {
                        var currCust = $scope.patients[i];
                        if (currCust.ID == id) {
                            cust = currCust;
                            break;
                        }
                    }

                    dataFactory.updatePatient(cust)
                        .then(function (response) {
                            $scope.status = 'Updated Patients! Refreshing customer list.';
                        }, function (error) {
                            $scope.status = 'Unable to update customer: ' + error.message;
                        });
                };

                $scope.insertPatient = function () {

                    var cust = {
                        patientEmail: 'nelson@gmail.com',
                        patientPhone: '7871321123',
                        lastName: 'Miranda', 
                        firstName: 'Nelson'
                    };
                    dataFactory.insertPatient(cust)
                        .then(function (response) {
                            $scope.status = 'Inserted Patient! Refreshing patient list.';
                            $scope.patients.push(cust);
                        }, function (error) {
                            $scope.status = 'Unable to insert patient: ' + error.message;
                        });
                };

                $scope.deletePatient = function (id) {
                    dataFactory.deletePatient(id)
                        .then(function (response) {
                            $scope.status = 'Deleted Patient! Refreshing customer list.';
                            for (var i = 0; i < $scope.patients.length; i++) {
                                var cust = $scope.patients[i];
                                if (cust.ID === id) {
                                    $scope.patients.splice(i, 1);
                                    break;
                                }
                            }
                        }, function (error) {
                            $scope.status = 'Unable to delete customer: ' + error.message;
                        });
                };

                $scope.getPatientAppointments = function (id) {
                    dataFactory.getAppointments(id)
                        .then(function (response) {
                            $scope.status = 'Retrieved Appointments!';
                            $scope.appointments = response.data;
                        }, function (error) {
                            $scope.status = 'Error retrieving patients! ' + error.message;
                        });
                };

            }]);
})();