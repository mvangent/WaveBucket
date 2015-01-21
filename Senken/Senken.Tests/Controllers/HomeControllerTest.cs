using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Senken;
using Senken.Controllers;

namespace Senken.Tests.Controllers
{
    [TestClass]
    public class HomeControllerTest
    {
        [TestMethod]
        public void Index()
        {
            // Arrange
            HomeController controller = new HomeController();

            // Act
            ViewResult result = controller.Index() as ViewResult;

            // Assert
            Assert.AreEqual("Modify this template to jump-start your ASP.NET MVC application.", result.ViewBag.Message);
        }

        [TestMethod]
        public void About()
        {
            // Arrange
            HomeController controller = new HomeController();

            // Act
            ViewResult result = controller.About() as ViewResult;

            // Assert
            Assert.AreEqual("WaveBucket is a chatbox for sound waves. Grounded in modular, additive synthesizing, it offers a communal space for sound design and electronic music experiments. Realtime tweaking a synthesizer with your friends in seperate locations is" +
               " easy: You only need a web browser that supports audio synthesis,** create a new or join an existing public session, and you are good to go. Next to public jamming and sharing, WaveBucket also offers a private session mode, so that you can experiment with its wavestackers, filters, delays, " +
               "and lfo's just by yourself. Either way, have a good time!", result.ViewBag.Message);
        }

        [TestMethod]
        public void Contact()
        {
            // Arrange
            HomeController controller = new HomeController();

            // Act
            ViewResult result = controller.Contact() as ViewResult;

            // Assert
            Assert.AreEqual("Your contact page.", result.ViewBag.Message);
        }
    }
}
