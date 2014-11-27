using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace Senken.Hubs
{
    public class JamHub : Hub
    {
        public void GenerateSound(string OscIFrequency, string OscIType)
        {
            
            // call the 
            Clients.All.waveGenerator(OscIFrequency, OscIType);
        }

        public void RemoveLastSound()
        {
            Clients.All.waveRemover();
        }

        public void ActivateLFO(string LfoFreq, string LfoScale, string LfoType)
        {
            Clients.All.lfoActivator(LfoFreq, LfoScale, LfoType);
        }

        public void DeactivateLFO()
        {
            Clients.All.lfoDeactivator();
        }

        public void AdjustCompRatio(string ratio)
        {
            Clients.All.compRatioAdjuster(ratio);
        }

        public void AdjustCompKnee(string knee)
        {
            Clients.All.compKneeAdjuster(knee);
        }
        

        public void AdjustCompThreshold(string threshold)
        {
            Clients.All.compThresholdAdjuster(threshold);
        }
        

    }
}