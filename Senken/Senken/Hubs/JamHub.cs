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
        
        public void StackSoundWave(string OscIFrequency, string OscIType, bool updateConnectionsBool)
        {
                      
            
            Clients.All.soundWaveStackerPointer(OscIFrequency, OscIType, updateConnectionsBool);
            Clients.All.updateConnectionsPointer();
            Clients.All.updateWaveBucketDisplayPointer();
            Clients.All.updateOscillatorDisplayPointer();


        }

        public void RemoveLastSound()
        {
            Clients.All.waveRemoverPointer();
            //Clients.All.updateConnectionsPointer();
            //Clients.All.updateOscillatorDisplayPointer();
        }

        /* LFO I */

        public void ActivateLFO(string LfoFreq, string LfoScale, string LfoType)
        {
            Clients.All.lfoActivatorPointer(LfoFreq, LfoScale, LfoType);
            Clients.All.updateConnectionsPointer();
            Clients.All.updateLfoDisplayPointer();
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

            Clients.All.updateCompressorDisplayPointer();

        }

        public void AdjustCompKnee(string knee)
        {
            Clients.All.compKneeAdjusterPointer(knee);
            Clients.All.updateCompressorDisplayPointer();
            
        }
        

        public void AdjustCompThreshold(string threshold)
        {
            Clients.All.compThresholdAdjusterPointer(threshold);
            Clients.All.updateCompressorDisplayPointer();
           
        }

        


        /* Master Controls */

        public void ChangeMasterGain(string volume)
        {
            Clients.All.masterGainAdjusterPointer(volume);
            Clients.All.updateEndControlDisplayPointer();
        }
        
        
        public void StopSession()
        {
            Clients.All.stopSessionPointer();
            Clients.All.freezeBucketPointer();
            Clients.All.updateConnectionsPointer();
            Clients.All.updateEndControlDisplayPointer();
            Clients.All.updateWaveBucketDisplayPointer();
        }

        public void PlaySession()
        {
            Clients.All.startSessionPointer();  
            Clients.All.startBucketPointer();
            Clients.All.updateConnectionsPointer();
            Clients.All.updateEndControlDisplayPointer();
            Clients.All.updateWaveBucketDisplayPointer();
        }

        /* BiQuadFilter */

        public void changeFilterTypeOne(string type)
        {
            Clients.All.changeFilterTypeOnePointer(type);
        }

        public void changeFilterFrequencyOne(string frequency)
        {
            Clients.All.changeFilterFrequencyOnePointer(frequency);
        }

        public void changeFilterQOne(string q)
        {
            Clients.All.changeFilterQOnePointer(q);
        }

        public void changeFilterGainOne(string gain)
        {
            Clients.All.changeFilterGainOnePointer(gain);
        }
        
    }

   
}