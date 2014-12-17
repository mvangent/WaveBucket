using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
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

            ViewBag.Message = "Start anew or explore sessions";
            
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
        public async Task<ActionResult> Create([Bind(Include = "SessionID,Title, ArtistAlias, Rating,OscIFrequency,OscIType, WaveBucket, LFOIFrequency,LFOIScale,LFOIType,CompressorRatio,CompressorKnee,CompressorThreshold,MasterGain, BiquadFilterTypeOne, BiquadFilterFrequencyOne, BiquadFilterQOne, BiquadFilterGainOne")] Session sessionInput)
        {
            if (ModelState.IsValid)
            {
          
                
                ApplicationUser user = await UserManager.FindByIdAsync(User.Identity.GetUserId());

                user.sessions.Add(sessionInput);

               var result = await UserManager.UpdateAsync(user);

                await UserStore.Context.SaveChangesAsync();

                ApplicationDbContext.Dispose();
             

                return RedirectToAction("Index", "Session");
            
            }

            
           

            return View(sessionInput);
        }

   

        //GET: Session/Edit/5
        public async Task<ActionResult> Edit(int? id)
        {
            if (ModelState.IsValid)
            {

                int idNumber = (int) id;

                if (id == null)
                {
                    return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
                }
                else
                {
                    //Session session = db.Sessions.Find(id);
                    var user = UserManager.FindById(User.Identity.GetUserId());

                    var databaseSession = await ApplicationDbContext.Create().Sessions.FindAsync(idNumber);

                    ApplicationDbContext.Dispose();

                    return View(databaseSession);
               
                }
             
            }
            else
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
        }


        

           // POST: Session/Edit/Save (only works when user = owner of session) 
           // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
           // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
           [HttpPost]
           [ValidateAntiForgeryToken]
           public async Task<ActionResult> Edit(int? id, [Bind(Include = "SessionID,Title, ArtistAlias, Rating,OscIFrequency,OscIType, WaveBucket, LFOIFrequency,LFOIScale,LFOIType,CompressorRatio,CompressorKnee,CompressorThreshold,MasterGain, BiquadFilterTypeOne, BiquadFilterFrequencyOne, BiquadFilterQOne, BiquadFilterGainOne")] Session sessionInput)
           {
               if (ModelState.IsValid)
               {

                   int currentSessionInDB = (int) id;

                   ApplicationUser user = await UserManager.FindByIdAsync(User.Identity.GetUserId());

                   Session sessionInDb = await ApplicationDbContext.Sessions.FindAsync(id);

                   // update session

                   int indexToBeUpdated = user.sessions.IndexOf(sessionInDb);

                   // if user is owner 
                   if (indexToBeUpdated > -1)
                   {
                       user.sessions[indexToBeUpdated] = sessionInput;

                       // delete orphan in sessions table
                       ApplicationDbContext.Sessions.Remove(sessionInDb);

                       // update user profile
                       var result = await UserManager.UpdateAsync(user);

                       await UserStore.Context.SaveChangesAsync();

                       ApplicationDbContext.Dispose();

                       return RedirectToAction("Index", "Session");
                   }
                   else // index to be updated is -1 and session is from guest
                   {
                       user.sessions.Add(sessionInput);
                       
                       // update user profile with session

                       var result = await UserManager.UpdateAsync(user);

                       await UserStore.Context.SaveChangesAsync();

                       ApplicationDbContext.Dispose();

                       return RedirectToAction("Index", "Session");

                   }

            

               } else
               {
                   return View("Error");
               }

           }


          

    /*

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
       */

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
        //        db.Dispose(); 
                UserStore.Context.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
