import { Page, Locator } from "@playwright/test";
import loginLocatorX from "../locators/loginlocator.ts";
import verifyLocatorX from "../locators/verifylocator.ts"; // Assuming you have a verify locator file
// import * as dotenv from 'dotenv';
// import * as OTPAuth from "otpauth";

// const path = require('path')
// dotenv.config();


class LoginPage {

    page: Page;
    userIdInput: Locator;
    passwordInput: Locator;
    submitBtn: Locator;
    enterPasscode: Locator;
    verifyBtn: Locator;
    constructor(page) {
        this.page = page;
        this.userIdInput = this.page.locator(loginLocatorX.userid);
        this.passwordInput = this.page.locator(loginLocatorX.password);
        this.submitBtn = this.page.locator(loginLocatorX.btnActive);
        this.enterPasscode = this.page.locator(verifyLocatorX.enterPasscode);
        this.verifyBtn = this.page.locator(verifyLocatorX.verify);
    }

  async printfill(hiringInfo: any) {
        console.log("CSV:", hiringInfo);
  }

    async goto() {
        await this.page.goto("",{ waitUntil: 'domcontentloaded' });
        this.page.on('requestfailed', request => {
            console.log(`❌ Failed request: ${request.url()} - ${request.failure()?.errorText}`);
          });
    }
    
    async login(userId: string, password: string) {
        // let topt = new OTPAuth.TOTP({
        //     issuer: 'Playwright Practise',
        //     label: userId,  
        //     algorithm: 'SHA1',
        //     digits: 6,
        //     period: 30,
        //     secret: process.env.PASSCODE
        // });

        await this.page.waitForSelector(loginLocatorX.userid, { state: 'visible' });
        
        await this.userIdInput.fill(userId);
        await this.passwordInput.fill(password);
        await this.page.screenshot({ path: 'screenshots/login.png', fullPage: true });
        await this.submitBtn.click();

        // let token = topt.generate();
        // console.log("Generated OTP:", token);
        // await this.enterPasscode.fill(token);
        await this.verifyBtn.waitFor({ state: 'visible' });
   
        // await this.verifyBtn.click();
        


    }
}
export default LoginPage;