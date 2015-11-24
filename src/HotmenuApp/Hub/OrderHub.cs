using System;
using Microsoft.AspNet.SignalR;
using System.Threading;
using Newtonsoft.Json.Linq;

namespace HotmenuApp.Hub
{
    public class OrderHub : Hub<IOrderHub>
    {
        public void SubmitOrder(JObject order)
        {
            bool dataProcessedSuccessfully = true;
            
            //var submittedOrder = Order.ConvertJsonToOrder(order);

            Thread.Sleep(1000);

            var responseString = "hello world from hub" + DateTime.Now.ToLocalTime();

            if (dataProcessedSuccessfully)
            {
                Clients.All.UpdateOrderProcessStatus(order);
            }
            else
            {
                Clients.Caller.UpdateOrderProcessStatus(order);
            }
        }
    }

    public interface IOrderHub
    {
        void UpdateOrderProcessStatus(JObject order);
    }
}
