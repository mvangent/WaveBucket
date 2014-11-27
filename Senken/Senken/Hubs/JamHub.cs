using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace Senken.Hubs
{
    public class JamHub : Hub
    {
        public void Send(string OscIFrequency, string OscType)
        {
            Console.Write("reached");
            // call the 
            Clients.All.makeSineWave(OscIFrequency, OscType);
        }
    }
}