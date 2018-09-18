require('../setup');

const wd = require("wd"),
    Q = require('q'),
    actions = require('../actions'),
    _shared = require('../shared/login-ios');

wd.addPromiseChainMethod('swipe', actions.swipe);

const opts = {
    port: 4723
};

const desired = require('../desired').ios;

describe("Partie ME - My saved items", function () {
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
    it("ME - My saved items/My wishlist", function (done) {
        driver
            .waitForElementByXPath('//XCUIElementTypeButton[@name="Me"]', 4000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('My saved items', 5000)
            .should.eventually.exist
            .elementByAccessibilityId('My wishlist')
            .should.eventually.exist
            .click()
            .sleep(5000)
            .hasElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeCollectionView/XCUIElementTypeCell[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeImage')
            .then(function (exist) {
                if (exist)
                    return driver
                        .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeCollectionView/XCUIElementTypeCell[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeImage')
                        .should.eventually.exist
                        .click()
                        .waitForElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeCollectionView/XCUIElementTypeCell[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeImage', 5000)
                        .should.eventually.exist
                        .elementByAccessibilityId('My wishlist')
                        .should.eventually.exist
                        .click()
                        .waitForElementByXPath('(//XCUIElementTypeStaticText[starts-with(@name,"My Wishlist ")])', 2000)
                        .should.eventually.exist
                        .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeCollectionView/XCUIElementTypeCell[1]/XCUIElementTypeOther/XCUIElementTypeOther')
                        .should.eventually.exist;
                else
                    return driver
                        .elementByXPath('//XCUIElementTypeStaticText[@name="You currently have no items in your wishlist."]')
                        .should.eventually.exist;
            })
            .nodeify(done);
    });
    it("ME - My saved items/My favouristes", function (done) {
        driver
            .waitForElementByXPath('//XCUIElementTypeButton[@name="Me"]', 4000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('My saved items', 5000)
            .should.eventually.exist
            .elementByAccessibilityId('My favourites')
            .should.eventually.exist
            .click()
            .sleep(1000)
            .hasElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeCollectionView/XCUIElementTypeCell[1]/XCUIElementTypeOther/XCUIElementTypeOther')
            .then(function (exist) {
                if (exist)
                    return driver
                        .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeCollectionView/XCUIElementTypeCell[1]/XCUIElementTypeOther/XCUIElementTypeOther')
                        .should.eventually.exist
                        .click()
                        .waitForElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeTable/XCUIElementTypeCell[1]', 5000)
                        .should.eventually.exist
                        .elementByAccessibilityId('My favourites')
                        .should.eventually.exist
                        .click()
                        .waitForElementByXPath('(//XCUIElementTypeStaticText[starts-with(@name,"My Favourites ")])', 2000)
                        .should.eventually.exist
                        .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeCollectionView/XCUIElementTypeCell[1]/XCUIElementTypeOther/XCUIElementTypeOther')
                        .should.eventually.exist;
                else
                    return driver
                        .elementByXPath('//XCUIElementTypeStaticText[@name="You currently have no article among your favorites."]')
                        .should.eventually.exist;
            })
            .elementByXPath('(//XCUIElementTypeButton[@name="Me"])[1]')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeOther[@name="Me"]', 5000)
            .should.eventually.exist
            .nodeify(done);
    });
    it("ME - My saved items/My alerts/Price reductions I'm following", function (done) {
        driver
            .waitForElementByXPath('//XCUIElementTypeButton[@name="Me"]', 4000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('My saved items', 5000)
            .should.eventually.exist
            .elementByAccessibilityId('My alerts')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Price reductions I\'\m following', 5000)
            .should.eventually.exist
            .click()
            .sleep(2000)
            .hasElementByXPath('//XCUIElementTypeStaticText[@name="You are not following any price reductions at the moment."]')
            .then(function (exist) {
                if (exist)
                    return driver
                        .elementByXPath('//XCUIElementTypeStaticText[@name="You are not following any price reductions at the moment."]')
                        .should.eventually.exist;
                else
                    return driver
                        .waitForElementByXPath('//XCUIElementTypeOther[@name="Price reductions I\'\m following"]', 5000)
                        .should.eventually.exist
                        .elementByAccessibilityId('me alerts params')
                        .isEnabled()
                        .should.eventually.be.true
                        .elementByXPath('(//XCUIElementTypeButton[@name="More Info"])[1]')
                        .should.eventually.exist
                        .click()
                        .waitForElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeTable/XCUIElementTypeCell[1]', 5000)
                        .should.eventually.exist
                        .elementByAccessibilityId('Price reductions I\'\m following')
                        .should.eventually.exist
                        .click();
            })
            .waitForElementByAccessibilityId('My alerts', 5000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeOther[@name="My alerts"]', 5000)
            .should.eventually.exist
            .nodeify(done);
    });
    it("ME - My saved items/My alerts/Items I'm looking for", function (done) {
        driver
            .waitForElementByXPath('//XCUIElementTypeButton[@name="Me"]', 4000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('My saved items', 5000)
            .should.eventually.exist
            .elementByAccessibilityId('My alerts')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Items I\'\m looking for', 5000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeOther[@name="Items I\'\m looking for"]', 5000)
            .should.eventually.exist
            .elementByAccessibilityId('To avoid missing that special item when it comes online, you can choose the frequency of your alerts and how you receive them.')
            .should.eventually.exist
            .elementByAccessibilityId('Would you prefer:')
            .should.eventually.exist
            .elementByAccessibilityId('Every day, by e-mail')
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeButton[@name="unselected"])[1]')
            .should.eventually.exist
            .elementByAccessibilityId('Choose when and how you are contacted for each alert')
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeButton[@name="unselected"])[2]')
            .should.eventually.exist
            .hasElementByAccessibilityId('You are not looking for any products at the moment.')
            .then(function (exist) {
                if (exist)
                    return driver
                        .elementByAccessibilityId('You are not looking for any products at the moment.')
                        .should.eventually.exist;
                else
                    return driver
                        .waitForElementByXPath('(//XCUIElementTypeStaticText[starts-with(@name,"Alert created on")])', 5000)
                        .should.eventually.exist
                        .elementByXPath('(//XCUIElementTypeStaticText[starts-with(@name,"Received :")])')
                        .should.eventually.exist
                //         .elementByXPath('(//XCUIElementTypeImage[@name="edit_icon"])[1]')
                //         .should.eventually.exist
                //         .click()
                //         .waitForElementByAccessibilityId('Immediately, by e-mail', 5000)
                //         .should.eventually.exist
                //         .elementByAccessibilityId('Immediately, by mobile notification')
                //         .should.eventually.exist
                //         .elementByAccessibilityId('Immediately, by e-mail and mobile notification')
                //         .should.eventually.exist
                //         .elementByAccessibilityId('Every day by e-mail')
                //         .should.eventually.exist
                //         .elementByAccessibilityId('Delete this alert')
                //         .should.eventually.exist
            })

            .elementByAccessibilityId('My alerts')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeOther[@name="My alerts"]', 5000)
            .should.eventually.exist
            .nodeify(done);
    });
    it("ME - My saved items/My alerts/People I'm following", function (done) {
        driver
            .waitForElementByXPath('//XCUIElementTypeButton[@name="Me"]', 4000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('My saved items', 5000)
            .should.eventually.exist
            .elementByAccessibilityId('My alerts')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('People I\'\m following', 5000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeOther[@name="People I\'\m following"]', 5000)
            .should.eventually.exist
            .hasElementByAccessibilityId('Start building your community')
            .then(function (exist) {
                if (exist)
                    return driver
                        .elementByAccessibilityId('Start building your community')
                        .should.eventually.exist;
                else
                    return driver
                // BUG;
            })
            .elementByAccessibilityId('My alerts')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeOther[@name="My alerts"]')
            .should.eventually.exist
            .nodeify(done);
    });

});