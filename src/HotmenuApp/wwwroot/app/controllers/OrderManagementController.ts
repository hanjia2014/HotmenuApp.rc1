module HotmenuApp.Controllers {
    import Models = HotmenuApp.Models;
    export class OrderManagementController extends BaseController {
        static $inject = ['$scope', '$location', 'HotmenuApp.Services.MenuService', '$q', '$window', 'orderHub'];
        constructor(private $scope: HotmenuApp.Scopes.IOrderManagementScope, private $location: ng.ILocationService, private menuService: HotmenuApp.Interfaces.IMenuService, private $q: ng.IQService, private $window: ng.IWindowService, private orderHub) {
            super();
            this.$scope.DatepickerOptions = {
                autoclose: true,
                weekStart: 0
            };
            this.menuService.getOrdersPromise().then((result: any) => {
                this.$scope.Orders = result.data;
            });

            this.orderHub.client.updateOrderProcessStatus = (order: Models.Order) => {
                this.$scope.$apply(() => {
                    this.$scope.Orders.push(order);
                });
            };

            this.$scope.StatusOptions = [{ Text: "Submitted", Value: "Submitted", HasChanged: false }, { Text: "In Progress", Value: "InProgress", HasChanged: false }, { Text: "Completed", Value: "Completed", HasChanged: false }];
        }

        SetSelectedOrder = (id: string) => {
            for (var i = 0; i < this.$scope.Orders.length; i++) {
                var order = this.$scope.Orders[i];
                if (order.Id == id)
                    this.$scope.SelectedOrder = order;
            }
        };

        StatusChanged = (order: Models.Order) => {
            var isdirty = order.Status;
            this.menuService.updateOrder(order.Id, order);
        };

        ViewOrderList = () => {
            var startDate = this.$scope.OrderListViewStartDate;
            var endDate = this.$scope.OrderListViewEndDate;
        };
    }
    angular.module("hotmenuApp").controller("HotmenuApp.Controllers.OrderManagementController", OrderManagementController);
}