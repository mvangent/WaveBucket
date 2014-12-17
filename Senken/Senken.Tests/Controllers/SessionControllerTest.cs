using System.Threading.Tasks;
using System.Web.Mvc;
using System.Text;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Senken;
using Senken.Controllers;
using Senken.Models;

namespace Senken.Tests.Controllers
{
    [TestClass]
    public class SessionControllerTest
    {
        // add mock database?

        [TestMethod]
        public void Index()
        {
            // Arrange
            SessionController controller = new SessionController();

            // Act
            ViewResult result = controller.Index() as ViewResult;

            // Assert
            Assert.AreEqual(result.ViewBag.Message, "Start anew or explore sessions");
        }

        [TestMethod]
        public void Create()
        {
            // Arrange
            SessionController controller = new SessionController();

            // Act
            ViewResult result = controller.Create() as ViewResult;

            // Assert
            Assert.IsNotNull(result);
        }

      
    }
}
