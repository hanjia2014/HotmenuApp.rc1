module HotmenuApp.Models {
    export class OrderItem {
        public MenuItemId: number;
        public OrderId: string;
        public MenuItemName: string;
        public ClientName: string;
        public Price: number;

        constructor(orderId: string) {
            this.OrderId = orderId;
        }
    }
}