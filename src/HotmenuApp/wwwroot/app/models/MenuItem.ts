module HotmenuApp.Models {
    export class MenuItem {
        public Id: number;
        public Name: string;
        public Description: string;
        public Image: string;
        public CategoryId: number;
        public Selected: boolean;
        public Price: number;
    }
}