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
                "This is a place that tries to add to Adam Harper's definition of inifite musical possibilties. Created with variables," +
                "and waiting for variables that simultanously can be inputted to create music with sound synthesis, I invite you to jam with your friends, wherever they might be.";

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
