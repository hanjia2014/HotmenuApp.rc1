var HotmenuApp;
(function (HotmenuApp) {
    var Routes = (function () {
        function Routes() {
        }
        Routes.configureRoutes = function ($routeProvider) {
            $routeProvider.when("/", {
                controller: "HotmenuApp.Controllers.HomeController",
                templateUrl: "home/index",
                controllerAs: "home"
            })
                .otherwise({
                redirectTo: "/"
            });
        };
        Routes.$inject = ["$routeProvider"];
        return Routes;
    })();
    HotmenuApp.Routes = Routes;
})(HotmenuApp || (HotmenuApp = {}));
