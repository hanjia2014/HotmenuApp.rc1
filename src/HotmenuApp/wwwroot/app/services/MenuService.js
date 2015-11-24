var HotmenuApp;
(function (HotmenuApp) {
    var Services;
    (function (Services) {
        var MenuService = (function () {
            function MenuService($http, $q, $location, appStorage) {
                var _this = this;
                this.$http = $http;
                this.$q = $q;
                this.$location = $location;
                this.appStorage = appStorage;
                this.createOrder = function () {
                    _this.currentOrder = new HotmenuApp.Models.Order();
                    _this.currentOrder.Id = Guid.generateNewId();
                    _this.currentOrder.Items = new Array();
                    _this.currentOrder.ClientNames = new Array();
                    _this.currentOrder.Note = '';
                    _this.currentOrder.Status = '';
                    _this.currentOrder.TableNo = null;
                    _this.currentOrder.Time = null;
                    _this.setCurrentOrder(_this.currentOrder);
                };
                this.deleteOrder = function () {
                    //localStorage.removeItem('current_order');
                    _this.appStorage.remove('current_order');
                };
                this.submitOrder = function (order) {
                    _this.$http.post('/api/order', order).success(function (result) {
                        return true;
                    })
                        .error(function (result) {
                        return false;
                    });
                    return false;
                };
                this.updateOrder = function (id, order) {
                    _this.$http.put('/api/order/' + id, order).success(function (result) {
                        return true;
                    })
                        .error(function (result) {
                        return false;
                    });
                    return false;
                };
                this.server = $location.host() + '/' + $location.port();
                //this.currentOrder = new HotmenuApp.Models.Order();
            }
            MenuService.prototype.getCategoryPromise = function () {
                var deferred = this.$q.defer();
                this.$http.get('/api/category').then(function (result) {
                    deferred.resolve(result);
                }, function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            };
            MenuService.prototype.getOrdersPromise = function () {
                var deferred = this.$q.defer();
                this.$http.get('/api/order').then(function (result) {
                    deferred.resolve(result);
                }, function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            };
            MenuService.prototype.getMenuItemPromise = function () {
                var deferred = this.$q.defer();
                this.$http.get('/api/menuitem').then(function (result) {
                    deferred.resolve(result);
                }, function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            };
            MenuService.prototype.getCurrentOrder = function () {
                this.currentOrder = this.appStorage.get('current_order');
                //this.currentOrder = angular.fromJson(localStorage.getItem('current_order'));
                return this.currentOrder;
            };
            MenuService.prototype.setCurrentOrder = function (currentOrder) {
                this.currentOrder = currentOrder;
                //localStorage.setItem('current_order', JSON.stringify(this.currentOrder));
                this.appStorage.set('current_order', this.currentOrder);
            };
            MenuService.$inject = ['$http', '$q', '$location', 'HotmenuApp.Services.StorageService'];
            return MenuService;
        })();
        Services.MenuService = MenuService;
        angular.module("hotmenuApp").service("HotmenuApp.Services.MenuService", MenuService);
    })(Services = HotmenuApp.Services || (HotmenuApp.Services = {}));
})(HotmenuApp || (HotmenuApp = {}));
