require('../setup');

const wd = require("wd");
// const addContext = require('mochawesome/addContext');
actions = require('../actions'),
    _shared = require('../shared/login-and');

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

    it("Connecter avec l'email et mdp vide", function (done) {
        driver
            .waitForElementById("fr.vestiairecollective:id/btn_connect_vestiaire",5000)
            .should.eventually.exist
            .click()
            .waitForElementById("fr.vestiairecollective:id/text_title_vestiaire_connect",5000)
            .should.eventually.exist
            .elementById('fr.vestiairecollective:id/edit_login_username')
            .should.eventually.exist
            .elementById('fr.vestiairecollective:id/edit_login_password')
            .elementById('fr.vestiairecollective:id/btn_connect_from_vestiaire')
            .click()
            .waitForElementById('fr.vestiairecollective:id/btn_connect_from_vestiaire',5000)
            .should.eventually.exist
            .nodeify(done);
    });
    it("Connecter avec l'email incorrect", function (done) {
        driver
        .waitForElementById("fr.vestiairecollective:id/btn_connect_vestiaire",5000)
        .should.eventually.exist
        .click()
        .waitForElementById("fr.vestiairecollective:id/text_title_vestiaire_connect",5000)
        .should.eventually.exist
        .elementById('fr.vestiairecollective:id/edit_login_username')
        .should.eventually.exist
        .sendKeys('ngigi@jjj')
        .elementById('fr.vestiairecollective:id/btn_connect_from_vestiaire')
        .click()
        .waitForElementById('fr.vestiairecollective:id/btn_connect_from_vestiaire',5000)
        .should.eventually.exist
        .nodeify(done);
    });
    it("Connecter avec mdp incorrect", function (done) {
        driver
            .waitForElementById("fr.vestiairecollective:id/btn_connect_vestiaire",5000)
            .should.eventually.exist
            .click()
            .waitForElementById("fr.vestiairecollective:id/text_title_vestiaire_connect",5000)
            .should.eventually.exist
            .elementById('fr.vestiairecollective:id/edit_login_username')
            .should.eventually.exist
            .sendKeys('ngoc.le+7@vestiairecollective.com')
            .elementById('fr.vestiairecollective:id/edit_login_password')
            .sendKeys('0988034')
            .elementById('fr.vestiairecollective:id/btn_connect_from_vestiaire')
            .click()
            .waitForElementById('fr.vestiairecollective:id/btn_connect_from_vestiaire',5000)
            .should.eventually.exist
            .nodeify(done);
    });
    it("Connecter avec email et mdp correct", function (done) {
        _shared.methods.shouldLogin(driver, 'ngoc.le+7@vestiairecollective.com', '09051989')
            .nodeify(done);
    });
});