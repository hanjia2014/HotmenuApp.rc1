using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using HotmenuApp.Models;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace HotmenuApp.Controllers
{
    [Route("api/[controller]")]
    public class MenuItemController : Controller
    {
        private Repository<MenuItem, int> _menuItemRepo = null;
        public MenuItemController()
        {
            _menuItemRepo = new Repository<MenuItem, int>();
            _menuItemRepo.findElement += new FindElement<MenuItem, int>(FindMenuItem);
        }

        private bool FindMenuItem(MenuItem t, int id)
        {
            return t.Id == id;
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<MenuItem> Get()
        {
            return _menuItemRepo.Get();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public MenuItem Get(int id)
        {
            return _menuItemRepo.GetByID(id);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]MenuItem value)
        {
            _menuItemRepo.Insert(value);
            _menuItemRepo.Save();
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]MenuItem value)
        {
            _menuItemRepo.Update(value);
            _menuItemRepo.Save();
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _menuItemRepo.Delete(_menuItemRepo.GetByID(id));
            _menuItemRepo.Save();
        }
    }
}
