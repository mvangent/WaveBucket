using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Senken.Models;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace Senken.DAL
{
    public class SenkenContext : DbContext
    {
        public SenkenContext(): base("SenkenContext")
        {

        }

        public DbSet<Musician> Musicians { get; set; }
        public DbSet<Session> Sessions { get; set; }
        public DbSet<InstrumentSetup> InstrumentSetups { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}