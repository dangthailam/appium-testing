require('../setup');

const wd = require("wd");

const opts = {
    port: 4723
};
const desired = {
    "platformName": "Android",
    "platformVersion": "8.0",
    "deviceName": "Android Emulator",
    "app": "C:/appium/appium-testing/app-prod-debug.apk",
    "automationName": "UiAutomator2",
    "appWaitActivity": "*.LoginActivity"
};

describe("Identification user", function() {
    this.timeout(300000);
    let driver;
    let passed = false;

    before(function() {
        driver = wd.promiseChainRemote(opts);
        require("../logging").configure(driver);
        return driver
            .init(desired);
    });

    after(function() {
        if(!passed){
            console.log("not passed");
        }
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
            .sleep(1000)
            .elementById("fr.vestiairecollective:id/edit_login_username")
            .should.eventually.exist
            .sendKeys("lebichngoc090589@gmai")
            .elementById("fr.vestiairecollective:id/edit_login_password")
            .should.eventually.exist
            .sendKeys("09051989")
            .elementById("fr.vestiairecollective:id/btn_connect_from_vestiaire")
            .should.eventually.exist
            .click()
            .sleep(4000)
            .elementById("fr.vestiairecollective:id/img_home")
            .should.eventually.not.exist
            .elementById("fr.vestiairecollective:id/badge_icon_button")
            .should.eventually.not.exist
            .elementById("fr.vestiairecollective:id/animated_search")    
            .should.eventually.not.exist
            .elementById("fr.vestiairecollective:id/homeList") 
            .should.eventually.not.exist
            .elementById("fr.vestiairecollective:id/navigation") 
            .should.eventually.not.exist
            .nodeify(done);
            
    });
});