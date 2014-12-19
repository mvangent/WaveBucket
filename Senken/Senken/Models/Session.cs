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
        /* primary key */
        public int SessionID { get; set; }
       
        /* user and sharing settings */
        public virtual ApplicationUser User_Id { get; set; }
        public bool UserIsOwner { get; set; }
        public bool OpenToEvolution { get; set; }
        
       
        public string Title { get; set; }
        public string ArtistAlias { get; set; }
        public Rating? Rating { get; set;}

        /* Compressor */
        public int CompressorRatio { get; set; }
        public int CompressorKnee { get; set; }
        public int CompressorThreshold { get; set; }

        /* Master Gain */
        public float MasterGain { get; set; }

        /* oscillator I */
        public float OscIFrequency { get; set; }
        public OscType OscIType { get; set;}

      /* wavebucket I (hiddenField) */
        public string hiddenWaveBucketI { get; set; }

       
        /* LFO I */
        public bool LFOIActive { get; set; }
        public float LFOIFrequency { get; set; }
        public float LFOIScale { get; set; }
        public LFOType LFOIType { get; set; }

        /* BiQuadFilterOne */
        public BiquadFilterType BiquadFilterTypeOne { get; set; }
        public float BiquadFilterFrequencyOne { get; set; }
        public float BiquadFilterQOne { get; set; }
        public float BiquadFilterGainOne { get; set; }

        
        
        
        /* oscillator II */
        public float OscIIFrequency { get; set; }
        public OscType OscIIType { get; set; }


        /* wavebucket II (hiddenField) */
        public string hiddenWaveBucketII { get; set; }

        /* LFO II */
        public bool LFOIIActive { get; set; }
        public float LFOIIFrequency { get; set; }
        public float LFOIIScale { get; set; }
        public LFOType LFOIIType { get; set; }
        
        /* BiQuadFilterTwo */
        public BiquadFilterType BiquadFilterTypeTwo { get; set; }
        public float BiquadFilterFrequencyTwo { get; set; }
        public float BiquadFilterQTwo { get; set; }
        public float BiquadFilterGainTwo { get; set; } 
        
       

        
        

      
    }
}