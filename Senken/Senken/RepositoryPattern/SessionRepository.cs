
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Data;
using System.Data.Entity;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Senken.Models;
using System.Web.UI;




namespace Senken.RepositoryPattern
{
    public class SessionRepository : ISessionRepository
    {
        public ApplicationDbContext db { get; set; }
        protected UserStore<ApplicationUser> userStore { get; private set; }
        protected UserManager<ApplicationUser> userManager { get; set; }

        public SessionRepository()
        {
            this.db = ApplicationDbContext.Create();
            this.userStore = new UserStore<ApplicationUser>(this.db);
            this.userManager = new UserManager<ApplicationUser>(this.userStore);
        }

        public SessionRepository(ApplicationDbContext db)
        {
            this.db = db;
            this.userStore = new UserStore<ApplicationUser>(this.db);
            this.userManager = new UserManager<ApplicationUser>(this.userStore);
        }

        public async Task<ApplicationUser> GetCurrentUser()
        {
            ApplicationUser user = await userManager.FindByIdAsync(HttpContext.Current.User.Identity.GetUserId());

            return user;
        }

        public IEnumerable<Session> SelectAll()
        {
            return db.Sessions.ToList();
        }
        
        public async Task<Session> SelectByID(int id)
        {
            Session databaseSession = await db.Sessions.FindAsync(id);

            return databaseSession;

        }
        
        public async Task<ApplicationUser> Insert(Session obj)
        {
            ApplicationUser user = await userManager.FindByIdAsync(HttpContext.Current.User.Identity.GetUserId());

            user.sessions.Add(obj);

            return user;
        }

        public async Task<bool> Update(ApplicationUser obj)
        {
            var result = await userManager.UpdateAsync(obj);

            return true;
        }

        public async Task<ApplicationUser> Delete(Session id)
        {
            ApplicationUser user = await userManager.FindByIdAsync(HttpContext.Current.User.Identity.GetUserId());

            user.sessions.Remove(id);

            db.Sessions.Remove(id);

            return user;
        }

        public async Task<bool> Save()
        {
            await userStore.Context.SaveChangesAsync();

            return true;
        }



    }
}