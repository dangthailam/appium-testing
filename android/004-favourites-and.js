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

    it("Ajouter ou enlever un produit dans mes coups de coeur", function (done) {
        _shared.methods.shouldLogin(driver, 'ngoc.le+7@vestiairecollective.com', '09051989')
            .elementByXPath('//*[@resource-id="fr.vestiairecollective:id/product_list_item"]')
            .should.eventually.exist
            .click()
            .elementByXPath('//*[@resource-id="fr.vestiairecollective:id/like_img"]')
            .should.eventually.exist
            .hasElementByAccessibilityId("This item has been added to your favourites")
           // Ve hoi chong
            .nodeify(done);

    });
});