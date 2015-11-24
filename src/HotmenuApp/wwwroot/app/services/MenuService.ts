module HotmenuApp.Services {
    import Models = HotmenuApp.Models;
    export class MenuService implements HotmenuApp.Interfaces.IMenuService {
        static $inject = ['$http', '$q', '$location', 'HotmenuApp.Services.StorageService'];
        private server: string;
        private clientName: string;
        private currentOrder: HotmenuApp.Models.Order;
        constructor(private $http: ng.IHttpService, private $q: ng.IQService, private $location: ng.ILocationService, private appStorage: HotmenuApp.Interfaces.IStorageService) {
            this.server = $location.host() + '/' + $location.port();
            //this.currentOrder = new HotmenuApp.Models.Order();
        }

        public getCategoryPromise() {
            var deferred = this.$q.defer();
            this.$http.get('/api/category').then(function (result) {
                deferred.resolve(result);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }

        public getOrdersPromise() {
            var deferred = this.$q.defer();
            this.$http.get('/api/order').then(function (result) {
                deferred.resolve(result);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }

        public getMenuItemPromise() {
            var deferred = this.$q.defer();
            this.$http.get('/api/menuitem').then(function (result) {
                deferred.resolve(result);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }

        public getCurrentOrder() {
            this.currentOrder = this.appStorage.get<HotmenuApp.Models.Order>('current_order');
            //this.currentOrder = angular.fromJson(localStorage.getItem('current_order'));
            return this.currentOrder;
        }
        public setCurrentOrder(currentOrder: HotmenuApp.Models.Order) {
            this.currentOrder = currentOrder;
            //localStorage.setItem('current_order', JSON.stringify(this.currentOrder));
            this.appStorage.set<HotmenuApp.Models.Order>('current_order', this.currentOrder);
        }

        createOrder = () => {
            this.currentOrder = new HotmenuApp.Models.Order();
            this.currentOrder.Id = Guid.generateNewId();
            this.currentOrder.Items = new Array<HotmenuApp.Models.OrderItem>();
            this.currentOrder.ClientNames = new Array<string>();
            this.currentOrder.Note = '';
            this.currentOrder.Status = '';
            this.currentOrder.TableNo = null;
            this.currentOrder.Time = null;

            this.setCurrentOrder(this.currentOrder);
        }

        deleteOrder = () => {
            //localStorage.removeItem('current_order');
            this.appStorage.remove('current_order');
        }

        submitOrder = (order: Models.Order) => {
            this.$http.post('/api/order', order).success(
                (result: any) => {
                    return true;
                })
                .error(
                (result: any) => {
                    return false;
                });

            return false;
        };

        updateOrder = (id: string, order: Models.Order) => {
            this.$http.put('/api/order/' + id, order).success(
                (result: any) => {
                    return true;
                })
                .error(
                (result: any) => {
                    return false;
                });

            return false;
        };
    }

    angular.module("hotmenuApp").service("HotmenuApp.Services.MenuService", MenuService);
}