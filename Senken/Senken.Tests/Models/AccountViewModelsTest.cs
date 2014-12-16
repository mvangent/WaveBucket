using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Senken.Models;

namespace Senken.Tests.Models
{
    [TestClass]
    public class AccountViewModels
    {
        [TestMethod]
        public void ExternalLoginConfirmationModel()
        {
            ExternalLoginConfirmationViewModel elcv = new ExternalLoginConfirmationViewModel();

            // Act
            elcv.Email = "gaslamp@killer.com";

            // Assert

            Assert.AreEqual(elcv.Email, "gaslamp@killer.com");
        }

        [TestMethod]
        public void SendCodeViewModel()
        {
            SendCodeViewModel scvm = new SendCodeViewModel();

            // Act
            scvm.SelectedProvider = "XS4NOONE";

            // Assert

            Assert.AreEqual(scvm.SelectedProvider, "XS4NOONE");

            // Act
            scvm.ReturnUrl = "http://return.url";

            // Assert

            Assert.AreEqual(scvm.ReturnUrl, "http://return.url");

            // Act
            scvm.RememberMe = true;

            // Assert

            Assert.AreEqual(scvm.RememberMe, true);
        }

        [TestMethod]
        public void ExternalLoginListViewModel()
        {
            ExternalLoginListViewModel ellvm = new ExternalLoginListViewModel();

            // Act
            ellvm.ReturnUrl = "http://return.url";

            // Assert

            Assert.AreEqual(ellvm.ReturnUrl, "http://return.url");
        }

        [TestMethod]
        public void VerifyCodeViewModel()
        {
            VerifyCodeViewModel vcvm = new VerifyCodeViewModel();

            // Act
            vcvm.RememberBrowser = true;

            // Assert

            Assert.AreEqual(vcvm.RememberBrowser, true);

            // Act
            vcvm.RememberMe = true;

            // Assert

            Assert.AreEqual(vcvm.RememberMe, true);

            // Act
            vcvm.ReturnUrl = "http://return.url";

            // Assert

            Assert.AreEqual(vcvm.ReturnUrl, "http://return.url");

            // Act
            vcvm.Code = "string";

            // Assert

            Assert.AreEqual(vcvm.Code, "string");

            // Act
            vcvm.Provider = "string";

            // Assert

            Assert.AreEqual(vcvm.Provider, "string");

           
        }

    }
}
