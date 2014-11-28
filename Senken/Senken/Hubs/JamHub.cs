/*** --------------------------------------------------------------------------------------------------
 ** ~/Hubs/JamHub.cs: This class implements the Hub on the server that makes simultaneously jamming with other 
 ** musicians at different locations possible.
 --------------------------------------------------------------------------------------------------***/


using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace Senken.Hubs
{
    public class JamHub : Hub
    {
        
        /* OscillatorI */
        
        public void GenerateSound(string OscIFrequency, string OscIType)
        {
                        
            Clients.All.waveGenerator(OscIFrequency, OscIType);
        }

        public void RemoveLastSound()
        {
            Clients.All.waveRemover();
        }

        /* LFO I */

        public void ActivateLFO(string LfoFreq, string LfoScale, string LfoType)
        {
            Clients.All.lfoActivator(LfoFreq, LfoScale, LfoType);
        }

        public void DeactivateLFO()
        {
            Clients.All.lfoDeactivator();
        }

        /* Compressor */

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


        /* Master Controls */

        public void ChangeMasterGain(string volume)
        {
            Clients.All.masterGain(volume);
        }
        
        
        public void StopSession()
        {
            Clients.All.sessionSuspender();
        }

        public void PlaySession()
        {
            Clients.All.sessionPlayer();
        }


    }
}