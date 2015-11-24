using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using HotmenuApp.Models;
using Microsoft.AspNet.Mvc.Rendering;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace HotmenuApp.Areas.Admin.Controllers
{
    public class MenuItemController : AdminControllerBaseWithRepository<MenuItem, int>
    {
        // GET: /<controller>/
        public IActionResult Index()
        {
            return View();
        }

        public ActionResult Edit(int id)
        {
            var item = DbContext.MenuItems.First(p => p.Id == id);
            if (item == null)
            {
                return HttpNotFound();
            }

            var categories = new List<SelectListItem>();
            DbContext.Categories.ToList().ForEach(p => categories.Add(new SelectListItem { Text = p.Name, Value = p.Id.ToString(), Selected = p.Id == item.CategoryId }));

            ViewBag.Categories = categories;

            return View(item);
        }
    }
}
