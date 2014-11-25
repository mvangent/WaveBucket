using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Senken.Models
{
     public enum Rating
        {
            A, B, C, D, E, F
        }

    public enum OscType
        {
           sine = 0, square = 1, triangle = 2, sawtooth = 3    
        }

    public enum LFOType
    {
        sine, square, triangle, sawtooth
    }
    
    public struct Wave {
        int frequency;
        OscType type;

        public Wave(int frequency, OscType type)
        {
            this.frequency = frequency;
            this.type = type;
        }
    }

    public class Session
    {
       

        public int SessionID { get; set; }
        public int InstrumentSetupID { get; set; }
        public int MusicianID { get; set; }
        public Rating? Rating { get; set;}

        /* oscillator I */
        public int OscIFrequency { get; set; }
        public OscType OscType { get; set;}
        


        /* LFO I */
        public int LFOIFrequency { get; set; }
        public int LFOIScale { get; set; }
        public LFOType LFOType { get; set; }

        /* Compressor */
        public int CompressorRatio { get; set; }
        public int CompressorKnee { get; set; }
        public int CompressorThreshold { get; set; }

        /* Master Gain */
        public int MasterGain { get; set; }

        /* Wave bucket */
        public List<int>WaveBucket { get; set; }
        
        public void addWave(int frequency, OscType form) {
          //  WaveBucket.Add(new Wave(frequency, form));
        }



        public virtual InstrumentSetup InstrumentSetup { get; set; }
        public virtual Musician Musician { get; set; }

    }
}