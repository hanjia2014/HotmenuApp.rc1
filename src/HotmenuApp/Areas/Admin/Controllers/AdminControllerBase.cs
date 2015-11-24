using HotmenuApp.Models;
using Microsoft.AspNet.Authorization;
using Microsoft.AspNet.Mvc;
using System.Collections;
using System.Collections.Generic;

namespace HotmenuApp.Areas.Admin.Controllers
{
    public class AdminControllerBaseWithRepository<T, K> : AdminControllerBase where T : class
    {
        private IRepository<T, K> repository = null;

        public AdminControllerBaseWithRepository()
        {
            repository = new Repository<T, K>();
        }

        public IEnumerable<T> Get()
        {
            return repository.Get();
        }        

        public void Insert(T t)
        {
            repository.Insert(t);
        }

        public void Save()
        {
            repository.Save();
        }

        public void Delete(T t)
        {
            repository.Delete(t);
        }

        public void Update(T t)
        {
            repository.Update(t);
        }

        public T GetById(K id)
        {
            return repository.GetByID(id);
        }
    }

    [Area("Admin")]
    [Authorize]
    public class AdminControllerBase : Controller
    {
        private HotmenuDbContext db;
        public HotmenuDbContext DbContext
        {
            get
            {
                return db ?? new HotmenuDbContext();
            }
        }
    }
}
