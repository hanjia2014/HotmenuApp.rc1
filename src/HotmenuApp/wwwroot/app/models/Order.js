var HotmenuApp;
(function (HotmenuApp) {
    var Models;
    (function (Models) {
        var Order = (function () {
            function Order() {
                var _this = this;
                this.Total = function () {
                    var sum;
                    _this.Items.forEach(function (item, index) {
                        sum = sum + item.Price;
                    });
                    return sum;
                };
                this.Items = new Array();
                this.ClientNames = new Array();
            }
            return Order;
        })();
        Models.Order = Order;
        var OrderStatus = (function () {
            function OrderStatus() {
            }
            OrderStatus.Submitted = "Submitted";
            OrderStatus.InProgress = "InProgress";
            OrderStatus.Completed = "Completed";
            return OrderStatus;
        })();
        Models.OrderStatus = OrderStatus;
        var OrderStatusOption = (function () {
            function OrderStatusOption() {
            }
            return OrderStatusOption;
        })();
        Models.OrderStatusOption = OrderStatusOption;
    })(Models = HotmenuApp.Models || (HotmenuApp.Models = {}));
})(HotmenuApp || (HotmenuApp = {}));
