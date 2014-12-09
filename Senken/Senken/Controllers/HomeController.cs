using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Senken.DAL;
using Senken.ViewModels;

namespace Senken.Controllers
{
   
    public class HomeController : Controller
    {
        private SenkenContext db = new SenkenContext();
        
        public ActionResult Index()
        {
            ViewBag.Message = "Modify this template to jump-start your ASP.NET MVC application.";

            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message =
                "This is a place that tries to add to Adam Harper's definition of inifite musical possibilties. Created with variables," +
                "and waiting for variables that simultanously can be inputted to create music with sound synthesis, I invite you to jam with your friend(s), wherever they might be.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}
