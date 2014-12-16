using System;
using System.Text;
using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Senken.Models;

namespace Senken.Tests.Models
{
    /// <summary>
    /// Summary description for ManageViewModelsTest
    /// </summary>
    [TestClass]
    public class ManageViewModels
    {
      
        
        [TestMethod]
        public void IndexViewModel()
        {
            IndexViewModel ivm = new IndexViewModel();

            // act
            ivm.BrowserRemembered = true;

            // assert
            Assert.AreEqual(ivm.BrowserRemembered, true);

            // act
            ivm.HasPassword = true;

            // assert
            Assert.AreEqual(ivm.HasPassword, true);

            // act
            ivm.PhoneNumber = "0000";

            // assert
            Assert.AreEqual(ivm.PhoneNumber, "0000");

            // act
            ivm.TwoFactor = true;

            // assert
            Assert.AreEqual(ivm.TwoFactor, true);
        }
    

   

        [TestMethod]
        public void FactorViewModel()
        {
            FactorViewModel fvm = new FactorViewModel();
            
            // act
            fvm.Purpose = "goal";

            // assert
            Assert.AreEqual(fvm.Purpose, "goal");
        }
    

    

        [TestMethod]
        public void SetPasswordViewModel()
        {
            SetPasswordViewModel spvm = new SetPasswordViewModel();
            
            // act

            spvm.NewPassword = "password";

            // assert
            Assert.AreEqual(spvm.NewPassword, "password");

            // act

            spvm.ConfirmPassword = "password";

            // assert
            Assert.AreEqual(spvm.ConfirmPassword, "password");
        }


        [TestMethod]
        public void ChangePasswordViewModel()
        {
            ChangePasswordViewModel cpvm = new ChangePasswordViewModel();

            // act

            cpvm.NewPassword = "password";

            // assert
            Assert.AreEqual(cpvm.NewPassword, "password");

            // act

            cpvm.ConfirmPassword = "password";

            // assert
            Assert.AreEqual(cpvm.ConfirmPassword, "password");

            // act

            cpvm.OldPassword = "password";

            // assert
            Assert.AreEqual(cpvm.OldPassword, "password");
        }

        [TestMethod]
        public void AddPhoneNumberViewModel()
        {
            AddPhoneNumberViewModel apnvm = new AddPhoneNumberViewModel();
            
            // act
            apnvm.Number = "123456789";

            // assert

            Assert.AreEqual(apnvm.Number, "123456789");
        }

        [TestMethod]
        public void VerifyPhoneNumberViewModel()
        {
            VerifyPhoneNumberViewModel vpnvm = new VerifyPhoneNumberViewModel();

            // act
            vpnvm.PhoneNumber = "123456789";

            // assert

            Assert.AreEqual(vpnvm.PhoneNumber, "123456789");

            // act
            vpnvm.Code = "123456789";

            // assert

            Assert.AreEqual(vpnvm.Code, "123456789");
        }
    

 

        [TestMethod]
        public void ConfigureTwoFactorViewModel()
        {
            ConfigureTwoFactorViewModel ctfvm = new ConfigureTwoFactorViewModel();
            
            // act
            ctfvm.SelectedProvider = "provider";

            // assert
            Assert.AreEqual(ctfvm.SelectedProvider, "provider");
        }
    


    }
}
