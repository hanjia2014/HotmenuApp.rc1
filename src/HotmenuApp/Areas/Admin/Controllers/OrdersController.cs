using System;
using System.Linq;
using Microsoft.AspNet.Mvc;
using HotmenuApp.Models;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace HotmenuApp.Areas.Admin.Controllers
{
    public class OrdersController : AdminControllerBase
    {
        private Repository<Order, Guid> _orderRepo;
        private Repository<OrderItem, int> _orderItemRepo;
        public OrdersController()
        {
            _orderRepo = new Repository<Order, Guid>();
            _orderRepo.findElement += new FindElement<Order, Guid>(FindOrder);
            _orderItemRepo = new Repository<OrderItem, int>();
        }

        private bool FindOrder(Order t, Guid id)
        {
            return t.Id.Equals(id);
        }

        // GET: /<controller>/
        public IActionResult Index()
        {
            return View(_orderRepo.Get().ToList());
        }

        public IActionResult OrderDetails(Guid id)
        {            
            ViewBag.SelectedOrder = GetOrder(id);
            return RedirectToAction("Index");
        }

        private Order GetOrder(Guid id)
        {
            var order = _orderRepo.GetByID(id);
            order.Items = _orderItemRepo.Get().ToList().FindAll(p => p.OrderId.Equals(id));
            return order;
        }
    }
}
