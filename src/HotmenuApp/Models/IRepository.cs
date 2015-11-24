using System.Collections.Generic;
using System.Linq;
using Microsoft.Data.Entity;

namespace HotmenuApp.Models
{
    public delegate bool FindElement<T, K>(T t, K id);
    public interface IRepository<T, K>
    {
        IEnumerable<T> Get();
        T GetByID(K id);
        void Insert(T item);
        void Delete(T item);
        void Update(T item);
        void Save();
    }

    public class Repository<T, K> : IRepository<T, K> where T : class
    {
        public FindElement<T, K> findElement = null;
        private HotmenuDbContext db = null;
        private DbSet<T> table = null;
        public Repository()
        {
            db = new HotmenuDbContext();
            table = db.Set<T>();

        }

        public IEnumerable<T> Get()
        {
            return table.ToList<T>();
        }

        public T GetByID(K id)
        {
            if (table == null || table.Count() == 0) return null;
            var list = table.ToList();
            foreach(T item in list)
            {
                if (findElement != null && findElement(item, id))
                    return item;
            }

            return null;
        }        

        public void Insert(T obj)
        {
            table.Add(obj);
        }

        public void Update(T obj)
        {
            table.Attach(obj);
            db.Entry(obj).State = EntityState.Modified;
        }

        public void Delete(T t)
        {
            var deletedItem = table.Remove(t);
        }

        public void Save()
        {
            db.SaveChanges();
        }
    }
}
