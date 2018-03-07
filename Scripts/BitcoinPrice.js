//Call this to register our module to main application
var moduleName = "BitcoinPrice";

if (AppDependencies != undefined) {
    AppDependencies.push(moduleName);
}

angular.module(moduleName, [])
    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('workspace.BitcoinPrice', {
                    url: '/BitcoinPrice',
                    templateUrl: '$(Platform)/Scripts/common/templates/home.tpl.html',
                    controller: [
                        '$scope', 'platformWebApp.bladeNavigationService',
                        function ($scope, bladeNavigationService) {
                            var blade = {
                                id: 'btcPrice',
                                title: 'btc.blades.price.title',
                                headIcon: 'fa-btc',
                                subtitle: 'btc.blades.price.subtitle',
                                controller: 'BitcoinPrice.btcPriceController',
                                template: 'Modules/$(BitcoinPrice)/Scripts/blades/btcPrice.tpl.html',
                                isClosingDisabled: true
                            };
                            bladeNavigationService.showBlade(blade);
                        }
                    ]
                });
        }
    ])
    .run(['$rootScope', 'platformWebApp.mainMenuService', '$state',
        function ($rootScope, mainMenuService, $state) {
            //Register module in main menu
            var menuItem = {
                path: 'browse/BitcoinPrice',
                icon: 'fa fa-btc',
                title: 'btc.main-menu-title',
                priority: 100,
                action: function () {
                    $state.go('workspace.BitcoinPrice')
                },
                permission: 'BitcoinPricePermission'
            };
            mainMenuService.addMenuItem(menuItem);
        }
    ]);