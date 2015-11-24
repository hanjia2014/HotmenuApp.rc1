module HotmenuApp {
    export class Routes {
        static $inject = ["$routeProvider"];
        static configureRoutes($routeProvider: ng.route.IRouteProvider) {
            $routeProvider.when("/",
                {
                    controller: "HotmenuApp.Controllers.HomeController",
                    templateUrl: "home/index",
                    controllerAs: "home"
                })
                .otherwise({
                redirectTo: "/"
            });
        }
    }
}