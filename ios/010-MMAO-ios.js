require('../setup');

const wd = require("wd"),
    actions = require('../actions'),
    _shared = require('../shared/login-ios');

wd.addPromiseChainMethod('swipe', actions.swipe);

const opts = {
    port: 4723
};

const desired = require('../desired').ios;

describe("MMAO - une contre offre", function () {
    this.timeout(300000);
    let driver;
    let allPassed = false;

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

    it("Envoyer et refuser/accepter un contre offre part1: proposer MMAO", function (done) {
        _shared.methods.searchTestProd(driver, '5734324')
            .elementByAccessibilityId("like product")
            .should.eventually.exist
            .elementByAccessibilityId("share product")
            .should.eventually.exist
            .swipe({
                startX: 400,
                startY: 600,
                endX: 200,
                endY: 200,
                duration: 1000
            })
            .elementByAccessibilityId("MAKE AN OFFER")
            .should.eventually.exist
            .click()
            .hasElementByAccessibilityId('Negotiations')
            .then(function (exist) {
                if (exist) {
                    return driver.elementByAccessibilityId('Negotiations')
                        .should.eventually.exist
                        .elementByAccessibilityId("cross")
                        .should.eventually.exist
                        .click()
                }
                else
                    return driver
            })
            .waitForElementByXPath("//XCUIElementTypeNavigationBar[@name=\"Negotiating area\"]", 2000)
            .should.eventually.exist
            .elementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[1]/XCUIElementTypeImage")
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeStaticText[starts-with(@name, "Starting price:")]')
            .should.eventually.exist
            .then(function (element) {
                return element.getAttribute('value');
            })
            .then(function (value) {
                var productPrice = parseFloat(value.substring('Starting price: '.length, value.length - 2));
                console.log('PRICE ************ : ', productPrice, productPrice * 0.6);
                return driver
                    .elementByXPath('//XCUIElementTypeTextField[@name="mmao-offer-textfield"]')
                    .should.eventually.exist
                    .sendKeys(productPrice * 0.6);
            })
            .waitForElementByAccessibilityId("CONFIRM", 1000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("bar_notif_error", 1000)
            .should.eventually.exist
            .sleep(1000)
            .elementByXPath('//XCUIElementTypeStaticText[starts-with(@name, "Starting price:")]')
            .should.eventually.exist
            .then(function (element) {
                return element.getAttribute('value');
            })
            .then(function (value) {
                var productPrice = parseFloat(value.substring('Starting price: '.length, value.length - 2));
                console.log('PRICE ************ : ', productPrice, productPrice * 0.7);
                return driver
                    .elementByXPath('//XCUIElementTypeTextField[@name="mmao-offer-textfield"]')
                    .should.eventually.exist
                    .clear()
                    .sendKeys(productPrice * 0.7);
            })
            .waitForElementByAccessibilityId("CONFIRM", 1000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("Your offer has been sent. The seller has 2 days to respond.", 2000)
            .should.eventually.exist
            .elementByAccessibilityId("Offer sent")
            .should.eventually.exist
            .nodeify(done);
    });

    it("Envoyer et refuser/accepter un contre offre part2: contre offre", function (done) {
        _shared.methods.shouldLogin(driver, 'ngoc.le+3@vestiairecollective.com', '09051989')
        // driver
            .waitForElementByXPath("//XCUIElementTypeButton[@name=\"Notifications\"]", 2000)
            .should.eventually.exist
            .click()
            .hasElementByAccessibilityId("You have received an offer for your item")
            .then(function (exist) {
                if (exist)
                    return driver.elementByAccessibilityId("You have received an offer for your item")
                        .should.eventually.exist
                        .sleep(500)
                else
                    return driver;
            })
            .waitForElementByAccessibilityId('Me', 2000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("My items", 2000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeStaticText[@name="Offers received (1)"]', 2000)
            .should.eventually.exist
            .click()
            .hasElementByAccessibilityId("cross")
            .then(function (exist) {
                if (exist)
                    return driver.elementByAccessibilityId("cross")
                        .click()
                        .sleep(500);
                else
                    return driver.sleep(500);
            })
            .waitForElementByAccessibilityId("icon-mmao-timer")
            .should.eventually.exist
            .elementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell")
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("ACCEPT",2000)
            .should.eventually.exist
            .elementByAccessibilityId("DECLINE")
            .should.eventually.exist
            .elementByAccessibilityId("MAKE A COUNTER OFFER")
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("Your offer:", 1000)
            .should.eventually.exist
            .sleep(1000)
            .waitForElementByXPath('//XCUIElementTypeStaticText[starts-with(@name, "Starting price:")]', 1000)
            .then(function (element) {
                return element.getAttribute('value');
            })
            .then(function (value) {
                var productPrice = parseFloat(value.substring('Starting price: '.length, value.length - 2));
                console.log('PRICE ************ : ', productPrice, productPrice - 1);
                return driver
                    .waitForElementByXPath('//XCUIElementTypeTextField[@value="Amount of the offer"]',5000)
                    .sendKeys(productPrice - 1);
            })
            .sleep(1500)
            .waitForElementByAccessibilityId("CONFIRM", 1000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("bar_notif_confirm", 1000)
            .should.eventually.exist
            .elementByAccessibilityId("Offers received")
            .should.eventually.exist
            .click()
            .waitForElementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell", 2000)
            .should.eventually.exist
            .elementByAccessibilityId("Offer sent")
            .should.eventually.exist
            .nodeify(done);
    });

    it("Envoyer et refuser/accepter un contre offre part3: Accepte", function (done) {
        _shared.methods.shouldLogin(driver, 'ngoc.le+4@vestiairecollective.com', '002299')
            .waitForElementByXPath("//XCUIElementTypeButton[@name=\"Notifications\"]", 2000)
            .should.eventually.exist
            .click()
            .hasElementByXPath("(//XCUIElementTypeStaticText[@name=\"You have received an offer for your item\"])[1]")
            .then(function (exist) {
                if (exist)
                    return driver.elementByXPath("(//XCUIElementTypeStaticText[@name=\"You have received an offer for your item\"])[1]")
                        .should.eventually.exist
                        .sleep(500)
                else
                    return driver;
            })
            .should.eventually.exist
            .waitForElementByAccessibilityId('Me', 1000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("My items", 2000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeStaticText[@name="Offers received (1)"]', 2000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell/XCUIElementTypeImage[1]", 2000)
            .should.eventually.exist
            .elementByAccessibilityId("icon-mmao-timer")
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Offer sent', 1000)
            .should.eventually.exist
            .elementByAccessibilityId("DECLINE")
            .should.eventually.exist
            .elementByAccessibilityId("MAKE A COUNTER OFFER")
            .should.eventually.exist
            .elementByAccessibilityId("ACCEPT")
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("bar_notif_confirm", 2000)
            .should.eventually.exist
            .elementByAccessibilityId("Buy now")
            .isEnabled()
            .should.eventually.be.true
            .nodeify(done);
    });
    it("Envoyer et refuser/accepter un contre offre part4: Confirmation", function (done) {
        _shared.methods.shouldLogin(driver, 'ngoc.le+3@vestiairecollective.com', '09051989')
            .waitForElementByXPath("//XCUIElementTypeButton[@name=\"Notifications\"]", 1000)
            .should.eventually.exist
            .click()
            .hasElementByAccessibilityId("Congratulations ! Your offer has been accepted")
            .then(function (exist) {
                if (exist)
                    return driver.elementByAccessibilityId("Congratulations ! Your offer has been accepted")
                        .should.eventually.exist
                        .sleep(500)
                else
                    return driver;
            })
            .waitForElementByAccessibilityId('Me', 1000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("My items", 2000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeStaticText[@name="Offers received (1)"]', 2000)
            .should.eventually.exist
            .click()
            .elementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell")
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeStaticText[starts-with(@name, "Your offer has been accepted.")]')
            .should.eventually.exist
            .nodeify(done);
    });
});

