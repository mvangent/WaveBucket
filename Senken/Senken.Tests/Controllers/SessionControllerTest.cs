using System.Web.Mvc;
using System.Text;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Senken;
using Senken.Controllers;

namespace Senken.Tests.Controllers
{
    [TestClass]
    public class SessionControllerTest
    {
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


        [TestMethod]
        public void Edit()
        {
            // Arrange
            SessionController controller = new SessionController();

            // Act
            ViewResult result = controller.Edit(1) as ViewResult;

            // Assert
            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void Details()
        {
            // Arrange
            SessionController controller = new SessionController();

            // Act
            ViewResult result = controller.Details(3) as ViewResult;

            // Assert
            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void Delete()
        {
            // Arrange
            SessionController controller = new SessionController();

            // Act
            ViewResult result = controller.Delete(2) as ViewResult;

            // Assert
            Assert.IsNotNull(result);
        }
    }
}
