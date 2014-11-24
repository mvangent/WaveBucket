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
            IQueryable<SessionDateGroup> data = from musician in db.Musicians
                    group musician by musician.SessionDate into dateGroup
                    select new SessionDateGroup()
                    {
                        SessionDate = dateGroup.Key,
                        MusicianCount = dateGroup.Count()

                    };

            return View(data.ToList());
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
