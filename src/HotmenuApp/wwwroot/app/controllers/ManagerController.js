var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HotmenuApp;
(function (HotmenuApp) {
    var Controllers;
    (function (Controllers) {
        var Models = HotmenuApp.Models;
        var ManagerController = (function (_super) {
            __extends(ManagerController, _super);
            function ManagerController($scope, $location, menuService, $q, $window, orderHub) {
                var _this = this;
                _super.call(this);
                this.$scope = $scope;
                this.$location = $location;
                this.menuService = menuService;
                this.$q = $q;
                this.$window = $window;
                this.orderHub = orderHub;
                this.OrderStatusMatch = function (status) {
                    var count = 0;
                    if (_this.$scope.Orders != null) {
                        for (var i = 0; i < _this.$scope.Orders.length; i++) {
                            if (_this.$scope.Orders[i].Status == status)
                                count++;
                        }
                    }
                    return count;
                };
                this.GetStatusCount = function () {
                    _this.$scope.SubmittedCount = _this.OrderStatusMatch("Submitted");
                };
                this.orderHub.client.updateOrderProcessStatus = function (order) {
                    _this.$scope.$apply(function () {
                        _this.$scope.Orders.push(order);
                        _this.GetStatusCount();
                    });
                };
                this.$q.all([this.menuService.getOrdersPromise().then(function (result) {
                        _this.$scope.Orders = result.data;
                        _this.GetStatusCount();
                    })]);
                this.$scope.$watch(function () { return _this.$scope.Orders; }, function (newValue, oldValue) {
                    _this.OrderStatusMatch(Models.OrderStatus.Submitted);
                });
            }
            ManagerController.$inject = ['$scope', '$location', 'HotmenuApp.Services.MenuService', '$q', '$window', 'orderHub'];
            return ManagerController;
        })(Controllers.BaseController);
        Controllers.ManagerController = ManagerController;
        angular.module("hotmenuApp").controller("HotmenuApp.Controllers.ManagerController", ManagerController);
    })(Controllers = HotmenuApp.Controllers || (HotmenuApp.Controllers = {}));
})(HotmenuApp || (HotmenuApp = {}));
