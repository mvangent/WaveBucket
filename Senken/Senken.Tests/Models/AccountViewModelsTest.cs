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

        [TestMethod]
        public void ForgotViewModel()
        {
            ForgotViewModel fvm = new ForgotViewModel();

            // Act
            fvm.Email = "gaslamp@kil.ler";

            // Assert

            Assert.AreEqual(fvm.Email, "gaslamp@kil.ler");
        }

        [TestMethod]
        public void LoginViewModel()
        {
            LoginViewModel lvm = new LoginViewModel();

            // Act
            lvm.Email = "gaslamp@kil.ler";

            // Assert

            Assert.AreEqual(lvm.Email, "gaslamp@kil.ler");

            // Act
            lvm.RememberMe = true;

            // Assert

            Assert.AreEqual(lvm.RememberMe, true);

            // Act
            lvm.Password = "password";

            // Assert

            Assert.AreEqual(lvm.Password, "password");
        }

        [TestMethod]
        public void RegisterViewModel()
        {
            RegisterViewModel rvm = new RegisterViewModel();

            // Act
            rvm.Password = "password";

            // Assert

            Assert.AreEqual(rvm.Password, "password");

            // Act
            rvm.ConfirmPassword = "password";

            // Assert

            Assert.AreEqual(rvm.ConfirmPassword, "password");

            // Act
            rvm.Email = "password@email.com";

            // Assert

            Assert.AreEqual(rvm.Email, "password@email.com");
        }

        [TestMethod]
        public void ResetPasswordViewModel()
        {
            ResetPasswordViewModel rpvm = new ResetPasswordViewModel();

            // Act
            rpvm.ConfirmPassword = "password";

            // Assert

            Assert.AreEqual(rpvm.ConfirmPassword, "password");

            // Act
            rpvm.Code = "password";

            // Assert

            Assert.AreEqual(rpvm.Code, "password");

            // Act
            rpvm.Password = "password";

            // Assert

            Assert.AreEqual(rpvm.Password, "password");

            // Act
            rpvm.Email = "password@email.com";

            // Assert

            Assert.AreEqual(rpvm.Email, "password@email.com");
        }

        [TestMethod]
        public void ForgotPasswordViewModel()
        {
            ForgotPasswordViewModel fpvm = new ForgotPasswordViewModel();

            // Act
            fpvm.Email = "emai@l.nl";

            // Assert

            Assert.AreEqual(fpvm.Email, "emai@l.nl");
        }

    }
}
