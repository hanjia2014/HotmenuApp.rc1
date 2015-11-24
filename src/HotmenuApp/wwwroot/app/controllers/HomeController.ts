module HotmenuApp.Controllers {
    export class HomeController extends BaseController {
        static $inject = ['$scope', '$location', 'HotmenuApp.Services.MenuService', '$q'];
        constructor(private $scope: HotmenuApp.Scopes.IHomeScope, private $location: ng.ILocationService, private menuService: HotmenuApp.Interfaces.IMenuService, private $q: ng.IQService) {
            super();
        }
    }

    angular.module("hotmenuApp").controller("HotmenuApp.Controllers.HomeController", HomeController);
}