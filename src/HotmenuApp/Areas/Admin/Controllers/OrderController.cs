using System.Collections.Generic;
using System.Linq;
using HotmenuApp.Models;
using Microsoft.AspNet.Mvc;
using System;
using Microsoft.AspNet.SignalR.Infrastructure;
using Microsoft.AspNet.SignalR;
using HotmenuApp.Hub;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace HotmenuApp.Areas.Admin.Controllers
{
    [Route("api/[controller]")]
    public class OrderController : Controller
    {
        private HotmenuDbContext _db = new HotmenuDbContext();
        private IConnectionManager _connectionManager;
        private IHubContext _orderHub;
        [FromServices]
        public IConnectionManager ConnectionManager
        {
            get
            {
                return _connectionManager;
            }
            set
            {
                _connectionManager = value;
                _orderHub = _connectionManager.GetHubContext<OrderHub>();
            }
        }
        private Order GetOrderDetails(Order order)
        {
            if (order == null) throw new ArgumentNullException("order");
            var orderItems = _db.OrderItems.ToList();
            var selectedItems = orderItems.FindAll(p => p.OrderId == order.Id);
            order.Items = selectedItems;
            return order;
        }
        private List<Order> GetOrderDetails(IEnumerable<Order> orders)
        {
            return orders.Select(GetOrderDetails).ToList();
        }
        // GET: api/values
        [HttpGet]
        public List<Order> Get()
        {
            return GetOrderDetails(_db.Orders);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public Order Get(Guid id)
        {
            var order = _db.Orders.ToList().Find(p => p.Id == id);
            return order ?? GetOrderDetails(order);
        }

        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody]Order order)
        {
            if (!ModelState.IsValid)
            {
                return HttpBadRequest(ModelState);
            }

            _db.Orders.Add(order);
            _db.OrderItems.AddRange(order.Items);

            _db.SaveChanges();

            _orderHub.Clients.All.UpdateOrderProcessStatus(order);

            return RedirectToAction("Index", "Home");
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public IActionResult Put(Guid id, [FromBody]Order order)
        {
            var items = _db.OrderItems.ToList().FindAll(p => p.OrderId == id);
            if (items.Count > 0)
            {
                _db.OrderItems.RemoveRange(items);
                _db.SaveChanges();
            }

            _db.OrderItems.AddRange(order.Items);
            _db.SaveChanges();

            _db.Update(order);
            _db.SaveChanges();

            return RedirectToAction("Index", "Home");
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            var order = _db.Orders.ToList().Find(p => p.Id == id);
            if (order == null)
            {
                return HttpNotFound();
            }

            var items = _db.OrderItems.ToList().FindAll(p => p.OrderId == id);
            if (items.Count > 0)
            {
                _db.OrderItems.RemoveRange(items);
            }

            _db.Orders.Remove(order);
            _db.SaveChanges();

            return RedirectToAction("Index", "Home");
        }
    }
}
