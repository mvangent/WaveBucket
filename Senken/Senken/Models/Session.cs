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
        public int frequency;
        public OscType type;

        public Wave(int frequency, OscType type)
        {
            this.frequency = frequency;
            this.type = type;
        }
    }

    public enum BiquadFilterType
    {
        lowpass, highpass, bandpass, lowshelf, highshelf, peaking, notch, allpass
    }

    public class Session
    {
       

        public int SessionID { get; set; }
        public string Title { get; set; }
        public int MusicianID { get; set; }
        public Rating? Rating { get; set;}

        /* oscillator I */
        public float OscIFrequency { get; set; }
        public OscType OscType { get; set;}
        
        /* LFO I */
        public float LFOIFrequency { get; set; }
        public float LFOIScale { get; set; }
        public LFOType LFOType { get; set; }

        public BiquadFilterType BiquadFilterTypeOne { get; set; }
        public float BiquadFilterFrequencyOne { get; set; }
        public float BiquadFilterQOne { get; set; }
        public float BiquadFilterGainOne { get; set; } 
        
        /* Compressor */
        public int CompressorRatio { get; set; }
        public int CompressorKnee { get; set; }
        public int CompressorThreshold { get; set; }

        /* Master Gain */
        public float MasterGain { get; set; }

        /* Wave bucket */
        public List<Wave> WaveBucket = new List<Wave>();
        
        public void addWave(int frequency, OscType form)
        {
           WaveBucket.Add(new Wave(frequency, form));
        }

        public void addWave(Wave wave)
        {
            WaveBucket.Add(wave);
        }

        public Wave getWave(int index)
        {
            return WaveBucket[index];
        }



        public virtual InstrumentSetup InstrumentSetup { get; set; }
        public virtual Musician Musician { get; set; }

    }
}