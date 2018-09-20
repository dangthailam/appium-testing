require('../setup');

const wd = require("wd"),
    actions = require('../actions'),
    _shared = require('../shared/login-and');

wd.addPromiseChainMethod('swipe', actions.swipe);

const opts = {
    port: 4723
};

const desired = require('../desired').android;

describe("MDP oublié", function () {
    this.timeout(300000);
    let driver;
    let allPassed = true;

    before(function () {
        driver = wd.promiseChainRemote(opts);
        require("../logging").configure(driver);
    });

    after(function () {
        if (!allPassed) {
            console.log("all tests passed");
        }
    });

    beforeEach(function () {
        return driver.init(desired);
    });

    afterEach(function () {
        allPassed = allPassed && this.currentTest.state === 'passed';
        return driver.quit();
    });
    it.skip("Inscrire avec l'email incorrect", function (done) {
        driver.elementById("fr.vestiairecollective:id/btn_create_account")
            .should.eventually.exist
            .click()
            .waitForElementById("fr.vestiairecollective:id/text_title_create_account", 5000)
            .should.eventually.exist
            .elementById('fr.vestiairecollective:id/edit_create_account_firstname')
            .sendKeys("Ngoc")
            .elementById('fr.vestiairecollective:id/edit_create_account_email')
            .sendKeys("ngoc@ksdkdsksdjk")
            .elementById("fr.vestiairecollective:id/edit_create_account_password")
            .sendKeys("09051989")
            .elementByXPath('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.FrameLayout/android.widget.ScrollView/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.Spinner/android.widget.TextView')
            .click()
            .waitForElementByXPath('/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.ListView/android.widget.TextView[2]', 5000)
            .should.eventually.exist
            .click()
            .waitForElementById('fr.vestiairecollective:id/btn_launch_create_account', 5000)
            .should.eventually.exist
            .click()
            .waitForElementById('fr.vestiairecollective:id/btn_launch_create_account', 5000)
            .should.eventually.exist
            .nodeify(done);
    });

    it.skip("Inscrire avec l'email déjà existé", function (done) {
        driver.elementById("fr.vestiairecollective:id/btn_create_account")
            .should.eventually.exist
            .click()
            .waitForElementById("fr.vestiairecollective:id/text_title_create_account", 5000)
            .should.eventually.exist
            .elementById('fr.vestiairecollective:id/edit_create_account_firstname')
            .sendKeys("Ngoc")
            .elementById('fr.vestiairecollective:id/edit_create_account_email')
            .sendKeys("ngoc+7@vestiairecollective.com")
            .elementById("fr.vestiairecollective:id/edit_create_account_password")
            .sendKeys("09051989")
            .elementByXPath('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.FrameLayout/android.widget.ScrollView/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.Spinner/android.widget.TextView')
            .click()
            .waitForElementByXPath('/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.ListView/android.widget.TextView[2]', 5000)
            .should.eventually.exist
            .click()
            .waitForElementById('fr.vestiairecollective:id/btn_launch_create_account', 5000)
            .should.eventually.exist
            .click()
            .waitForElementById('android:id/message', 5000)
            .should.eventually.exist
            .elementById('android:id/button1')
            .click()
            .waitForElementById('fr.vestiairecollective:id/btn_launch_create_account', 5000)
            .should.eventually.exist
            .nodeify(done);
    });

    it("Inscrire avec l'email correct", function (done) {
        driver.elementById("fr.vestiairecollective:id/btn_create_account")
            .should.eventually.exist
            .click()
            .waitForElementById("fr.vestiairecollective:id/text_title_create_account", 5000)
            .should.eventually.exist
            .elementById('fr.vestiairecollective:id/edit_create_account_firstname')
            .sendKeys("Ngoc")
            .elementById('fr.vestiairecollective:id/edit_create_account_email')
            .sendKeys('ngoc.le+' + Date.now() + '@vestiairecollective.com')
            .elementById("fr.vestiairecollective:id/edit_create_account_password")
            .sendKeys("09051989")
            .elementByXPath('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.FrameLayout/android.widget.ScrollView/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.Spinner/android.widget.TextView')
            .click()
            .waitForElementByXPath('/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.ListView/android.widget.TextView[2]', 5000)
            .should.eventually.exist
            .click()
            .waitForElementById('fr.vestiairecollective:id/btn_launch_create_account', 5000)
            .should.eventually.exist
            .click()


            

            .nodeify(done);
    });
});