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
        
        public bool StackASoundWave(string OscIFrequency, string OscIType, bool updateConnectionsBool)
        {
                      
            
            Clients.All.stackSoundWavePointer(OscIFrequency, OscIType, updateConnectionsBool);
            Clients.All.updateConnectionsPointer();
            Clients.All.updateWaveBucketDisplayPointer();
            Clients.All.updateOscillatorDisplayPointer();

            return true;
        }

        public bool RemoveLastSound()
        {
            Clients.All.waveRemoverPointer();
            Clients.All.updateWaveBucketDisplayPointer();
            //Clients.All.updateConnectionsPointer();
            //Clients.All.updateOscillatorDisplayPointer();

            return true;
        }

        /* LFO I */

        public bool ActivateLFO(string LfoFreq, string LfoScale, string LfoType)
        {
            Clients.All.lfoActivatorPointer(LfoFreq, LfoScale, LfoType);
            Clients.All.updateConnectionsPointer();
            Clients.All.updateLfoDisplayPointer();

            return true;
        }

        public bool DeactivateLFO()
        {
            Clients.All.lfoDeactivatorPointer();
            Clients.All.updateConnectionsPointer();

            return true;
        }

        /* Compressor */

        public bool AdjustCompRatio(string ratio)
        {
            Clients.All.compRatioAdjusterPointer(ratio);

            Clients.All.updateCompressorDisplayPointer();

            return true;

        }

        public bool AdjustCompKnee(string knee)
        {
            Clients.All.compKneeAdjusterPointer(knee);
            Clients.All.updateCompressorDisplayPointer();

            return true;

        }
        

        public bool AdjustCompThreshold(string threshold)
        {
            Clients.All.compThresholdAdjusterPointer(threshold);
            Clients.All.updateCompressorDisplayPointer();

            return true;

        }

        

        /* Master Controls */

        public bool ChangeMasterGain(string volume)
        {
            Clients.All.masterGainAdjusterPointer(volume);
            Clients.All.updateEndControlDisplayPointer();

            return true;
        }
        
        
        public bool StopSession()
        {
            Clients.All.stopSessionPointer();
            Clients.All.freezeBucketPointer();
            Clients.All.updateConnectionsPointer();
            Clients.All.updateEndControlDisplayPointer();
            Clients.All.updateWaveBucketDisplayPointer();

            return true;
        }

        public bool PlaySession()
        {
            Clients.All.startSessionPointer();  
            Clients.All.startBucketPointer();
            Clients.All.updateConnectionsPointer();
            Clients.All.updateEndControlDisplayPointer();
            Clients.All.updateWaveBucketDisplayPointer();

            return true;
        }

        /* BiQuadFilter */

        public bool changeFilterTypeOne(string type)
        {
            Clients.All.changeFilterTypeOnePointer(type);

            return true;
        }

        public bool changeFilterFrequencyOne(string frequency)
        {
            Clients.All.changeFilterFrequencyOnePointer(frequency);

            return true;
        }

        public bool changeFilterQOne(string q)
        {
            Clients.All.changeFilterQOnePointer(q);

            return true;
        }

        public bool changeFilterGainOne(string gain)
        {
            Clients.All.changeFilterGainOnePointer(gain);

            return true;
        }
        
    }

   
}