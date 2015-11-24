using HotmenuApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HotmenuApp.Services
{
    public class DataService<T, K> : IDataService<T, K> where T : class
    {
        private Repository<T, K> _repository;
        public FindElement<T, K> findElement;
        public DataService()
        {
            _repository = new Repository<T, K>();
            _repository.findElement = this.findElement;
        }
        public IEnumerable<T> Get()
        {
            return _repository.Get();
        }

        public void Insert(T item)
        {
            throw new NotImplementedException();
        }

        public void Delete(T item)
        {
            throw new NotImplementedException();
        }

        public void Update(T item)
        {
            throw new NotImplementedException();
        }

        public void Save()
        {
            throw new NotImplementedException();
        }

        public T GetByID(K id)
        {
            return _repository.GetByID(id);
        }
    }
}
