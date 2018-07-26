require('../setup');

const wd = require("wd"),
    actions = require('../actions'),
    _shared = require('../shared/login-ios');

wd.addPromiseChainMethod('swipe', actions.swipe);

const opts = {
    port: 4723
};

const desired = require('../desired').ios;

describe("Paiement", function () {
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
    it("Paiment / Delivery adress", function (done) {
        driver.sleep(500)
            .waitForElementByAccessibilityId("btn-cart", 1000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("Cancel", 500)
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeStaticText[@name="Basket 2 items"]')
            .should.eventually.exist
            .elementByAccessibilityId('Edit')
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[1]')
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[2]')
            .should.eventually.exist
            .elementByAccessibilityId("2 items")
            .should.eventually.exist
            .elementByAccessibilityId("Total including taxes:")
            .should.eventually.exist
            .elementByAccessibilityId("COMPLETE MY ORDER")
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeNavigationBar[@name="Payment"]', 1000)
            .should.eventually.exist
            .elementByAccessibilityId("Option 1: home delivery 8,90 €")
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeOther[@name="Delivery addresses"]',500)
            .should.eventually.exist
            .elementByAccessibilityId("Set up a new address")
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeNavigationBar[@name="Enter address"]', 500)
            .should.eventually.exist
            .elementByAccessibilityId("Delivery addresses") // button back
            .should.eventually.exist
            .elementByAccessibilityId("Address name *")
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[1]/XCUIElementTypeTextField')
            .should.eventually.exist
            .sendKeys("ABC")
            .elementByAccessibilityId('Title *')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Mr', 500)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('First name *', 500)
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[3]/XCUIElementTypeTextField')
            .should.eventually.exist
            .sendKeys("LKJ")
            .sleep(500)
            .swipe({
                startX: 100,
                startY: 300,
                endX: 100,
                endY: 100,
                duration: 800
            })
            .elementByAccessibilityId('Surname *')
            .should.eventually.exist
            .sendKeys("BABY")
            .sleep(500)
            .swipe({
                startX: 100,
                startY: 300,
                endX: 100,
                endY: 100,
                duration: 800
            })
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[4]/XCUIElementTypeTextField')
            .should.eventually.exist
            .elementByAccessibilityId('Country *')
            .should.eventually.exist
            .click()
            .sleep(500)
            .swipe({
                startX: 100,
                startY: 300,
                endX: 100,
                endY: 100,
                duration: 800
            })
            .waitForElementByAccessibilityId("France", 500)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Address *', 500)
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[7]/XCUIElementTypeTextField')
            .should.eventually.exist
            .sendKeys('FGH')
            .sleep(500)
            .swipe({
                startX: 100,
                startY: 300,
                endX: 100,
                endY: 100,
                duration: 800
            })
            .elementByAccessibilityId('Zip Code *')
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[9]/XCUIElementTypeTextField')
            .should.eventually.exist
            .sendKeys('75001')
            .sleep(500)
            .swipe({
                startX: 100,
                startY: 300,
                endX: 100,
                endY: 100,
                duration: 800
            })
            .elementByAccessibilityId('City *')
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[10]/XCUIElementTypeTextField')
            .should.eventually.exist
            .sendKeys('ABC')
            .sleep(500)
            .swipe({
                startX: 100,
                startY: 300,
                endX: 100,
                endY: 100,
                duration: 800
            })
            .elementByAccessibilityId('Phone *')
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[11]/XCUIElementTypeTextField')
            .sendKeys('0123456')
            .sleep(500)
            .swipe({
                startX: 100,
                startY: 300,
                endX: 100,
                endY: 100,
                duration: 800
            })
            .elementByAccessibilityId("SAVE ADDRESS")
            .should.eventually.exist
            .click()
            .sleep(500)
            .hasElementByAccessibilityId('bar_notif_confirm')
            .then(function (exist) {
                if (exist) {
                    return driver.elementByAccessibilityId('bar_notif_confirm')
                    .sleep();
                }
                else
                    return driver.elementByAccessibilityId('bar_notif_error')
                    .sleep(3000)
                    .elementByAccessibilityId("Delivery addresses")
                    .should.eventually.exist
                    .click();
            })
            .waitForElementByXPath('(//XCUIElementTypeButton[@name="Edit"])[2]', 1000)
            .should.eventually.exist
            .elementByAccessibilityId('Phone *')
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[11]/XCUIElementTypeTextField')
            .sendKeys('0123456') // Dat function de sdt thay doi
            .elementByAccessibilityId("SAVE ADDRESS")
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('bar_notif_confirm', 2000)
            .should.eventually.exist
            .elementByAccessibilityId("Option 2: collection point delivery 8,90 € - Ensured by Colissimo")
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Choose a collection point', 500)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Payment', 500)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeNavigationBar[@name="Payment"]', 1000) 
            .should.eventually.exist
            .nodeify(done);
    });

    it.skip("Paiement / Code promotion", function (done) {
        driver.sleep(500)
            .waitForElementByAccessibilityId("btn-cart", 1000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("Cancel", 500)
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeStaticText[@name="Basket 2 items"]')
            .should.eventually.exist
            .elementByAccessibilityId('Edit')
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[1]')
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[2]')
            .should.eventually.exist
            .elementByAccessibilityId("2 items")
            .should.eventually.exist
            .elementByAccessibilityId("COMPLETE MY ORDER")
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeNavigationBar[@name="Payment"]', 1000)
            .should.eventually.exist
            .waitForElementByXPath('//XCUIElementTypeOther[@name="DISCOUNT"]', 500)
            .should.eventually.exist
            .elementByAccessibilityId("DELETE")
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("APPLY")
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[4]/XCUIElementTypeTextField')
            .should.eventually.exist
            //code invalide
            .sendKeys("00000000")
            .elementByAccessibilityId("APPLY")
            .click()
            .waitForElementByAccessibilityId('bar_notif_error', 500)
            .should.eventually.exist
            //code expiré
            .elementByAccessibilityId("Clear text")
            .click()
            .waitForElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[4]/XCUIElementTypeTextField', 500)
            .should.eventually.exist
            .sendKeys("ELIT")
            .elementByAccessibilityId("APPLY")
            .click()
            .waitForElementByAccessibilityId('bar_notif_error', 500)
            .should.eventually.exist
            //code article non compris
            .elementByAccessibilityId("Clear text")
            .click()
            .waitForElementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[4]/XCUIElementTypeTextField", 500)
            .should.eventually.exist
            .sendKeys("09121989")
            .elementByAccessibilityId("APPLY")
            .click()
            .waitForElementByAccessibilityId('bar_notif_error', 500)
            .should.eventually.exist
            //code montant minimum non atteint
            .elementByAccessibilityId("Clear text")
            .click()
            .waitForElementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[4]/XCUIElementTypeTextField", 500)
            .should.eventually.exist
            .sendKeys("19891989")
            .elementByAccessibilityId("APPLY")
            .click()
            .waitForElementByAccessibilityId('bar_notif_error', 500)
            .should.eventually.exist
            // code valide
            .elementByAccessibilityId("Clear text")
            .click()
            .waitForElementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[4]/XCUIElementTypeTextField", 500)
            .should.eventually.exist
            .sendKeys("09051989")
            .elementByAccessibilityId("APPLY")
            .click()
            .waitForElementByAccessibilityId('bar_notif_confirm', 500)
            .should.eventually.exist
            .nodeify(done);
    });
});