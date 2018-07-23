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

    it("Envoyer et refuser/accepter un contre offre", function (done) {
        _shared.methods.shouldLogin(driver)
            .waitForElementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeTextField",500)
            .sendKeys(5734324)
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
            .waitForElementByAccessibilityId("Negotiations",500)
            .should.eventually.exist
            .elementByAccessibilityId("cross")
            .should.eventually.exist
            .click()
            .waitForElementByXPath("//XCUIElementTypeNavigationBar[@name=\"Negotiating area\"]",500)
            .should.eventually.exist
            .elementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[1]/XCUIElementTypeImage")
            .should.eventually.exist
            .elementByAccessibilityId("mmao-offer-textfield")
            .should.eventually.exist
            .sendKeys(".....") // Tim cach dien mot so =20% gia)
            .waitForElementByAccessibilityId("bar_notif_error",500)
            .should.eventually.exist
            .elementByAccessibilityId("mmao-offer-textfield")
            .should.eventually.exist
            .sendKeys(".....") // Offre > 70% gia
            .waitForElementByAccessibilityId("Your offer has been sent. The seller has 2 days to respond.",500)
            .should.eventually.exist
            .elementByAccessibilityId("Offer sent")
            .should.eventually.exist
            // Check gia offre cua nguoi mua > So dien "...."
            .elementByXPath('//XCUIElementTypeButton[@name="Me"]')
            .should.eventually.exist
            .click()
            .swipe({
                startX: 100,
                startY: 600,
                endX: 100,
                endY: 100,
                duration: 800
            }) 
            .elementByXPath('//XCUIElementTypeCell[@name="cell-user-logout"]')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeButton[@name="Me"]',500)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('btn-login', 1000)
            .click()
            .waitForElementByXPath('//XCUIElementTypeTable/XCUIElementTypeCell[2]/XCUIElementTypeTextField', 500)
            .sendKeys('ngoc.le+3@vestiairecollective.com')
            .elementByXPath('//XCUIElementTypeTable/XCUIElementTypeCell[3]/XCUIElementTypeSecureTextField')
            .sendKeys('09051989')
            .elementByXPath('//XCUIElementTypeButton[@name="LOG IN"]')
            .should.eventually.exist
            .click()
            .waitForElementByXPath("//XCUIElementTypeButton[@name=\"Notifications\"]",500)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("Vous avez reçu une offre de prix sur votre article.",500)
            .should.eventually.exist
            .elementByAccessibilityId('//XCUIElementTypeButton[@name="Me"]')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("Price offers sent",500)
            .should.eventually.exist
            .click()
            .waitForElementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell/XCUIElementTypeImage[1]",500)
            .should.eventually.exist
            .elementByAccessibilityId("icon-mmao-timer")
            .should.eventually.exist
            .elementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell")
            .should.eventually.exist
            .click()
            .hasElementByAccessibilityId("cross")
            .then(function (exist) {
                if (exist)
                    return driver.elementByAccessibilityId("cross")
                        .click()
                        .sleep(500)
                else
                    return driver.sleep(500);
            })
            .elementByAccessibilityId("ACCEPT")
            .should.eventually.exist
            .elementByAccessibilityId("Offer sent")
            .should.eventually.exist
            .elementByAccessibilityId("DECLINE")
            .should.eventually.exist
            .elementByAccessibilityId("MAKE A COUNTER OFFER")
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("Your offer:",500)
            .should.eventually.exist
            .elementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[2]/XCUIElementTypeOther[2]/XCUIElementTypeTextField")
            .should.eventually.exist
            .sendKeys() // Offre Gia - 20e
            .waitForElementByAccessibilityId("CONFIRM",500)
            .click()
            .waitForElementByAccessibilityId("bar_notif_confirm",500)
            .should.eventually.exist
            .elementByAccessibilityId("Offers received")
            .should.eventually.exist
            .click()
            .waitForElementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell",500)
            .should.eventually.exist
            .elementByAccessibilityId("Offer sent")
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeButton[@name="Me"]')
            .should.eventually.exist
            .click()
            .swipe({
                startX: 100,
                startY: 600,
                endX: 100,
                endY: 100,
                duration: 800
            }) 
            .elementByXPath('//XCUIElementTypeCell[@name="cell-user-logout"]')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeButton[@name="Me"]',500)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('btn-login', 1000)
            .click()
            .waitForElementByXPath('//XCUIElementTypeTable/XCUIElementTypeCell[2]/XCUIElementTypeTextField', 500)
            .sendKeys('ngoc.le+4@vestiairecollective.com')
            .elementByXPath('//XCUIElementTypeTable/XCUIElementTypeCell[3]/XCUIElementTypeSecureTextField')
            .sendKeys('002299')
            .elementByXPath('//XCUIElementTypeButton[@name="LOG IN"]')
            .should.eventually.exist
            .click()
            .waitForElementByXPath("//XCUIElementTypeButton[@name=\"Notifications\"]",500)
            .should.eventually.exist
            .click()
            .elementByXPath("(//XCUIElementTypeStaticText[@name=\"You have received an offer for your item\"])[1]")
            .should.eventually.exist
            .elementByAccessibilityId('//XCUIElementTypeButton[@name="Me"]')
            .should.eventually.exist
            .click()
            .elementByAccessibilityId("Price offers sent")
            .should.eventually.exist
            .click()
            .waitForElementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell/XCUIElementTypeImage[1]",500)
            .should.eventually.exist
            .elementByAccessibilityId("icon-mmao-timer")
            .should.eventually.exist
            .elementByAccessibilityId("Offer sent")
            .should.eventually.exist
            .elementByAccessibilityId("DECLINE")
            .should.eventually.exist
            .elementByAccessibilityId("MAKE A COUNTER OFFER")
            .should.eventually.exist
            .elementByAccessibilityId("ACCEPT")
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("bar_notif_confirm",500)
            .should.eventually.exist
            .elementByAccessibilityId("Buy now")
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("Cancel",500)
            .should.eventually.exist
            .click()
            .elementByXPath('//XCUIElementTypeButton[@name="Me"]')
            .should.eventually.exist
            .click()
            .swipe({
                startX: 100,
                startY: 600,
                endX: 100,
                endY: 100,
                duration: 800
            }) 
            .elementByXPath('//XCUIElementTypeCell[@name="cell-user-logout"]')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeButton[@name="Me"]',500)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('btn-login', 1000)
            .click()
            .waitForElementByXPath('//XCUIElementTypeTable/XCUIElementTypeCell[2]/XCUIElementTypeTextField', 500)
            .sendKeys('ngoc.le+3@vestiairecollective.com')
            .elementByXPath('//XCUIElementTypeTable/XCUIElementTypeCell[3]/XCUIElementTypeSecureTextField')
            .sendKeys('09051989')
            .elementByXPath('//XCUIElementTypeButton[@name="LOG IN"]')
            .should.eventually.exist
            .click()
            .waitForElementByXPath("//XCUIElementTypeButton[@name=\"Notifications\"]",500)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("Congratulations ! Your offer has been accepted.",500)
            .should.eventually.exist
            .elementByAccessibilityId('//XCUIElementTypeButton[@name="Me"]')
            .should.eventually.exist
            .click()
            .elementByAccessibilityId("Price offers sent")
            .should.eventually.exist
            .click()
            .waitForElementByXPath("//XCUIElementTypeStaticText[@name=\"You have no current negotiations.\"]",500)
            .should.eventually.exist
            .nodeify(done);
    });
});