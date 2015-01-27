/*** --------------------------------------------------------------------------------------------------
 ** ~/Hubs/JamHub.cs: This class implements the Hub on the server that makes simultaneously jamming with other 
 ** musicians at different locations possible.
 --------------------------------------------------------------------------------------------------***/


using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using System.Threading.Tasks;

namespace Senken.Hubs
{
    public class JamHub : Hub
    {

        /* group management methods */
        public Task JoinRoom(string roomName)
        {
            return Groups.Add(Context.ConnectionId, roomName);
        }

        public Task LeaveRoom(string roomName)
        {
            return Groups.Remove(Context.ConnectionId, roomName);
        }

        
        /* WaveBucket(s) */

        public bool AdjustWaveVolume(string roomName, string volume, string bucketNumber, string waveNumber) 
        {
            if (int.Parse(bucketNumber) == 0)
            {
              
                Clients.Group(roomName).changeWaveVolumeInBucketIPointer(waveNumber, volume, "bucketlistI");
              //  Clients.Group(roomName).updateWaveBucketDisplayPointerI();
         
            }
            else if (int.Parse(bucketNumber) == 1)
            {
                // do stuff for waveBucket II
                Clients.Group(roomName).changeWaveVolumeInBucketIIPointer(waveNumber, volume, "bucketlistII");
               // Clients.Group(roomName).updateWaveBucketDisplayPointerII();
            }
            else
            {
                // do nothing
            }

            return true;

        }       
  
       
        
          public bool RemoveWaveByIndex(string roomName, string bucketNumber, string waveNumber) 
          {
            if (int.Parse(bucketNumber) == 0)
            {

                Clients.Group(roomName).removeWaveByIndexInBucketIPointer(waveNumber, "bucketlistII");
              //  Clients.Group(roomName).updateWaveBucketDisplayPointerI();
         
            }
            else if (int.Parse(bucketNumber) == 1)
            {
                // do stuff for waveBucket II
                Clients.Group(roomName).removeWaveByIndexInBucketIIPointer(waveNumber, "bucketlistII");
              //  Clients.Group(roomName).updateWaveBucketDisplayPointerII();
            }
            else
            {
                // do nothing
            }

            return true;

        }   


        
        /* OscillatorI */

        public bool StackASoundWaveI(string roomName, string OscIFrequency, string OscIType, bool updateConnectionsBool)
        {
                      
            
            Clients.Group(roomName).stackSoundWavePointerI(OscIFrequency, OscIType, updateConnectionsBool);
            Clients.Group(roomName).updateWaveBucketDisplayPointerI();
            Clients.Group(roomName).updateOscillatorDisplayPointerI();
            Clients.Group(roomName).saveWaveBucketPointerI();
            Clients.Group(roomName).updateConnectionsPointer();
            
            

            return true;
        }

        public bool RemoveLastSoundI(string roomName)
        {
            Clients.Group(roomName).waveRemoverPointerI();
            Clients.Group(roomName).saveWaveBucketPointerI();
            Clients.Group(roomName).updateWaveBucketDisplayPointerI();
            //Clients.Group(roomName).updateConnectionsPointer();
            //Clients.Group(roomName).updateOscillatorDisplayPointer();

            return true;
        }

        /* LFO I */

        public bool ActivateLFOI(string roomName, string LfoFreq, string LfoScale, string LfoType)
        {
            Clients.Group(roomName).lfoActivatorPointerI(LfoFreq, LfoScale, LfoType);
            Clients.Group(roomName).updateConnectionsPointer();
            Clients.Group(roomName).updateLfoDisplayPointerI();

            return true;
        }

        public bool DeactivateLFOI(string roomName)
        {
            Clients.Group(roomName).lfoDeactivatorPointerI();
            Clients.Group(roomName).updateConnectionsPointer();
            Clients.Group(roomName).updateLfoDisplayPointerI();

            return true;
        }


        /* BiQuadFilter I */

        public bool ChangeFilterTypeOne(string roomName, string type)
        {
            Clients.Group(roomName).changeFilterTypeOnePointer(type);
            Clients.Group(roomName).updateBiquadFilterIDisplayPointer();


            return true;
        }

        public bool ChangeFilterFrequencyOne(string roomName, string frequency)
        {
            Clients.Group(roomName).changeFilterFrequencyOnePointer(frequency);
            Clients.Group(roomName).updateBiquadFilterIDisplayPointer();

            return true;
        }

        public bool ChangeFilterQOne(string roomName, string q)
        {
            Clients.Group(roomName).changeFilterQOnePointer(q);
            Clients.Group(roomName).updateBiquadFilterIDisplayPointer();

            return true;
        }

        public bool ChangeFilterGainOne(string roomName, string gain)
        {
            Clients.Group(roomName).changeFilterGainOnePointer(gain);
            Clients.Group(roomName).updateBiquadFilterIDisplayPointer();

            return true;
        }

        /* Delay I */
        public bool ChangeDelayITime(string roomName, string ms)
        {
            Clients.Group(roomName).changeDelayITimePointer(ms);
            Clients.Group(roomName).updateDelayIDisplayPointer();

            return true;
        }

        public bool ChangeDelayIDryWet(string roomName, string ratio)
        {
            Clients.Group(roomName).changeDelayIDryWetPointer(ratio);
            Clients.Group(roomName).updateDelayIDisplayPointer();

            return true;
        }

        /* OscillatorII */

        public bool StackASoundWaveII(string roomName, string OscIFrequency, string OscIType, bool updateConnectionsBool)
        {


            Clients.Group(roomName).stackSoundWavePointerII(OscIFrequency, OscIType, updateConnectionsBool);
            Clients.Group(roomName).updateConnectionsPointer();
            Clients.Group(roomName).saveWaveBucketPointerII();
            Clients.Group(roomName).updateWaveBucketDisplayPointerII();
            Clients.Group(roomName).updateOscillatorDisplayPointerII();

            return true;
        }

        public bool RemoveLastSoundII(string roomName)
        {
            Clients.Group(roomName).waveRemoverPointerII();
            Clients.Group(roomName).saveWaveBucketPointerII();
            Clients.Group(roomName).updateWaveBucketDisplayPointerII();
            //Clients.Group(roomName).updateConnectionsPointer();
            //Clients.Group(roomName).updateOscillatorDisplayPointer();

            return true;
        }

        /* LFO II */

        public bool ActivateLFOII(string roomName, string LfoFreq, string LfoScale, string LfoType)
        {
            Clients.Group(roomName).lfoActivatorPointerII(LfoFreq, LfoScale, LfoType);
            Clients.Group(roomName).updateConnectionsPointer();
            Clients.Group(roomName).updateLfoDisplayPointerII();

            return true;
        }

        public bool DeactivateLFOII(string roomName)
        {
            Clients.Group(roomName).lfoDeactivatorPointerII();
            Clients.Group(roomName).updateConnectionsPointer();
            Clients.Group(roomName).updateLfoDisplayPointerII();

            return true;
        }


        /* BiQuadFilter II */

        public bool ChangeFilterTypeTwo(string roomName, string type)
        {
            Clients.Group(roomName).changeFilterTypeTwoPointer(type);
            Clients.Group(roomName).updateBiquadFilterIIDisplayPointer();


            return true;
        }

        public bool ChangeFilterFrequencyTwo(string roomName, string frequency)
        {
            Clients.Group(roomName).changeFilterFrequencyTwoPointer(frequency);
            Clients.Group(roomName).updateBiquadFilterIIDisplayPointer();

            return true;
        }

        public bool ChangeFilterQTwo(string roomName, string q)
        {
            Clients.Group(roomName).changeFilterQTwoPointer(q);
            Clients.Group(roomName).updateBiquadFilterIIDisplayPointer();

            return true;
        }

        public bool ChangeFilterGainTwo(string roomName, string gain)
        {
            Clients.Group(roomName).changeFilterGainTwoPointer(gain);
            Clients.Group(roomName).updateBiquadFilterIIDisplayPointer();

            return true;
        }

        /* Delay II */
        public bool ChangeDelayIITime(string roomName, string ms)
        {
            Clients.Group(roomName).changeDelayIITimePointer(ms);
            Clients.Group(roomName).updateDelayIIDisplayPointer();

            return true;
        }

        public bool ChangeDelayIIDryWet(string roomName, string ratio)
        {
            Clients.Group(roomName).changeDelayIIDryWetPointer(ratio);
            Clients.Group(roomName).updateDelayIIDisplayPointer();

            return true;
        }


        /* Master Controls */

        public bool ChangeMasterGain(string roomName, string volume)
        {
            Clients.Group(roomName).masterGainAdjusterPointer(volume);
            Clients.Group(roomName).updateEndControlDisplayPointer();

            return true;
        }


        public bool StopSession(string roomName)
        {
            Clients.Group(roomName).stopSessionPointer();
            Clients.Group(roomName).freezeBucketPointerI();
            Clients.Group(roomName).freezeBucketPointerII();
            Clients.Group(roomName).updateConnectionsPointer();
            Clients.Group(roomName).updateEndControlDisplayPointer();
            Clients.Group(roomName).updateWaveBucketDisplayPointerI();
            Clients.Group(roomName).updateWaveBucketDisplayPointerII();

            return true;
        }

        public bool PlaySession(string roomName)
        {
            Clients.Group(roomName).masterVolumeRunner();
            Clients.Group(roomName).compressorRunner();
            
            Clients.Group(roomName).startSessionPointer(); // must come first otherwise the session will not be flagged as started
            
           
            Clients.Group(roomName).startBucketPointerI(); // bucket activation must come before loading: NEW IMPLEMENTATION NEEDED
            Clients.Group(roomName).startBucketPointerII();

            Clients.Group(roomName).loadWaveBucketPointerI(); // LOAD BUCKET SHOULD STORE VALUE IN THE ARRAY AND NOT KICK OFF WAVES
            Clients.Group(roomName).loadWaveBucketPointerII();
         
            
            
            
            
            Clients.Group(roomName).updateWaveBucketDisplayPointerI();
            Clients.Group(roomName).updateWaveBucketDisplayPointerII();

            Clients.Group(roomName).lfoIRunner();
            Clients.Group(roomName).lfoIIRunner();

            Clients.Group(roomName).filterIRunner();
            Clients.Group(roomName).filterIIRunner();

            Clients.Group(roomName).delayIRunner();
            Clients.Group(roomName).delayIIRunner();

            Clients.Group(roomName).masterVolumeRunner();


            Clients.Group(roomName).updateEndControlDisplayPointer();

           // Clients.Group(roomName).updateCompressorDisplayPointer();
           // Clients.Group(roomName).updateLfoDisplayPointerI();
           // Clients.Group(roomName).updateLfoDisplayPointerII();
           // Clients.Group(roomName).updateOscillatorDisplayPointerI();
           // Clients.Group(roomName).updateOscillatorDisplayPointerII();
           // Clients.Group(roomName).updateBiquadFilterIDisplayPointer();
           // Clients.Group(roomName).updateBiquadFilterIIDisplayPointer();

           // Clients.Group(roomName).updateConnectionsPointer();

            return true;
        }

       


        /* Compressor */

        public bool AdjustCompRatio(string roomName, string ratio)
        {
            Clients.Group(roomName).compRatioAdjusterPointer(ratio);

            Clients.Group(roomName).updateCompressorDisplayPointer();

            return true;

        }

        public bool AdjustCompKnee(string roomName, string knee)
        {
            Clients.Group(roomName).compKneeAdjusterPointer(knee);
            Clients.Group(roomName).updateCompressorDisplayPointer();

            return true;

        }
        

        public bool AdjustCompThreshold(string roomName, string threshold)
        {
            Clients.Group(roomName).compThresholdAdjusterPointer(threshold);
            Clients.Group(roomName).updateCompressorDisplayPointer();

            return true;

        }

        

      
        
    }

   
}