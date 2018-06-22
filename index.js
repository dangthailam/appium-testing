require('./setup');

const wd = require("wd");

const opts = {
    port: 4723
};
const desired = {
    "platformName": "Android",
    "platformVersion": "8.0",
    "deviceName": "Android Emulator",
    "app": "D:/Lam/projects/appium-test/app-prod-debug.apk",
    "automationName": "UiAutomator2",
    "appWaitActivity": "*.LoginActivity"
};


describe("Identification user", function() {
    this.timeout(300000);
    let driver;

    before(function() {
        driver = wd.promiseChainRemote(opts);
        require("./logging").configure(driver);
        return driver
            .init(desired)
            .setImplicitWaitTimeout(30000);
    });

    after(function() {
        return driver
            .quit()
            .finally(function() {
                console.log('finish');
            });
    });

    it("Login with email and password", function(done) {
        driver.elementById("fr.vestiairecollective:id/btn_connect_vestiaire")
            .should.eventually.exist
            .click()
            .elementById("fr.vestiairecollective:id/edit_login_username")
            .should.eventually.exist
            .sendKeys("lebichngoc090589@gmail.com")
            .elementById("fr.vestiairecollective:id/edit_login_password")
            .should.eventually.exist
            .sendKeys("09051989")
            .elementById("fr.vestiairecollective:id/btn_connect_from_vestiaire")
            .should.eventually.exist
            .click()
            .sleep(4000)
            .nodeify(done);
        // let el2 = await driver.elementById("fr.vestiairecollective:id/edit_login_username");
        // await el2.sendKeys("lebichngoc090589@gmail.com");

        // driver
        //     .elementsByAndroidUIAutomator('new UiSelector().resourceId("fr.vestiairecollective:id/btn_connect_vestiaire")')
        //     .click()
        //     .sleep(5000)
        //     .elementsByAndroidUIAutomator('new UiSelector().resourceId("fr.vestiairecollective:id/edit_login_username")')
        //     .clear()
        //     .sendKeys("lebichngoc090589@gmail.com")
        //     .sleep(10000);
    });
});