module HotmenuApp.Controllers {
    import Interfaces = HotmenuApp.Interfaces;
    import Models = HotmenuApp.Models;
    import Scopes = HotmenuApp.Scopes;

    export class MenuOperateController extends BaseController {
        public categories: Array<Models.Category>;
        public selectedClientName: string;
        public currentOrder: Models.Order;
        public newClientNameFlag: boolean;
        static $inject = ['$scope', '$location', 'HotmenuApp.Services.MenuService', '$q', 'HotmenuApp.Services.UtilityService'];
        constructor(private $scope: Scopes.IMenuScope, private $location: ng.ILocationService, private menuService: Interfaces.IMenuService, private $q: ng.IQService, private utilityService: Interfaces.IUtilityService) {
            super();
            this.$q.all([this.menuService.getCategoryPromise().then((result: any) => {
                this.$scope.Categories = result.data;
                this.$scope.Categories.push({ Id: 0, Name: "All" });
            }), this.menuService.getMenuItemPromise().then((result: any) => {
                this.$scope.MenuItems = result.data;
                })
            ]).then(() => {
                if (this.menuService.getCurrentOrder() != null) {
                    this.currentOrder = this.menuService.getCurrentOrder();
                }
            });

            this.$scope.SetClientNameFlag = (flag: boolean) => {
                this.$scope.AddNewClientName = flag;
            };

            this.$scope.$on('OnRefreshList', (event, obj) => {
                this.selectedClientName = obj.client;
                this.currentOrder = this.menuService.getCurrentOrder();
                if (this.currentOrder.Items != null && this.selectedClientName != '') {
                    for (var i = 0; i < this.$scope.MenuItems.length; i++) {
                        var item = this.$scope.MenuItems[i];
                        item.Selected = false;
                    }
                    for (var index = 0; index < this.currentOrder.Items.length; index++) {
                        var currentOrderMenuItem = this.currentOrder.Items[index];
                        if (currentOrderMenuItem.ClientName == this.selectedClientName) {
                            for (var i = 0; i < this.$scope.MenuItems.length; i++) {
                                var item = this.$scope.MenuItems[i];
                                item.Selected = (item.Selected == null || item.Selected == false) ? item.Id == currentOrderMenuItem.MenuItemId : true;
                            }
                        }
                    }
                }
            });
        };

        hasCurrentOrder = () => {
            if (this.menuService.getCurrentOrder())
                return true;
            return false;
        };

        addToOrder = () => {
            if (this.selectedClientName != '') {
                for (var index = this.currentOrder.Items.length - 1; index >= 0; index--) {
                    var currentOrderMenuItem = this.currentOrder.Items[index];
                    if (currentOrderMenuItem.ClientName == this.selectedClientName) {
                        this.currentOrder.Items.splice(index, 1);
                    }
                }
            }

            this.$scope.MenuItems.forEach((item, index) => {
                if (item.Selected) {
                    if (this.currentOrder == null)
                        this.currentOrder = new Models.Order();
                    this.currentOrder.Items.push({ ClientName: this.selectedClientName, MenuItemId: item.Id, MenuItemName: item.Name, Price: item.Price, OrderId: this.menuService.getCurrentOrder().Id });
                }
            });
            this.menuService.setCurrentOrder(this.currentOrder);

            var orderScope = <HotmenuApp.Scopes.IOrderScope>this.$scope.$parent;
            orderScope.CurrentOrder = this.currentOrder;
        };

        addToOrderWithClientName = (newClientName: string) => {
            if (this.newClientNameFlag) {
                this.currentOrder.ClientNames.push(newClientName);
            }
            this.selectedClientName = newClientName;
            this.addToOrder();
        };

        SelectedClientName = (clientName: string) => {
            this.$scope.NewClientName = clientName;
            this.selectedClientName = clientName;
            this.newClientNameFlag = false;
        };
    }
    angular.module("hotmenuApp").controller("HotmenuApp.Controllers.MenuOperateController", MenuOperateController);
}