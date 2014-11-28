using System;
using System.Web.Mvc;
using System.Text;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Senken;
using Senken.Models;


namespace Senken.Tests.Models
{
    [TestClass]
    public class SessionTest
    {
        [TestMethod]
        public void SessionID()
        {
            // Arrange
            Session session = new Session();

            // Act
            session.SessionID = 5;

            // Assert
            Assert.AreEqual(session.SessionID, 5);
        }



        [TestMethod]
        public void WaveBucketFilledBySpecs()
        {
            // Arrange
            Session session = new Session();

            Wave wave = new Wave(5, OscType.sine);

            // Act
            session.addWave(5, OscType.sine);


            // Assert
            Assert.AreEqual(session.getWave(0), wave);
        }


        [TestMethod]
        public void WaveBucketFilledByWaves()
        {
            // Arrange
            Session session = new Session();

            Wave wave = new Wave(5, OscType.sine);

            // Act
            session.addWave(wave);


            // Assert
            Assert.AreEqual(session.getWave(0), wave);
        }

    }





}
