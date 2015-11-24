module HotmenuApp.Controllers {
    export class OrderController extends BaseController{
        public showOrderDiv: boolean;
        //public currentOrder: HotmenuApp.Models.Order;
        static $inject = ['$scope', '$location', 'HotmenuApp.Services.MenuService', '$q', '$window', 'orderHub'];
        constructor(private $scope: HotmenuApp.Scopes.IOrderScope, private $location: ng.ILocationService, private menuService: HotmenuApp.Interfaces.IMenuService, private $q: ng.IQService, private $window: ng.IWindowService, private orderHub) {
            super();
            this.$q.all([this.menuService.getCategoryPromise().then((result: any) => {
                this.$scope.Categories = result.data;
                this.$scope.Categories.push({ Id: 0, Name: "All" });
            }), this.menuService.getMenuItemPromise().then((result: any) => {
                    this.$scope.MenuItems = result.data;
                })
            ]);

            if (localStorage.getItem("showOrderDiv") != null)
                this.showOrderDiv = localStorage.getItem("showOrderDiv");

            this.$scope.CurrentOrder = this.menuService.getCurrentOrder();



            this.orderHub.client.updateOrderProcessStatus = (order: string) => {
                alert("The order has been submitted");
            };
        }

        createOrder = () => {
            this.menuService.createOrder();
            this.showOrderDiv = true;
            this.$scope.CurrentOrder = this.menuService.getCurrentOrder();
            localStorage.setItem("showOrderDiv", JSON.stringify(this.showOrderDiv));
        };

        deleteOrder = () => {
            this.showOrderDiv = false;
            localStorage.clear();
        };

        createClientName = (clientName: string) => {
            this.$scope.CurrentOrder.ClientNames.push(clientName);
            this.saveCurrentOrder();
        };

        removeClientName = (index: number, clientName: string, removeItems: boolean) => {

            for (var i = 0; i < this.$scope.CurrentOrder.Items.length; i++) {
                var item = this.$scope.CurrentOrder.Items[i];
                if (item.ClientName == clientName) {
                    this.$scope.CurrentOrder.Items.splice(i, 1);
                }
            }

            this.$scope.CurrentOrder.ClientNames.splice(index, 1);
            this.saveCurrentOrder();
        };

        AddOrderItem = (index: number, clientName: string) => {
            this.$window.location.href = '/home/menu' + '?clientNameIndex=' + index + '&clientName=' + clientName;
        };

        SelectCurrentClientName = (index: number, clientName: string) => {
            this.$scope.$broadcast('OnRefreshList', { client: clientName});
        };

        private saveCurrentOrder = () => {
            this.menuService.setCurrentOrder(this.$scope.CurrentOrder);
        };

        deleteMenuItem = (item: Models.OrderItem) => {
            this.$scope.CurrentOrder = this.menuService.getCurrentOrder();

            for (var i = 0; i < this.$scope.CurrentOrder.Items.length; i++) {
                var next = this.$scope.CurrentOrder.Items[i];
                if (next.MenuItemId == item.MenuItemId && next.MenuItemName == item.MenuItemName) {
                    this.$scope.CurrentOrder.Items.splice(i, 1);
                }
            }

            this.menuService.setCurrentOrder(this.$scope.CurrentOrder);
        };

        TotalByClientName = (clientName: string) => {
            var sum: number = 0;
            this.$scope.CurrentOrder.Items.forEach((item, index) => {
                if (item.ClientName == clientName)
                    sum = sum + item.Price;
            });
            return sum;
        };

        Submit = () => {
            this.$scope.CurrentOrder = this.menuService.getCurrentOrder();
            this.$scope.CurrentOrder.TableNo = this.$scope.TableNo;
            this.$scope.CurrentOrder.Status = Models.OrderStatus.Submitted;
            var datetime = new Date();
            var year = datetime.getFullYear();
            var month = datetime.getMonth() + 1;
            var date = datetime.getDate();
            var hour = datetime.getHours();
            var minutes = datetime.getMinutes();
            var seconds = datetime.getSeconds();

            this.$scope.CurrentOrder.Time = year + '-' + month + '-' + date + ' ' + hour + ':' + minutes + ':' + seconds;
            var result = this.menuService.submitOrder(this.$scope.CurrentOrder);

            //this.orderHub.server.submitOrder(this.currentOrder);
        };
    }
    angular.module("hotmenuApp").controller("HotmenuApp.Controllers.OrderController", OrderController);
}