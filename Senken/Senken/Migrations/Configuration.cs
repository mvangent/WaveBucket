using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Senken.Models;

namespace Senken.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<Senken.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            AutomaticMigrationDataLossAllowed = true;
        }

        protected override void Seed(Senken.Models.ApplicationDbContext context)
        {
            if (!context.Users.Any(u => u.UserName == "melvinvangent@gmail.com"))
            {
                var store = new UserStore<ApplicationUser>(context);
                var manager = new UserManager<ApplicationUser>(store);
                var user = new ApplicationUser { UserName = "melvinvangent@gmail.com" };

                manager.Create(user, "password");
            }
			
			
			
			
			
			
        }
    }
}
