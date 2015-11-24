module HotmenuApp.Interfaces {
    export interface IMenuService {
        getCategoryPromise: () => ng.IPromise<any>;
        getMenuItemPromise: () => ng.IPromise<any>;
        getOrdersPromise: () => ng.IPromise<any>;
        getCurrentOrder: () => HotmenuApp.Models.Order;
        setCurrentOrder: (currentOrder: HotmenuApp.Models.Order) => void;
        createOrder: () => void;
        deleteOrder: () => void;
        submitOrder: (order: HotmenuApp.Models.Order) => boolean;
        updateOrder: (id: string, order: HotmenuApp.Models.Order) => boolean;
    }
}