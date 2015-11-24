module HotmenuApp.Models {
    export class Order {
        public Id: string;
        public Time: string;
        public Items: Array<OrderItem>;
        public ClientNames: Array<string>;
        public Status: string;
        public Note: string;
        public TableNo: number;
        constructor() {
            this.Items = new Array<OrderItem>();
            this.ClientNames = new Array<string>();
        }
        public Total = () => {
            var sum: number;
            this.Items.forEach((item, index) => {
                sum = sum + item.Price;
            });
            return sum;
        };
    }

    export class OrderStatus {
        public static Submitted: string = "Submitted";
        public static InProgress: string = "InProgress";
        public static Completed: string = "Completed";
    }

    export class OrderStatusOption {
        public Text: string;
        public Value: string;
        public HasChanged: boolean;
    }
}