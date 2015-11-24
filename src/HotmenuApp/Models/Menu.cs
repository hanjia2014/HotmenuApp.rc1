using System.Collections.Generic;

namespace HotmenuApp.Models
{
    public class Menu
    {
        public List<Category> Categories { get; set; }
        public List<MenuItem> MenuItems { get; set; }
    }
}