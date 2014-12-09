using Owin;
using Microsoft.Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

[assembly: OwinStartup(typeof(Senken.Startup))]

namespace Senken
{
    public partial class Startup
    {
            
         public void Configuration(IAppBuilder app)
            {
                app.MapSignalR();
                ConfigureAuth(app);
            }
        
    }
}





            
      