using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Senken.Hubs;
using Microsoft.AspNet.SignalR;
using Senken.Models;

namespace Senken.Tests.Hub
{
    [TestClass]
    public class Hub
    {
        [TestMethod]
        public void JamHub()
        {

            var context = GlobalHost.ConnectionManager.GetHubContext<JamHub>();
            context.Clients.All.Whatever();


            JamHub jamhub = new JamHub();

            // act 

            bool activateLfo = jamhub.ActivateLFO("0", "2", "0");
            
            // assert
            Assert.IsTrue(activateLfo);

            // act 

            bool adjustCompKnee = jamhub.AdjustCompKnee("4");

            // assert
            Assert.IsTrue(adjustCompKnee);

            // act 

            bool adjustCompRatio = jamhub.AdjustCompRatio("20");

            // assert
            Assert.IsTrue(adjustCompRatio);

            // act 

            bool adjustCompThreshold = jamhub.AdjustCompThreshold("-5");

            // assert
            Assert.IsTrue(adjustCompThreshold);


            // act 

            bool changeMasterGain = jamhub.ChangeMasterGain("30");

            // assert
            Assert.IsTrue(changeMasterGain);

            // act 

            bool deActivateLfo = jamhub.DeactivateLFO();

            // assert
            Assert.IsTrue(deActivateLfo);


            // act 

            bool playSession = jamhub.PlaySession();

            // assert
            Assert.IsTrue(playSession);


            // act 

            bool removeLastSound = jamhub.RemoveLastSound();

            // assert
            Assert.IsTrue(removeLastSound);


            // act 

            bool stackASoundWave = jamhub.StackASoundWave("0", "2", false);

            // assert
            Assert.IsTrue(stackASoundWave);


            // act 

            bool stopSession = jamhub.StopSession();

            // assert
            Assert.IsTrue(stopSession);


            // act 

            bool changeFilterFreqI = jamhub.changeFilterFrequencyOne("2");

            // assert
            Assert.IsTrue(changeFilterFreqI);


            // act 

            bool changeFilterGainI = jamhub.changeFilterGainOne("10");

            // assert
            Assert.IsTrue(changeFilterGainI);


            // act 

            bool changeFilterQI = jamhub.changeFilterQOne("1");

            // assert
            Assert.IsTrue(changeFilterQI);


            // act 

            bool changeFilterTypeI = jamhub.changeFilterTypeOne("0");

            // assert
            Assert.IsTrue(changeFilterTypeI);



        }
    }
}
