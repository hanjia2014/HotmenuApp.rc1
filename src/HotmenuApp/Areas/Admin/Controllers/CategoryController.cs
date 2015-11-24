using System.Linq;
using Microsoft.AspNet.Mvc;
using HotmenuApp.Models;
using Microsoft.AspNet.Authorization;
using System;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace HotmenuApp.Areas.Admin.Controllers
{
    public class CategoryController : AdminControllerBaseWithRepository<Category, int>
    {
        // GET: /<controller>/
        public IActionResult Index()
        {
            return View();
        }

        public ActionResult Edit(int id)
        {
            var category = DbContext.Categories.First(p => p.Id == id);
            if (category == null)
            {
                return HttpNotFound();
            }
            return View(category);
        }

        public ActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Create(Category category)
        {
            try
            {
                //using(var db = new HotmenuDbContext())
                //{
                //    db.Categories.Add(category);
                //    db.SaveChanges();
                //}
                Insert(category);
                Save();
                return RedirectToAction("Index", "Manager");
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
