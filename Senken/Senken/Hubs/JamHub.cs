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
        
        public void StackSoundWave(string OscIFrequency, string OscIType)
        {
                        
            Clients.All.soundWaveStackerPointer(OscIFrequency, OscIType);

            Clients.All.updateConnectionsPointer();
        }

        public void RemoveLastSound()
        {
            Clients.All.waveRemoverPointer();
            Clients.All.updateConnectionsPointer();
        }

        /* LFO I */

        public void ActivateLFO(string LfoFreq, string LfoScale, string LfoType)
        {
            Clients.All.lfoActivatorPointer(LfoFreq, LfoScale, LfoType);
            Clients.All.updateConnectionsPointer();
        }

        public void DeactivateLFO()
        {
            Clients.All.lfoDeactivatorPointer();
            Clients.All.updateConnectionsPointer();
        }

        /* Compressor */

        public void AdjustCompRatio(string ratio)
        {
            Clients.All.compRatioAdjusterPointer(ratio);
            Clients.All.updateConnectionsPointer();
        }

        public void AdjustCompKnee(string knee)
        {
            Clients.All.compKneeAdjusterPointer(knee);
            Clients.All.updateConnectionsPointer();
        }
        

        public void AdjustCompThreshold(string threshold)
        {
            Clients.All.compThresholdAdjusterPointer(threshold);
            Clients.All.updateConnectionsPointer();
        }


        /* Master Controls */

        public void ChangeMasterGain(string volume)
        {
            Clients.All.masterGainAdjusterPointer(volume);
            Clients.All.updateConnectionsPointer();
        }
        
        
        public void StopSession()
        {
            Clients.All.sessionSuspenderPointer();
            Clients.All.updateConnectionsPointer();
        }

        public void PlaySession()
        {
            Clients.All.sessionPlayerPointer();
            Clients.All.updateConnectionsPointer();
        }


    }
}