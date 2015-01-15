using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Senken.Models;


namespace Senken.Controllers
{
   
    public class HomeController : Controller
    {
        // private ApplicationDbContext db = new ApplicationDbContext();
        
        public ActionResult Index()
        {
            ViewBag.Message = "Modify this template to jump-start your ASP.NET MVC application.";

            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message =
                "WaveBucket is a chatbox for sound waves. Grounded in modular, additive synthesizing, it is a communal space for sound design and electronic music experiments. Realtime tweaking a synthesizer with your friends in seperate locations is" +
               " easy: You only need a web browser that supports audio synthesis**, create a new or join an existing public session, and you are good to go. Next to public jamming and sharing, WaveBucket also offers a private session mode, so that you can experiment with its wavestackers, filters, delays, " +
               "and lfo's just by yourself. Either way, have a good time!";
            

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        [Authorize]
        public ActionResult DemoRoom()
        {
            ViewBag.Message = "Your demo page.";

            return View();
        }


       /* protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        } */
    }
}
