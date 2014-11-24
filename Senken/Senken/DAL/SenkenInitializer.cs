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
            var instrumentSetups = new List<InstrumentSetup>
            {
            new InstrumentSetup{InstrumentSetupID=1050,Name="SineStacker",Level=3,},
            new InstrumentSetup{InstrumentSetupID=4022,Name="LFO",Level=3,},
            new InstrumentSetup{InstrumentSetupID=4041,Name="Granular",Level=3,},
            new InstrumentSetup{InstrumentSetupID=1045,Name="Sawvy",Level=4,},
            new InstrumentSetup{InstrumentSetupID=3141,Name="FourierTransform",Level=4,},
            new InstrumentSetup{InstrumentSetupID=2021,Name="SawTeeth",Level=3,},
            new InstrumentSetup{InstrumentSetupID=2042,Name="Substractive",Level=4,}
            };
            instrumentSetups.ForEach(s => context.InstrumentSetups.Add(s));
            context.SaveChanges();
            var sessions = new List<Session>
            {
            new Session{MusicianID=1,InstrumentSetupID=1050,Rating=Rating.A},
            new Session{MusicianID=1,InstrumentSetupID=4022,Rating=Rating.C},
            new Session{MusicianID=1,InstrumentSetupID=4041,Rating=Rating.B},
            new Session{MusicianID=2,InstrumentSetupID=1045,Rating=Rating.B},
            new Session{MusicianID=2,InstrumentSetupID=3141,Rating=Rating.F},
            new Session{MusicianID=2,InstrumentSetupID=2021,Rating=Rating.F},
            new Session{MusicianID=3,InstrumentSetupID=1050},
            new Session{MusicianID=4,InstrumentSetupID=1050,},
            new Session{MusicianID=4,InstrumentSetupID=4022,Rating=Rating.F},
            new Session{MusicianID=5,InstrumentSetupID=4041,Rating=Rating.C},
            new Session{MusicianID=6,InstrumentSetupID=1045},
            new Session{MusicianID=7,InstrumentSetupID=3141,Rating=Rating.A},
            };
            sessions.ForEach(s => context.Sessions.Add(s));
            context.SaveChanges();
        }
    }
}