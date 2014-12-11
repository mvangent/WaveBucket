using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Senken.Models;


namespace Senken.Controllers
{   [Authorize]
    public class SessionController : Controller
    {

        /// <summary>
        /// Application DB context
        /// </summary>
        public  ApplicationDbContext ApplicationDbContext { get; set; }
        protected UserStore<ApplicationUser> UserStore { get; private set; } 
        protected UserManager<ApplicationUser> UserManager { get; set; }

    public SessionController()
    {
        this.ApplicationDbContext = ApplicationDbContext.Create();
        this.UserStore = new UserStore<ApplicationUser>(this.ApplicationDbContext);
        this.UserManager = new UserManager<ApplicationUser>(this.UserStore);
    }

   
        // GET: Session
        public ActionResult Index()
        {
         //   var sessions = db.Users.Include(s => s.UserName);
           
          //  return View(sessions.ToList());
            return View();

        }

    /*

        // GET: Session/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
          Session session = db.Sessions.Find(id);
            if (session == null)
            {
                return HttpNotFound();
            }
            return View(session);
        }

     * 
     */
        // GET: Session/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Session/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "SessionID,Title,Rating,OscIFrequency,OscIType, WaveBucket, LFOIFrequency,LFOIScale,LFOIType,CompressorRatio,CompressorKnee,CompressorThreshold,MasterGain, BiquadFilterTypeOne, BiquadFilterFrequencyOne, BiquadFilterQOne, BiquadFilterGainOne")] Session sessionInput)
        {
            if (ModelState.IsValid)
            {
            //    db.Sessions.Add(session);
            //    db.SaveChanges();
            //    return RedirectToAction("Index");

                
                
                var user = UserManager.FindById(User.Identity.GetUserId());
                user.sessions.Add(sessionInput);

                UserManager.Update(user);

                UserStore.Context.SaveChanges();
               

                RedirectToAction("Index");

            }

            
           
            

            return View(sessionInput);
        }

   

        //GET: Session/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            //Session session = db.Sessions.Find(id);
             var user = UserManager.FindById(User.Identity.GetUserId());
            if (user.sessions.Count > 0)
            {
                Session session = user.sessions[0];
            
                if (session == null)
                {
                    return HttpNotFound();
                }
            
            

            
            
                return View(session);
            }

            return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
        }


        /*

           // POST: Session/Edit/5
           // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
           // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
           [HttpPost]
           [ValidateAntiForgeryToken]
           public ActionResult Edit([Bind(Include = "SessionID,Title,Rating,OscIFrequency,OscIType, WaveBucket, LFOIFrequency,LFOIScale,LFOIType,CompressorRatio,CompressorKnee,CompressorThreshold,MasterGain, BiquadFilterTypeOne, BiquadFilterFrequencyOne, BiquadFilterQOne, BiquadFilterGainOne")] Session session)
           {
               if (ModelState.IsValid)
               {
                   db.Entry(session).State = EntityState.Modified;
                   db.SaveChanges();
                   return RedirectToAction("Index");
               }
            
            
               return View(session);
           }

           // GET: Session/Delete/5
           public ActionResult Delete(int? id)
           {
               if (id == null)
               {
                   return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
               }
               Session session = db.Sessions.Find(id);
               if (session == null)
               {
                   return HttpNotFound();
               }
               return View(session);
           }

           // POST: Session/Delete/5
           [HttpPost, ActionName("Delete")]
           [ValidateAntiForgeryToken]
           public ActionResult DeleteConfirmed(int id)
           {
               Session session = db.Sessions.Find(id);
               db.Sessions.Remove(session);
               db.SaveChanges();
               return RedirectToAction("Index");
           }
        * 
        * 
        */
     

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
        //        db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
