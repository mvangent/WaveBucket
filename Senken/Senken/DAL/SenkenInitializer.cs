using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using Senken.Models;

namespace Senken.DAL
{
    public class SenkenInitializer : System.Data.Entity.DropCreateDatabaseIfModelChanges<SenkenContext>
    {
        protected override void Seed(SenkenContext context)
        {
            var musicians = new List<Musician>
            {
            new Musician{FirstMidName="Carson",LastName="Alexander",SessionDate=DateTime.Parse("2005-09-01")},
            new Musician{FirstMidName="Meredith",LastName="Alonso",SessionDate=DateTime.Parse("2002-09-01")},
            new Musician{FirstMidName="Arturo",LastName="Anand",SessionDate=DateTime.Parse("2003-09-01")},
            new Musician{FirstMidName="Gytis",LastName="Barzdukas",SessionDate=DateTime.Parse("2002-09-01")},
            new Musician{FirstMidName="Yan",LastName="Li",SessionDate=DateTime.Parse("2002-09-01")},
            new Musician{FirstMidName="Peggy",LastName="Justice",SessionDate=DateTime.Parse("2001-09-01")},
            new Musician{FirstMidName="Laura",LastName="Norman",SessionDate=DateTime.Parse("2003-09-01")},
            new Musician{FirstMidName="Nino",LastName="Olivetto",SessionDate=DateTime.Parse("2005-09-01")}
            };

            musicians.ForEach(s => context.Musicians.Add(s));
            context.SaveChanges();
           
            var sessions = new List<Session>
            {
            new Session{MusicianID=1,Rating=Rating.A},
            new Session{MusicianID=1,Rating=Rating.C},
            new Session{MusicianID=1,Rating=Rating.B},
            new Session{MusicianID=2,Rating=Rating.B},
            new Session{MusicianID=2,Rating=Rating.F},
            new Session{MusicianID=2,Rating=Rating.F},
            new Session{MusicianID=3},
            new Session{MusicianID=4},
            new Session{MusicianID=4,Rating=Rating.F},
            new Session{MusicianID=5,Rating=Rating.C},
            new Session{MusicianID=6,},
            new Session{MusicianID=7,Rating=Rating.A},
            };
            sessions.ForEach(s => context.Sessions.Add(s));
            context.SaveChanges();
        }
    }
}