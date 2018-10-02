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

    it.skip("Recherche un produit", function (done) {
        _shared.methods.shouldLogin(driver, 'ngoc.le+7@vestiairecollective.com', '09051989')
            .waitForElementById('fr.vestiairecollective:id/animated_search', 5000)
            .should.eventually.exist
            .click()
            .waitForElementById('fr.vestiairecollective:id/search_src_text', 5000)
            .should.eventually.exist
            .sendKeys('Dior')
            .sleep(2000)
            // .elementByXPath('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.support.v7.widget.RecyclerView/android.widget.LinearLayout[1]/android.widget.TextView')
            .elementByXPath('//*[@resource-id="fr.vestiairecollective:id/categorySearchList"]/android.widget.LinearLayout[1]/android.widget.TextView')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//*[@resource-id="fr.vestiairecollective:id/product_list_item"]')
            .should.eventually.exist
            .elementByAccessibilityId("Navigate up")
            .should.eventually.exist
            .elementById("fr.vestiairecollective:id/product_list_filter")
            .should.eventually.exist
            .nodeify(done);

    });
    it("Filtre", function (done) {
        _shared.methods.shouldLogin(driver, 'ngoc.le+7@vestiairecollective.com', '09051989')
            // .then(function () {
            //     return _shared.methods.swipeBottomUpAndCheckIfElementExist(driver, "fr.vestiairecollective:id/product_discussion_comment_button", "Id");
            // })
            .sleep(5000)
            .swipe(200,500,200,700,2000)
            .click()
            // .waitForElementByXPath('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout/android.view.ViewGroup/android.widget.LinearLayout/android.view.ViewGroup/android.widget.TextView',5000)
            .waitForElementByXPath('//*[@resource-id="fr.vestiairecollective:id/product_list_item"]',5000)
            .should.eventually.exist
            .elementByAccessibilityId("Navigate up")
            .should.eventually.exist
            .elementById("fr.vestiairecollective:id/action_layout_show_cart")
            .should.eventually.exist
            .elementById("fr.vestiairecollective:id/product_list_filter")
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//*[@resource-id="fr.vestiairecollective:id/filter_recycler"]/android.widget.LinearLayout[1]/android.widget.TextView[1]',5000)
            .click()
            .waitForElementByXPath('//*[@resource-id="fr.vestiairecollective:id/tv_title"]',5000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//*[@resource-id="fr.vestiairecollective:id/title"]',5000)
            .should.eventually.exist
            .click()
            .waitForElementById("fr.vestiairecollective:id/filter_button", 5000)
            .click()
            .then(function () {
                return _shared.methods.swipeBottomUpAndCheckIfElementExist(driver, "fr.vestiairecollective:id/vacation_switch", "Id");
            })
            .should.eventually.exist
            .click()
            .waitForElementById('fr.vestiairecollective:id/filter_button', 5000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath("//XCUIElementTypeApplication[@name='Vestiaire']/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeCollectionView/XCUIElementTypeCell[1]/XCUIElementTypeOther/XCUIElementTypeOther", 5000)
            .should.eventually.exist
            .elementById("fr.vestiairecollective:id/product_list_alert")
            .should.eventually.exist
            .elementById("fr.vestiairecollective:id/product_list_filter")
            .should.eventually.exist
            // ("Vérification la page produit retourne au produit list à l'endroit de produit")
            // .swipe({
            //     startX: 200,
            //     startY: 600,
            //     endX: 200,
            //     endY: 200,
            //     duration: 1000
            // })
            // .elementByXPath(`//XCUIElementTypeCollectionView/XCUIElementTypeCell[@y > 0][1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeStaticText`)
            // .getValue()
            // .then(function (productName) {
            //     return driver.elementByXPath(`//XCUIElementTypeStaticText[@name="` + productName + `"]`)
            //         .click()
            //         .waitForElementByXPath(`//XCUIElementTypeButton[@name="New items"]`, 5000)
            //         .click()
            //         .hasElementByXPath(`//XCUIElementTypeStaticText[@name="` + productName + `"]`);
            // })
            // .should.eventually.be.true
            // .sleep(1000)
            .nodeify(done);
    });
});