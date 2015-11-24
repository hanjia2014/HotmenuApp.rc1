var HotmenuApp;
(function (HotmenuApp) {
    var Controllers;
    (function (Controllers) {
        var BaseController = (function () {
            function BaseController() {
            }
            return BaseController;
        })();
        Controllers.BaseController = BaseController;
        angular.module("hotmenuApp").controller("HotmenuApp.Controllers.BaseController", BaseController);
    })(Controllers = HotmenuApp.Controllers || (HotmenuApp.Controllers = {}));
})(HotmenuApp || (HotmenuApp = {}));
