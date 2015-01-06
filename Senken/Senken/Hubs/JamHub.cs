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
        
        public bool StackASoundWaveI(string OscIFrequency, string OscIType, bool updateConnectionsBool)
        {
                      
            
            Clients.All.stackSoundWavePointerI(OscIFrequency, OscIType, updateConnectionsBool);
            Clients.All.updateWaveBucketDisplayPointerI();
            Clients.All.updateOscillatorDisplayPointerI();
            Clients.All.saveWaveBucketPointerI();
            Clients.All.updateConnectionsPointer();
            
            

            return true;
        }

        public bool RemoveLastSoundI()
        {
            Clients.All.waveRemoverPointerI();
            Clients.All.saveWaveBucketPointerI();
            Clients.All.updateWaveBucketDisplayPointerI();
            //Clients.All.updateConnectionsPointer();
            //Clients.All.updateOscillatorDisplayPointer();

            return true;
        }

        /* LFO I */

        public bool ActivateLFOI(string LfoFreq, string LfoScale, string LfoType)
        {
            Clients.All.lfoActivatorPointerI(LfoFreq, LfoScale, LfoType);
            Clients.All.updateConnectionsPointer();
            Clients.All.updateLfoDisplayPointerI();

            return true;
        }

        public bool DeactivateLFOI()
        {
            Clients.All.lfoDeactivatorPointerI();
            Clients.All.updateConnectionsPointer();
            Clients.All.updateLfoDisplayPointerI();

            return true;
        }


        /* BiQuadFilter I */

        public bool ChangeFilterTypeOne(string type)
        {
            Clients.All.changeFilterTypeOnePointer(type);
            Clients.All.updateBiquadFilterIDisplayPointer();


            return true;
        }

        public bool ChangeFilterFrequencyOne(string frequency)
        {
            Clients.All.changeFilterFrequencyOnePointer(frequency);
            Clients.All.updateBiquadFilterIDisplayPointer();

            return true;
        }

        public bool ChangeFilterQOne(string q)
        {
            Clients.All.changeFilterQOnePointer(q);
            Clients.All.updateBiquadFilterIDisplayPointer();

            return true;
        }

        public bool ChangeFilterGainOne(string gain)
        {
            Clients.All.changeFilterGainOnePointer(gain);
            Clients.All.updateBiquadFilterIDisplayPointer();

            return true;
        }

        /* OscillatorII */

        public bool StackASoundWaveII(string OscIFrequency, string OscIType, bool updateConnectionsBool)
        {


            Clients.All.stackSoundWavePointerII(OscIFrequency, OscIType, updateConnectionsBool);
            Clients.All.updateConnectionsPointer();
            Clients.All.saveWaveBucketPointerII();
            Clients.All.updateWaveBucketDisplayPointerII();
            Clients.All.updateOscillatorDisplayPointerII();

            return true;
        }

        public bool RemoveLastSoundII()
        {
            Clients.All.waveRemoverPointerII();
            Clients.All.saveWaveBucketPointerII();
            Clients.All.updateWaveBucketDisplayPointerII();
            //Clients.All.updateConnectionsPointer();
            //Clients.All.updateOscillatorDisplayPointer();

            return true;
        }

        /* LFO II */

        public bool ActivateLFOII(string LfoFreq, string LfoScale, string LfoType)
        {
            Clients.All.lfoActivatorPointerII(LfoFreq, LfoScale, LfoType);
            Clients.All.updateConnectionsPointer();
            Clients.All.updateLfoDisplayPointerII();

            return true;
        }

        public bool DeactivateLFOII()
        {
            Clients.All.lfoDeactivatorPointerII();
            Clients.All.updateConnectionsPointer();
            Clients.All.updateLfoDisplayPointerII();

            return true;
        }


        /* BiQuadFilter II */

        public bool ChangeFilterTypeTwo(string type)
        {
            Clients.All.changeFilterTypeTwoPointer(type);
            Clients.All.updateBiquadFilterIIDisplayPointer();


            return true;
        }

        public bool ChangeFilterFrequencyTwo(string frequency)
        {
            Clients.All.changeFilterFrequencyTwoPointer(frequency);
            Clients.All.updateBiquadFilterIIDisplayPointer();

            return true;
        }

        public bool ChangeFilterQTwo(string q)
        {
            Clients.All.changeFilterQTwoPointer(q);
            Clients.All.updateBiquadFilterIIDisplayPointer();

            return true;
        }

        public bool ChangeFilterGainTwo(string gain)
        {
            Clients.All.changeFilterGainTwoPointer(gain);
            Clients.All.updateBiquadFilterIIDisplayPointer();

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
            Clients.All.freezeBucketPointerI();
            Clients.All.freezeBucketPointerII();
            Clients.All.updateConnectionsPointer();
            Clients.All.updateEndControlDisplayPointer();
            Clients.All.updateWaveBucketDisplayPointerI();
            Clients.All.updateWaveBucketDisplayPointerII();

            return true;
        }

        public bool PlaySession()
        {
            Clients.All.startSessionPointer(); // must come first otherwise the session will not be flagged as started
            
           
            Clients.All.startBucketPointerI(); // bucket activation must come before loading: NEW IMPLEMENTATION NEEDED
            Clients.All.startBucketPointerII();

            Clients.All.loadWaveBucketPointerI(); // LOAD BUCKET SHOULD STORE VALUE IN THE ARRAY AND NOT KICK OFF WAVES
            Clients.All.loadWaveBucketPointerII();
         
            
            
            
            Clients.All.updateEndControlDisplayPointer();
            Clients.All.updateWaveBucketDisplayPointerI();
            Clients.All.updateWaveBucketDisplayPointerII();

            Clients.All.lfoIRunner();
            Clients.All.lfoIIRunner();

            Clients.All.filterIRunner();
            Clients.All.filterIIRunner();

           // Clients.All.updateCompressorDisplayPointer();
           // Clients.All.updateLfoDisplayPointerI();
           // Clients.All.updateLfoDisplayPointerII();
           // Clients.All.updateOscillatorDisplayPointerI();
           // Clients.All.updateOscillatorDisplayPointerII();
           // Clients.All.updateBiquadFilterIDisplayPointer();
           // Clients.All.updateBiquadFilterIIDisplayPointer();

           // Clients.All.updateConnectionsPointer();

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

        

      
        
    }

   
}