const wd = require("wd");
let driver;
const opts = {
    port: 4723
};
const desired = {
    platformName: "Android",
    platformVersion: "8.0",
    deviceName: "Android Emulator",
    app: "D:/Lam/projects/appium-test/app-prod-debug.apk",
    automationName: "UiAutomator2"
};


describe("Identification user", function() {
    before(function() {
        driver = wd.promiseChainRemote(opts);
        return driver
            .init(desired)
            .setImplicitWaitTimeout(3000);
    });

    it("Login with email and password", function() {
        console.log('login with email and password');
        driver
            .elementsByAndroidUIAutomator('new UiSelector().resourceId("fr.vestiairecollective:id/btn_connect_vestiaire")')
            .should.eventually.exist
            .click()
            .sleep(1000)
            .elementsByAndroidUIAutomator('new UiSelector().resourceId("fr.vestiairecollective:id/edit_login_username")')
            .should.eventually.exist
            .clear()
            .sendKeys("lebichngoc090589@gmail.com")
            .end();
    });
});