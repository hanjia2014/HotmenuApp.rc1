using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using HotmenuApp.Models;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace HotmenuApp.Controllers
{
    //http://localhost:54359/api/category
    [Route("api/[controller]")]
    public class CategoryController : Controller
    {
        private Repository<Category, int> _categoryRepo = null;
        public CategoryController()
        {
            _categoryRepo = new Repository<Category, int>();
            _categoryRepo.findElement += new FindElement<Category, int>(FindCategory);
        }

        private bool FindCategory(Category t, int id)
        {
            return t.Id == id;
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<Category> Get()
        {
            return _categoryRepo.Get();
        }

        // GET api/values/5, http://localhost:54359/api/category/1
        [HttpGet("{id}")]
        public Category Get(int id)
        {
            return _categoryRepo.GetByID(id);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]Category value)
        {
            _categoryRepo.Insert(value);
            _categoryRepo.Save();
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]Category value)
        {
            _categoryRepo.Update(value);
            _categoryRepo.Save();
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _categoryRepo.Delete(_categoryRepo.GetByID(id));
            _categoryRepo.Save();
        }
    }
}
