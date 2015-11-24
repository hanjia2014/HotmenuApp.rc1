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
        var MenuOperateController = (function (_super) {
            __extends(MenuOperateController, _super);
            function MenuOperateController($scope, $location, menuService, $q, utilityService) {
                var _this = this;
                _super.call(this);
                this.$scope = $scope;
                this.$location = $location;
                this.menuService = menuService;
                this.$q = $q;
                this.utilityService = utilityService;
                this.hasCurrentOrder = function () {
                    if (_this.menuService.getCurrentOrder())
                        return true;
                    return false;
                };
                this.addToOrder = function () {
                    if (_this.selectedClientName != '') {
                        for (var index = _this.currentOrder.Items.length - 1; index >= 0; index--) {
                            var currentOrderMenuItem = _this.currentOrder.Items[index];
                            if (currentOrderMenuItem.ClientName == _this.selectedClientName) {
                                _this.currentOrder.Items.splice(index, 1);
                            }
                        }
                    }
                    _this.$scope.MenuItems.forEach(function (item, index) {
                        if (item.Selected) {
                            if (_this.currentOrder == null)
                                _this.currentOrder = new Models.Order();
                            _this.currentOrder.Items.push({ ClientName: _this.selectedClientName, MenuItemId: item.Id, MenuItemName: item.Name, Price: item.Price, OrderId: _this.menuService.getCurrentOrder().Id });
                        }
                    });
                    _this.menuService.setCurrentOrder(_this.currentOrder);
                    var orderScope = _this.$scope.$parent;
                    orderScope.CurrentOrder = _this.currentOrder;
                };
                this.addToOrderWithClientName = function (newClientName) {
                    if (_this.newClientNameFlag) {
                        _this.currentOrder.ClientNames.push(newClientName);
                    }
                    _this.selectedClientName = newClientName;
                    _this.addToOrder();
                };
                this.SelectedClientName = function (clientName) {
                    _this.$scope.NewClientName = clientName;
                    _this.selectedClientName = clientName;
                    _this.newClientNameFlag = false;
                };
                this.$q.all([this.menuService.getCategoryPromise().then(function (result) {
                        _this.$scope.Categories = result.data;
                        _this.$scope.Categories.push({ Id: 0, Name: "All" });
                    }), this.menuService.getMenuItemPromise().then(function (result) {
                        _this.$scope.MenuItems = result.data;
                    })
                ]).then(function () {
                    if (_this.menuService.getCurrentOrder() != null) {
                        _this.currentOrder = _this.menuService.getCurrentOrder();
                    }
                });
                this.$scope.SetClientNameFlag = function (flag) {
                    _this.$scope.AddNewClientName = flag;
                };
                this.$scope.$on('OnRefreshList', function (event, obj) {
                    _this.selectedClientName = obj.client;
                    _this.currentOrder = _this.menuService.getCurrentOrder();
                    if (_this.currentOrder.Items != null && _this.selectedClientName != '') {
                        for (var i = 0; i < _this.$scope.MenuItems.length; i++) {
                            var item = _this.$scope.MenuItems[i];
                            item.Selected = false;
                        }
                        for (var index = 0; index < _this.currentOrder.Items.length; index++) {
                            var currentOrderMenuItem = _this.currentOrder.Items[index];
                            if (currentOrderMenuItem.ClientName == _this.selectedClientName) {
                                for (var i = 0; i < _this.$scope.MenuItems.length; i++) {
                                    var item = _this.$scope.MenuItems[i];
                                    item.Selected = (item.Selected == null || item.Selected == false) ? item.Id == currentOrderMenuItem.MenuItemId : true;
                                }
                            }
                        }
                    }
                });
            }
            ;
            MenuOperateController.$inject = ['$scope', '$location', 'HotmenuApp.Services.MenuService', '$q', 'HotmenuApp.Services.UtilityService'];
            return MenuOperateController;
        })(Controllers.BaseController);
        Controllers.MenuOperateController = MenuOperateController;
        angular.module("hotmenuApp").controller("HotmenuApp.Controllers.MenuOperateController", MenuOperateController);
    })(Controllers = HotmenuApp.Controllers || (HotmenuApp.Controllers = {}));
})(HotmenuApp || (HotmenuApp = {}));
