angular.module('BitcoinPrice')
    .controller('BitcoinPrice.btcPriceController', ['$scope', '$http', 'platformWebApp.bladeNavigationService', 'platformWebApp.settings',
    function ($scope, $http, bladeNavigationService, settings) {
        var blade = $scope.blade;

        blade.refresh = function () {
            blade.isLoading = true;

            settings.getValues({ id: 'BitcoinPrice.General.ApiSource' }).$promise
                .then(function (values) { return values[0]; })
                .then($http.get)
                .then(function (response) {
                    var bpi = response.data.bpi;

                    var rates = _.chain(bpi).values().map(function (info) {
                        return { code: info.code, rate: info.rate_float, description: info.description };
                    }).value();
                    blade.rates = rates;
                })
                .catch(function (error) {
                    bladeNavigationService.setError('Unable to load exchange rates', blade);
                })
                .finally(function () {
                    blade.isLoading = false;
                });
        }

        blade.toolbarCommands = [{
            name: "platform.commands.refresh",
            icon: 'fa fa-refresh',
            executeMethod: blade.refresh,
            canExecuteMethod: function () {
                return true;
            }
        }];

        $scope.setGridOptions = function (gridOptions) {
            $scope.gridOptions = gridOptions;
        };

        blade.refresh();
    }]);