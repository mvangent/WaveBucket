using System;
using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using NUnit.Framework;
using Senken.Models;
using Assert = Microsoft.VisualStudio.TestTools.UnitTesting.Assert;

namespace Senken.Tests.Models
{
    [TestClass]
    public class IdentityModels
    {
        
        
        [TestMethod]
        public void ApplicationUser()
        {
            ApplicationUser au = new ApplicationUser();

            // act 

            List<Session> sessions = new List<Session>();

            sessions.Add(new Session());

            au.sessions = sessions; 


            // assert

            Assert.AreEqual(au.sessions.Count, 1);

        }
          
         

        /*

        [TestMethod]
        public void ApplicationDbContext()
        {
            ApplicationDbContext adbc = new ApplicationDbContext();

            // act 

            

            Session session = new Session();

            session.Title = "Title";

            int primaryKey = session.SessionID;

            adbc.Sessions.Add(session);

            // assert

            Assert.AreEqual(adbc.Sessions.Find(primaryKey).Title, "Title");

        }
         * 
         */
    }
}
