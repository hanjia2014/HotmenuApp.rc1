var HotmenuApp;
(function (HotmenuApp) {
    var Services;
    (function (Services) {
        var UtilityService = (function () {
            function UtilityService() {
                this.GetParameterByName = function (name) {
                    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(location.search);
                    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
                };
            }
            return UtilityService;
        })();
        Services.UtilityService = UtilityService;
        angular.module("hotmenuApp").service("HotmenuApp.Services.UtilityService", UtilityService);
    })(Services = HotmenuApp.Services || (HotmenuApp.Services = {}));
})(HotmenuApp || (HotmenuApp = {}));
