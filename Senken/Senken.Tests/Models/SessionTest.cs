using System;
using System.Web.Mvc;
using System.Text;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Senken;
using Senken.Models;


namespace Senken.Tests.Models
{
    [TestClass]
    public class SessionTest
    {
        [TestMethod]
        public void SessionID()
        {
            // Arrange
            Session session = new Session();

            // Act
            session.SessionID = 5;

            // Assert
            Assert.AreEqual(session.SessionID, 5);
        }



        [TestMethod]
        public void WaveBucketFilledBySpecs()
        {
            // Arrange
            Session session = new Session();

            Wave wave = new Wave(5, OscType.sine);

            // Act
            session.addWave(5, OscType.sine);


            // Assert
            Assert.AreEqual(session.getWave(0), wave);
        }


        [TestMethod]
        public void WaveBucketFilledByWaves()
        {
            // Arrange
            Session session = new Session();

            Wave wave = new Wave(5, OscType.sine);

            // Act
            session.addWave(wave);


            // Assert
            Assert.AreEqual(session.getWave(0), wave);
        }

        [TestMethod]
        public void SessionOscIFrequency()
        {
            // Arrange
            Session session = new Session();

            // Act
            session.OscIFrequency = 10;

            // Assert
            Assert.AreEqual(session.OscIFrequency, 10);
        }

        [TestMethod]
        public void OscIType()
        {
            // Arrange
            Session session = new Session();

            // Act
            session.OscIType = OscType.sine;

            // Assert
            Assert.AreEqual(session.OscIType, OscType.sine);

            // Act
            session.OscIType = OscType.square;

            // Assert
            Assert.AreEqual(session.OscIType, OscType.square);

            // Act
            session.OscIType = OscType.triangle;

            // Assert
            Assert.AreEqual(session.OscIType, OscType.triangle);

            // Act
            session.OscIType = OscType.sawtooth;

            // Assert
            Assert.AreEqual(session.OscIType, OscType.sawtooth);
        }

        [TestMethod]
        public void Lfo()
        {
            // Arrange
            Session session = new Session();

            // Act
            session.LFOIFrequency = 5;

            // Assert
            Assert.AreEqual(session.LFOIFrequency, 5);

            // Act
            session.LFOIScale = 2;

            // Assert
            Assert.AreEqual(session.LFOIScale, 2);

            // Act
            session.LFOIType = LFOType.sine;

            // Assert
            Assert.AreEqual(session.LFOIType, LFOType.sine);

            // Act
            session.LFOIType = LFOType.square;

            // Assert
            Assert.AreEqual(session.LFOIType, LFOType.square);

            // Act
            session.LFOIType = LFOType.triangle;

            // Assert
            Assert.AreEqual(session.LFOIType, LFOType.triangle);

            // Act
            session.LFOIType = LFOType.sawtooth;

            // Assert
            Assert.AreEqual(session.LFOIType, LFOType.sawtooth);

       

           
        }

        [TestMethod]
        public void Compressor()
        {
            // Arrange
            Session session = new Session();

            // Act
            session.CompressorKnee = 5;

            // Assert
            Assert.AreEqual(session.CompressorKnee, 5);

            // Act
            session.CompressorRatio = 20;

            // Assert
            Assert.AreEqual(session.CompressorRatio, 20);

            // Act
            session.CompressorThreshold = -5;

            // Assert
            Assert.AreEqual(session.CompressorThreshold, -5);

      


        }

        [TestMethod]
        public void BiQuadFilter()
        {
            // Arrange
            Session session = new Session();

            // Act
            session.BiquadFilterFrequencyOne = 23;

            // Assert
            Assert.AreEqual(session.BiquadFilterFrequencyOne, 23);

            // Act
            session.BiquadFilterGainOne = -10 ;

            // Assert
            Assert.AreEqual(session.BiquadFilterGainOne, -10);

            // Act
            session.BiquadFilterQOne = 2;

            // Assert
            Assert.AreEqual(session.BiquadFilterQOne, 2);

            // Act
            session.BiquadFilterTypeOne = BiquadFilterType.allpass;

            // Assert
            Assert.AreEqual(session.BiquadFilterTypeOne, BiquadFilterType.allpass);

            // Act
            session.BiquadFilterTypeOne = BiquadFilterType.bandpass;

            // Assert
            Assert.AreEqual(session.BiquadFilterTypeOne, BiquadFilterType.bandpass);
            // Act
            session.BiquadFilterTypeOne = BiquadFilterType.highpass;

            // Assert
            Assert.AreEqual(session.BiquadFilterTypeOne, BiquadFilterType.highpass);

            // Act
            session.BiquadFilterTypeOne = BiquadFilterType.highshelf;

            // Assert
            Assert.AreEqual(session.BiquadFilterTypeOne, BiquadFilterType.highshelf);

            // Act
            session.BiquadFilterTypeOne = BiquadFilterType.lowpass;

            // Assert
            Assert.AreEqual(session.BiquadFilterTypeOne, BiquadFilterType.lowpass);

            // Act
            session.BiquadFilterTypeOne = BiquadFilterType.lowshelf;

            // Assert
            Assert.AreEqual(session.BiquadFilterTypeOne, BiquadFilterType.lowshelf);

            // Act
            session.BiquadFilterTypeOne = BiquadFilterType.notch;

            // Assert
            Assert.AreEqual(session.BiquadFilterTypeOne, BiquadFilterType.notch);

            // Act
            session.BiquadFilterTypeOne = BiquadFilterType.peaking;

            // Assert
            Assert.AreEqual(session.BiquadFilterTypeOne, BiquadFilterType.peaking);
        }

        [TestMethod]
        public void MasterVolume()
        {
            // Arrange
            Session session = new Session();

            // Act
            session.MasterGain = 30;

            // Assert
            Assert.AreEqual(session.MasterGain, 30);
        }

        [TestMethod]
        public void MusicianDetails()
        {
            // Arrange
            Session session = new Session();

           

            // Act
            session.Title = "Session#1";

            // Assert
            Assert.AreEqual(session.Title, "Session#1");

            // Act
            session.ArtistAlias = "GaslampKiller";

            // Assert
            Assert.AreEqual(session.ArtistAlias, "GaslampKiller");


        }

       




    }





}
