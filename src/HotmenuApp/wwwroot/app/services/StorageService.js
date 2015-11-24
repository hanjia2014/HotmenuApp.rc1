var HotmenuApp;
(function (HotmenuApp) {
    var Services;
    (function (Services) {
        var StorageService = (function () {
            function StorageService() {
                this.remove = function (key) {
                    localStorage.removeItem(key);
                };
            }
            StorageService.prototype.get = function (key) {
                return JSON.parse(localStorage.getItem(key) || '""');
            };
            StorageService.prototype.set = function (key, value) {
                localStorage.setItem(key, JSON.stringify(value));
            };
            return StorageService;
        })();
        Services.StorageService = StorageService;
        angular.module("hotmenuApp").service("HotmenuApp.Services.StorageService", StorageService);
    })(Services = HotmenuApp.Services || (HotmenuApp.Services = {}));
})(HotmenuApp || (HotmenuApp = {}));
