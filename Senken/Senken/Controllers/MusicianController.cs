using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Senken.DAL;
using Senken.Models;
using PagedList;

namespace Senken.Controllers
{
    public class MusicianController : Controller
    {
        private SenkenContext db = new SenkenContext();

        // GET: Musician
        public ActionResult Index(string sortOrder, string currentFilter, string searchString, int? page)
        {
            ViewBag.CurrentSort = sortOrder;
            ViewBag.NameSortParm = String.IsNullOrEmpty(sortOrder) ? "name_desc" : "";
            ViewBag.DateSortParm = sortOrder == "Date" ? "date_desc" : "Date";

            if (searchString != null)
            {
                page = 1;
            }
            else
            {
                searchString = currentFilter;
            }

            ViewBag.CurrentFilter = searchString;
            
            var musicians = from m in db.Musicians
                            select m;

            if (!String.IsNullOrEmpty(searchString))
            {
                musicians = musicians.Where(m => m.LastName.ToUpper().Contains(searchString.ToUpper())
                    || m.FirstMidName.ToUpper().Contains(searchString.ToUpper()));
            }

            
            switch (sortOrder)
            { 
                case "name_desc":
                    musicians = musicians.OrderByDescending(m => m.LastName);
                    break;
                case "Date":
                    musicians = musicians.OrderBy(m => m.SessionDate);
                    break; 
                case "date_desc":
                    musicians = musicians.OrderByDescending(m => m.SessionDate);
                    break;
                default:
                    musicians = musicians.OrderBy(m => m.LastName);
                    break;
            }

            int pageSize = 3;
            int pageNumber = (page ?? 1);
            

            return View(musicians.ToPagedList(pageNumber, pageSize));

        }

        // GET: Musician/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Musician musician = db.Musicians.Find(id);
            if (musician == null)
            {
                return HttpNotFound();
            }
            return View(musician);
        }

        // GET: Musician/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Musician/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "LastName,FirstMidName,SessionDate")] Musician musician)
        {

            try
            {
                if (ModelState.IsValid)
                {
                    db.Musicians.Add(musician);
                    db.SaveChanges();
                    return RedirectToAction("Index");
                }
            }
            catch (DataException /*dex */)
            {
                //Log the error (uncomment dex variable name and add a line here to write a log. 
                ModelState.AddModelError("", "Unable to save changes. Try again, and if the problem exists see your system administrator.");
            }

            return View(musician);
        }

        // GET: Musician/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Musician musician = db.Musicians.Find(id);
            if (musician == null)
            {
                return HttpNotFound();
            }
            return View(musician);
        }

        // POST: Musician/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID,LastName,FirstMidName,SessionDate")] Musician musician)
        {

            try
            {
                if (ModelState.IsValid)
                {
                    db.Entry(musician).State = EntityState.Modified;
                    db.SaveChanges();
                    return RedirectToAction("Index");
                }
            }
            catch (DataException /* dex */)
            {
                // Log the error (uncomment dex variable name and add a line here to write a log. 
                ModelState.AddModelError("", "Unable to save changes. Try again, if the problem persists see your system administrator");
            }
            return View(musician);
        }

        // GET: Musician/Delete/5
        public ActionResult Delete(int? id, bool? saveChangesError = false)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            if (saveChangesError.GetValueOrDefault())
            {
                ViewBag.ErrorMessage = "Delete failed. Try again, and if the problem persists see your system administrator. ";
            }
            Musician musician = db.Musicians.Find(id);
            if (musician == null)
            {
                return HttpNotFound();
            }
            return View(musician);
        }

        // POST: Musician/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id)
        {
            try
            {
                Musician musiciantoDelete = new Musician() { ID = id };
                db.Entry(musiciantoDelete).State = EntityState.Deleted;
                db.SaveChanges();
            }

            catch (DataException /* dex */)
            {
                //Log the error(uncomment dex variable name and add a line here to write a log.
                return RedirectToAction("Delete", new { id = id, saveChangesError = true });
            }
           
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
