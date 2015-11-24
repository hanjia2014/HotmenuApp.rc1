module HotmenuApp.Controllers {
    import Models = HotmenuApp.Models;
    export class ManagerController extends BaseController {
        public showOrderDiv: boolean;
        public currentOrder: HotmenuApp.Models.Order;
        public submittedCount: number;
        public processedCount: number;
        public completedCount: number;

        static $inject = ['$scope', '$location', 'HotmenuApp.Services.MenuService', '$q', '$window', 'orderHub'];
        constructor(private $scope: HotmenuApp.Scopes.IOrderScope, private $location: ng.ILocationService, private menuService: HotmenuApp.Interfaces.IMenuService, private $q: ng.IQService, private $window: ng.IWindowService, private orderHub) {
            super();
            this.orderHub.client.updateOrderProcessStatus = (order: Models.Order) => {
                this.$scope.$apply(() => {
                    this.$scope.Orders.push(order);
                    this.GetStatusCount();
                });
            };

            this.$q.all([this.menuService.getOrdersPromise().then((result: any) => {
                this.$scope.Orders = result.data;
                this.GetStatusCount();
            })]);

            this.$scope.$watch(() => this.$scope.Orders, (newValue: Array<Models.Order>, oldValue: Array<Models.Order>) => {
                this.OrderStatusMatch(Models.OrderStatus.Submitted);
            });
        }

        private OrderStatusMatch = (status: string) => {
            var count = 0;
            if (this.$scope.Orders != null) {
                for (var i = 0; i < this.$scope.Orders.length; i++) {
                    if (this.$scope.Orders[i].Status == status)
                        count++;
                }
            }
            return count;
        }

        GetStatusCount = () => {
            this.$scope.SubmittedCount = this.OrderStatusMatch("Submitted");
        }
    }
    angular.module("hotmenuApp").controller("HotmenuApp.Controllers.ManagerController", ManagerController);
}