var HotmenuApp;
(function (HotmenuApp) {
    var Models;
    (function (Models) {
        var OrderItem = (function () {
            function OrderItem(orderId) {
                this.OrderId = orderId;
            }
            return OrderItem;
        })();
        Models.OrderItem = OrderItem;
    })(Models = HotmenuApp.Models || (HotmenuApp.Models = {}));
})(HotmenuApp || (HotmenuApp = {}));
