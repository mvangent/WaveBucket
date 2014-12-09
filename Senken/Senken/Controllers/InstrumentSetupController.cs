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

namespace Senken.Controllers
{
    public class InstrumentSetupController : Controller
    {
        private SenkenContext db = new SenkenContext();
            

        // GET: InstrumentSetup
        public ActionResult Index()
        {
            return View(db.InstrumentSetups.ToList());
        }

        // GET: InstrumentSetup/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            InstrumentSetup instrumentSetup = db.InstrumentSetups.Find(id);
            if (instrumentSetup == null)
            {
                return HttpNotFound();
            }
            return View(instrumentSetup);
        }

        // GET: InstrumentSetup/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: InstrumentSetup/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "InstrumentSetupID,Name,Level")] InstrumentSetup instrumentSetup)
        {
            if (ModelState.IsValid)
            {
                db.InstrumentSetups.Add(instrumentSetup);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(instrumentSetup);
        }

        // GET: InstrumentSetup/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            InstrumentSetup instrumentSetup = db.InstrumentSetups.Find(id);
            if (instrumentSetup == null)
            {
                return HttpNotFound();
            }
            return View(instrumentSetup);
        }

        // POST: InstrumentSetup/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "InstrumentSetupID,Name,Level")] InstrumentSetup instrumentSetup)
        {
            if (ModelState.IsValid)
            {
                db.Entry(instrumentSetup).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(instrumentSetup);
        }

        // GET: InstrumentSetup/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            InstrumentSetup instrumentSetup = db.InstrumentSetups.Find(id);
            if (instrumentSetup == null)
            {
                return HttpNotFound();
            }
            return View(instrumentSetup);
        }

        // POST: InstrumentSetup/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            InstrumentSetup instrumentSetup = db.InstrumentSetups.Find(id);
            db.InstrumentSetups.Remove(instrumentSetup);
            db.SaveChanges();
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
