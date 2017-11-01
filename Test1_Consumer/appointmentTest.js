(function () {
    var app = angular.module('AppointmentTest', [])
        .factory('dataFactory', ['$http', function ($http) {

            var urlBase = 'http://localhost:52766/api/Appointments';
            var dataFactory = {};

            dataFactory.getAppointments = function () {
                return $http.get(urlBase);
            };

            dataFactory.getAppointment = function (id) {
                return $http.get(urlBase + '/' + id);
            };

            dataFactory.insertAppointment = function (cust) {
                return $http.post(urlBase, cust);
            };

            dataFactory.updateAppointment = function (cust) {
                return $http.put(urlBase + '/' + cust.ID, cust)
            };

            dataFactory.deleteAppointment = function (id) {
                return $http.delete(urlBase + '/' + id);
            };

            dataFactory.getAppointments = function (id) {
                return $http.get(urlBase + '/' + id + '/orders');
            };

            return dataFactory;
        }])
        .service('dataService', ['$http', function ($http) {

            var urlBase = 'http://localhost:52766/api/Appointments';

            this.getAppointments = function () {
                return $http.get(urlBase);
            };

            this.getAppointment = function (id) {
                return $http.get(urlBase + '/' + id);
            };

            this.insertAppointment = function (cust) {
                return $http.post(urlBase, cust);
            };

            this.updateAppointment = function (cust) {
                return $http.put(urlBase + '/' + cust.ID, cust)
            };

            this.deleteAppointment = function (id) {
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

                $scope.getPatients = function () {
                    dataFactory.getAppointments()
                        .then(function (response) {
                            $scope.appointments = response.data;
                        }, function (error) {
                            $scope.status = 'Unable to load patient data: ' + error.message;
                        });
                }

                $scope.updateAppointment = function (id) {
                    var cust;
                    for (var i = 0; i < $scope.appointments.length; i++) {
                        var currCust = $scope.appointments[i];
                        if (currCust.ID == id) {
                            cust = currCust;
                            break;
                        }
                    }

                    dataFactory.updateAppointment(cust)
                        .then(function (response) {
                            $scope.status = 'Updated Patients! Refreshing customer list.';
                        }, function (error) {
                            $scope.status = 'Unable to update customer: ' + error.message;
                        });
                };

                $scope.insertAppointment = function () {

                    var cust = {
                        date: 2017/11/01,
                        startTime: 11,
                        endTime: 12,
                        patient:2
                    };
                    dataFactory.insertAppointment(cust)
                        .then(function (response) {
                            $scope.status = 'Inserted Appointment! Refreshing appointment list.';
                            $scope.appointments.push(cust);
                        }, function (error) {
                            $scope.status = 'Unable to insert appointment: ' + error.message;
                        });
                };

                $scope.deletePatient = function (id) {
                    dataFactory.deletePatient(id)
                        .then(function (response) {
                            $scope.status = 'Deleted Appointment! Refreshing appointment list.';
                            for (var i = 0; i < $scope.patients.length; i++) {
                                var cust = $scope.patients[i];
                                if (cust.ID === id) {
                                    $scope.patients.splice(i, 1);
                                    break;
                                }
                            }
                        }, function (error) {
                            $scope.status = 'Unable to delete appointment: ' + error.message;
                        });
                };

                $scope.getPatientAppointments = function (id) {
                    dataFactory.getAppointments(id)
                        .then(function (response) {
                            $scope.status = 'Retrieved Appointments!';
                            $scope.appointments = response.data;
                        }, function (error) {
                            $scope.status = 'Error retrieving appointments! ' + error.message;
                        });
                };

            }]);
})();