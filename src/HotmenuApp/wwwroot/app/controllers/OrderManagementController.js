var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HotmenuApp;
(function (HotmenuApp) {
    var Controllers;
    (function (Controllers) {
        var OrderManagementController = (function (_super) {
            __extends(OrderManagementController, _super);
            function OrderManagementController($scope, $location, menuService, $q, $window, orderHub) {
                var _this = this;
                _super.call(this);
                this.$scope = $scope;
                this.$location = $location;
                this.menuService = menuService;
                this.$q = $q;
                this.$window = $window;
                this.orderHub = orderHub;
                this.SetSelectedOrder = function (id) {
                    for (var i = 0; i < _this.$scope.Orders.length; i++) {
                        var order = _this.$scope.Orders[i];
                        if (order.Id == id)
                            _this.$scope.SelectedOrder = order;
                    }
                };
                this.StatusChanged = function (order) {
                    var isdirty = order.Status;
                    _this.menuService.updateOrder(order.Id, order);
                };
                this.ViewOrderList = function () {
                    var startDate = _this.$scope.OrderListViewStartDate;
                    var endDate = _this.$scope.OrderListViewEndDate;
                };
                this.$scope.DatepickerOptions = {
                    autoclose: true,
                    weekStart: 0
                };
                this.menuService.getOrdersPromise().then(function (result) {
                    _this.$scope.Orders = result.data;
                });
                this.orderHub.client.updateOrderProcessStatus = function (order) {
                    _this.$scope.$apply(function () {
                        _this.$scope.Orders.push(order);
                    });
                };
                this.$scope.StatusOptions = [{ Text: "Submitted", Value: "Submitted", HasChanged: false }, { Text: "In Progress", Value: "InProgress", HasChanged: false }, { Text: "Completed", Value: "Completed", HasChanged: false }];
            }
            OrderManagementController.$inject = ['$scope', '$location', 'HotmenuApp.Services.MenuService', '$q', '$window', 'orderHub'];
            return OrderManagementController;
        })(Controllers.BaseController);
        Controllers.OrderManagementController = OrderManagementController;
        angular.module("hotmenuApp").controller("HotmenuApp.Controllers.OrderManagementController", OrderManagementController);
    })(Controllers = HotmenuApp.Controllers || (HotmenuApp.Controllers = {}));
})(HotmenuApp || (HotmenuApp = {}));
