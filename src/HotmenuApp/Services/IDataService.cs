using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HotmenuApp.Services
{
    public interface IDataService<T, K> where T : class
    {
        IEnumerable<T> Get();
        T GetByID(K id);
        void Insert(T item);
        void Delete(T item);
        void Update(T item);
        void Save();
    }
}
