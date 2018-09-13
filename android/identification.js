require('../setup');

const wd = require("wd");
// const addContext = require('mochawesome/addContext');
actions = require('../actions'),
    _shared = require('../shared/login-ios');

const opts = {
    port: 4723
};
wd.addPromiseChainMethod('swipe', actions.swipe);

const desired = require('../desired').android;


describe("Identification user", function () {
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

        it("Login with email and password", function (done) {
            driver.elementById("fr.vestiairecollective:id/btn_connect_vestiaire")
                .should.eventually.exist
                .click()
                .sleep(1000)
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
                .elementById("fr.vestiairecollective:id/img_home")
                .should.eventually.exist
                .elementById("fr.vestiairecollective:id/badge_icon_button")
                .should.eventually.exist
                .elementById("fr.vestiairecollective:id/animated_search")
                .should.eventually.exist
                .elementById("fr.vestiairecollective:id/homeList")
                .should.eventually.exist
                .elementById("fr.vestiairecollective:id/navigation")
                .should.eventually.exist
                .nodeify(done);

        });
    });