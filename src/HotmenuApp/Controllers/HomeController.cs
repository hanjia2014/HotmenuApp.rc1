using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using HotmenuApp.Models;
using HotmenuApp.Services;

namespace HotmenuApp.Controllers
{
    public class HomeController : Controller
    {
        private Repository<Category, int> categoryRepo = null;
        public HomeController()
        {
            categoryRepo = new Repository<Category, int>();
            categoryRepo.findElement += new FindElement<Category, int>(findCategory);
        }

        private bool findCategory(Category t, int id)
        {
            return t.Id == id;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public IActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public IActionResult Error()
        {
            return View("~/Views/Shared/Error.cshtml");
        }

        public IActionResult Menu(int? clientNameIndex, string clientName)
        {
            ViewBag.clientNameIndex = clientNameIndex;
            ViewBag.clientName = clientName;
            return View();
        }
        public IActionResult Order()
        {
            return View();
        }
    }
}
