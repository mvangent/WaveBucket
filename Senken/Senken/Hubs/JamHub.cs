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
        }

        public void RemoveLastSound()
        {
            Clients.All.waveRemoverPointer();
        }

        /* LFO I */

        public void ActivateLFO(string LfoFreq, string LfoScale, string LfoType)
        {
            Clients.All.lfoActivatorPointer(LfoFreq, LfoScale, LfoType);
        }

        public void DeactivateLFO()
        {
            Clients.All.lfoDeactivatorPointer();
        }

        /* Compressor */

        public void AdjustCompRatio(string ratio)
        {
            Clients.All.compRatioAdjusterPointer(ratio);
        }

        public void AdjustCompKnee(string knee)
        {
            Clients.All.compKneeAdjusterPointer(knee);
        }
        

        public void AdjustCompThreshold(string threshold)
        {
            Clients.All.compThresholdAdjusterPointer(threshold);
        }


        /* Master Controls */

        public void ChangeMasterGain(string volume)
        {
            Clients.All.masterGainPointer(volume);
        }
        
        
        public void StopSession()
        {
            Clients.All.sessionSuspenderPointer();
        }

        public void PlaySession()
        {
            Clients.All.sessionPlayerPointer();
        }


    }
}