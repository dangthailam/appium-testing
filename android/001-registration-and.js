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
    it("Inscrire avec l'email incorrect", function (done) {
        driver.elementById("fr.vestiairecollective:id/btn_connect_vestiaire")
            .should.eventually.exist
            .click()
            .waitForElementById("fr.vestiairecollective:id/btn_forgotten_password", 5000)
            .should.eventually.exist
            .click()
            .waitForElementById('fr.vestiairecollective:id/text_title_forgotten_password', 5000)
            .should.eventually.exist
            .elementById('fr.vestiairecollective:id/edit_forgotten_password_email')
            .should.eventually.exist
            .sendKeys("ngoc.le+12@vestiairecollective.com")
            .sleep(1000)
            .elementById("fr.vestiairecollective:id/btn_request_forgotten_password")
            .should.eventually.exist
            .click()
            .sleep(1000)
            .hasElementById("android:id/alertTitle")
            .then(function (exist) {
                if (exist)
                    return driver.elementById("android:id/alertTitle")
                        .should.eventually.exist
                        .elementById('android:id/button1')
                        .click()
                        .waitForElementById('fr.vestiairecollective:id/btn_forgotten_password', 5000)
                        .should.eventually.exist;
                else
                    return driver.elementById('android:id/message')
                        .should.eventually.exist
                        .elementById('android:id/button1')
                        .click()
                        .waitForElementById('fr.vestiairecollective:id/btn_forgotten_password', 5000)
                        .should.eventually.exist;
            })

            .nodeify(done);
    });
});