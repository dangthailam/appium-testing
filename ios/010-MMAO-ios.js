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
    // let randomEmail;

    before(function () {
        driver = wd.promiseChainRemote(opts);

        // randomEmail = 'ngoc.le+' + Date.now() + '@vestiairecollective.com';

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

    // it.skip("En tant que l'Acheteur: Je propose 1 ere MMAO", function (done) {
    //     console.log(randomEmail);
    //     _shared.methods.shouldLogin(driver, randomEmail, '09051989', true)
    //         .then(function () {
    //             return _shared.methods.searchTestProd(driver, '5734324');
    //         })
    //         .elementByAccessibilityId("like product")
    //         .should.eventually.exist
    //         .elementByAccessibilityId("share product")
    //         .should.eventually.exist
    //         .swipe({
    //             startX: 400,
    //             startY: 600,
    //             endX: 200,
    //             endY: 200,
    //             duration: 1000
    //         })
    //         .elementByAccessibilityId("MAKE AN OFFER")
    //         .should.eventually.exist
    //         .click()
    //         .sleep(5000)
    //         .hasElementByAccessibilityId('tutorial_subtitle')
    //         .then(function (exist) {
    //             if (exist) {
    //                 return driver.elementByAccessibilityId('tutorial_subtitle')
    //                     .should.eventually.exist
    //                     .elementByAccessibilityId("cross")
    //                     .should.eventually.exist
    //                     .click()
    //             }
    //             else
    //                 return driver
    //         })
    //         .waitForElementByXPath("//XCUIElementTypeNavigationBar[@name=\"Negotiating area\"]", 2000)
    //         .should.eventually.exist
    //         .elementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[1]/XCUIElementTypeImage")
    //         .should.eventually.exist
    //         .elementByXPath('//XCUIElementTypeStaticText[starts-with(@name, "Starting price:")]')
    //         .should.eventually.exist
    //         .then(function (element) {
    //             return element.getAttribute('value');
    //         })
    //         .then(function (value) {
    //             var productPrice = parseFloat(value.substring('Starting price: '.length, value.length));
    //             console.log('PRICE ************ : ', productPrice, productPrice * 0.6);
    //             return driver
    //                 .elementByXPath('//XCUIElementTypeTextField[@name="mmao-offer-textfield"]')
    //                 .should.eventually.exist
    //                 .sendKeys(productPrice * 0.6);
    //         })
    //         .waitForElementByAccessibilityId("CONFIRM", 1000)
    //         .isEnabled()
    //         .should.eventually.be.false
    //         .sleep(1000)
    //         .elementByXPath('//XCUIElementTypeStaticText[starts-with(@name, "Starting price:")]')
    //         .should.eventually.exist
    //         .then(function (element) {
    //             return element.getAttribute('value');
    //         })
    //         .then(function (value) {
    //             var productPrice = parseFloat(value.substring('Starting price: '.length, value.length - 2));
    //             console.log('PRICE ************ : ', productPrice, productPrice * 0.7);
    //             return driver
    //                 .elementByXPath('//XCUIElementTypeTextField[@name="mmao-offer-textfield"]')
    //                 .should.eventually.exist
    //                 .clear()
    //                 .sendKeys(productPrice * 0.7);
    //         })
    //         .waitForElementByAccessibilityId("CONFIRM", 1000)
    //         .should.eventually.exist
    //         .click()
    //         .waitForElementByXPath('//XCUIElementTypeStaticText[starts-with(@name, "Your offer has been sent. The seller has ")]', 5000)
    //         .should.eventually.exist
    //         .elementByAccessibilityId("Offer sent")
    //         .should.eventually.exist
    //         .nodeify(done);
    // });

    // it.skip("En tant que Vendeur, je fais une contre offre", function (done) {
    //     _shared.methods.shouldLogin(driver, 'ngoc.le+3@vestiairecollective.com', '09051989')
    //         .waitForElementByXPath("//XCUIElementTypeButton[@name=\"Notifications\"]", 2000)
    //         .should.eventually.exist
    //         .click()
    //         .hasElementByAccessibilityId("You have received an offer for your item")
    //         .then(function (exist) {
    //             if (exist)
    //                 return driver.elementByAccessibilityId("You have received an offer for your item")
    //                     .should.eventually.exist
    //                     .sleep(500);
    //             else
    //                 return driver;
    //         })
    //         .waitForElementByAccessibilityId('Me', 2000)
    //         .should.eventually.exist
    //         .click()
    //         .waitForElementByAccessibilityId("My items", 2000)
    //         .should.eventually.exist
    //         .click()
    //         .waitForElementByXPath('//XCUIElementTypeStaticText[@name="Offers received (1)"]', 2000)
    //         .should.eventually.exist
    //         .click()
    //         .waitForElementByXPath('//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell', 5000)
    //         .should.eventually.exist
    //         .click()
    //         .sleep(2000)
    //         .hasElementByAccessibilityId('tutorial_subtitle')
    //         .then(function (exist) {
    //             if (exist) {
    //                 return driver.elementByAccessibilityId('tutorial_subtitle')
    //                     .should.eventually.exist
    //                     .elementByAccessibilityId("cross")
    //                     .should.eventually.exist
    //                     .click()
    //             }
    //             else
    //                 return driver;
    //         })
    //         .waitForElementByAccessibilityId("ACCEPT", 2000)
    //         .should.eventually.exist
    //         .elementByAccessibilityId("DECLINE")
    //         .should.eventually.exist
    //         .elementByAccessibilityId("MAKE A COUNTER-OFFER")
    //         .should.eventually.exist
    //         .click()
    //         // .waitForElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeOther[1]/XCUIElementTypeTextField',5000)
    //         // // .waitForElementByXPath('//XCUIElementTypeStaticText[starts-with(@name, "Starting price:")]', 1000)
    //         // // .then(function (element) {
    //         // //     return element.getAttribute('value');
    //         // // })
    //         // // .then(function (value) {
    //         // //     var productPrice = parseFloat(value.substring('Starting price: '.length, value.length - 2));
    //         // //     console.log('PRICE ************ : ', productPrice, productPrice - 1);
    //         // //     return driver
    //         // //         .waitForElementByXPath('//XCUIElementTypeTextField[@value="Amount of the offer"]',5000)
    //         // //         .sendKeys(productPrice - 1);
    //         // // })
    //         // .should.eventually.exist
    //         .waitForElementByAccessibilityId('4', 5000)
    //         .click()
    //         .elementByAccessibilityId('5')
    //         .click()
    //         .elementByAccessibilityId('0')
    //         .click()
    //         .elementByAccessibilityId('0')
    //         .click()
    //         .elementByAccessibilityId('send mmao')
    //         .should.eventually.exist
    //         .click()
    //         // .waitForElementByAccessibilityId("bar_notif_confirm", 5000)
    //         // .should.eventually.exist
    //         // .elementByAccessibilityId("Offers received")
    //         // .should.eventually.exist
    //         // .click()
    //         // .waitForElementByAccessibilityId("Offer sent", 5000)
    //         // .should.eventually.exist
    //         .waitForElementByXPath('//XCUIElementTypeStaticText[starts-with(@name, "Your counter offer has been sent. The buyer has ")]', 5000)
    //         .should.eventually.exist
    //         .nodeify(done);
    // });

    // it.skip("Envoyer et refuser/accepter un contre offre part3: Accepte", function (done) {
    //     console.log(randomEmail);
    //     _shared.methods.shouldLogin(driver, randomEmail, '09051989', false)
    //         .waitForElementByXPath("//XCUIElementTypeButton[@name=\"Notifications\"]", 2000)
    //         .should.eventually.exist
    //         .click()
    //         .hasElementByXPath("(//XCUIElementTypeStaticText[@name=\"You have received an offer for your item\"])[1]")
    //         .then(function (exist) {
    //             if (exist)
    //                 return driver.elementByXPath("(//XCUIElementTypeStaticText[@name=\"You have received an offer for your item\"])[1]")
    //                     .should.eventually.exist
    //                     .sleep(500);
    //             else
    //                 return driver;
    //         })
    //         .should.eventually.exist
    //         .waitForElementByAccessibilityId('Me', 5000)
    //         .should.eventually.exist
    //         .click()
    //         .waitForElementByAccessibilityId("My items", 5000)
    //         .should.eventually.exist
    //         .click()
    //         .waitForElementByXPath('//XCUIElementTypeStaticText[@name="Offers received (1)"]', 5000)
    //         .should.eventually.exist
    //         .click()
    //         .waitForElementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell/XCUIElementTypeImage[1]", 2000)
    //         .should.eventually.exist
    //         .elementByAccessibilityId("icon-mmao-timer")
    //         .should.eventually.exist
    //         .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell')
    //         .should.eventually.exist
    //         .click()
    //         .waitForElementByAccessibilityId('Offer sent', 5000)
    //         .should.eventually.exist
    //         .elementByAccessibilityId("DECLINE")
    //         .should.eventually.exist
    //         .elementByAccessibilityId("MAKE A COUNTER-OFFER")
    //         .should.eventually.exist
    //         .elementByAccessibilityId("ACCEPT")
    //         .should.eventually.exist
    //         .click()
    //         .waitForElementByAccessibilityId("bar_notif_confirm", 5000)
    //         .should.eventually.exist
    //         .elementByAccessibilityId("Buy now")
    //         .isEnabled()
    //         .should.eventually.be.true
    //         .nodeify(done);
    // });

    // it.skip("Envoyer et refuser/accepter un contre offre part4: Confirmation", function (done) {
    //     _shared.methods.shouldLogin(driver, 'ngoc.le+3@vestiairecollective.com', '09051989')
    //         .waitForElementByXPath("//XCUIElementTypeButton[@name=\"Notifications\"]", 1000)
    //         .should.eventually.exist
    //         .click()
    //         .hasElementByAccessibilityId("Congratulations ! Your offer has been accepted")
    //         .then(function (exist) {
    //             if (exist)
    //                 return driver.elementByAccessibilityId("Congratulations ! Your offer has been accepted")
    //                     .should.eventually.exist
    //                     .sleep(500)
    //             else
    //                 return driver;
    //         })
    //         .waitForElementByAccessibilityId('Me', 2000)
    //         .should.eventually.exist
    //         .click()
    //         .waitForElementByAccessibilityId("My items", 5000)
    //         .should.eventually.exist
    //         .click()
    //         .waitForElementByXPath('//XCUIElementTypeStaticText[@name="Offers received (1)"]', 5000)
    //         .should.eventually.exist
    //         .click()
    //         .elementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell")
    //         .should.eventually.exist
    //         .click()
    //         .waitForElementByXPath('//XCUIElementTypeStaticText[starts-with(@name, "Your offer has been accepted.")]')
    //         .should.eventually.exist
    //         .nodeify(done);
    // });

    it("En tant que l'Acheteur: Je propose 1ere MMAO", function (done) {
        _shared.methods.shouldLogin(driver, 'ngoc.le+4@vestiairecollective.com', '002299')
        // driver
        //     .waitForElementByAccessibilityId('Me', 2000)
            .then(function () {
                return _shared.methods.searchTestProd(driver, '5734324');
            })
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
            .sleep(5000)
            .hasElementByAccessibilityId('tutorial_subtitle')
            .then(function (exist) {
                if (exist) {
                    return driver.elementByAccessibilityId('tutorial_subtitle')
                        .should.eventually.exist
                        .elementByAccessibilityId("cross")
                        .should.eventually.exist
                        .click()
                }
                else
                    return driver
            })
            // get starting price tag
            .waitForElementByXPath('//XCUIElementTypeStaticText[starts-with(@name,"Starting price:")]')
            .should.eventually.exist
            .getAttribute('value')
            .then(function (value) {
                var productPrice = parseFloat(value.substring('Starting price: '.length, value.length));
                console.log('PRICE ************ : ', productPrice, productPrice * 0.6);
                return driver
                    .elementByXPath('//XCUIElementTypeOther[XCUIElementTypeButton[@name="send mmao"]]/XCUIElementTypeTextField')
                    .should.eventually.exist
                    .sendKeys(productPrice * 0.6)
                    .elementByAccessibilityId('send mmao')
                    .should.eventually.exist
                    .click()
                    .waitForElementByAccessibilityId('bar_notif_error', 5000)
                    .should.eventually.exist
                    .waitForElementByXPath('//XCUIElementTypeStaticText[starts-with(@name,"Starting price:")]')
                    .getAttribute('value');
            })
            .then(function (value) {
                var productPrice = parseFloat(value.substring('Starting price: '.length, value.length - 2));
                console.log('PRICE ************ : ', productPrice, productPrice * 0.7);
                return driver
                    .elementByXPath('//XCUIElementTypeOther[XCUIElementTypeButton[@name="send mmao"]]/XCUIElementTypeTextField')
                    .should.eventually.exist
                    .clear()
                    .sendKeys(productPrice * 0.7)
                    .elementByAccessibilityId('send mmao')
                    .should.eventually.exist
                    .click();
            })
            .waitForElementByXPath('//XCUIElementTypeStaticText[starts-with(@name, "Your offer has been sent. The seller has ")]', 5000)
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeStaticText[starts-with(@name, "Offer sent")]')
            .should.eventually.exist
            .nodeify(done);
    });
    it("En tant que Vendeur, je fais 1ere contre offre", function (done) {
        _shared.methods.shouldLogin(driver, 'ngoc.le+3@vestiairecollective.com', '09051989')
        // driver
        //     .waitForElementByAccessibilityId('Me', 2000)
            .waitForElementByXPath("//XCUIElementTypeButton[@name=\"Notifications\"]", 5000)
            .should.eventually.exist
            .click()
            .hasElementByAccessibilityId("You have received an offer for your item")
            .then(function (exist) {
                if (exist)
                    return driver.elementByAccessibilityId("You have received an offer for your item")
                        .should.eventually.exist
                        .sleep(500);
                else
                    return driver;
            })
            .waitForElementByAccessibilityId('Me', 2000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("My items", 2000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeStaticText[starts-with(@name, "Offers received")]', 2000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell', 5000)
            .should.eventually.exist
            .click()
            .sleep(2000)
            .hasElementByAccessibilityId('tutorial_subtitle')
            .then(function (exist) {
                if (exist) {
                    return driver.elementByAccessibilityId('tutorial_subtitle')
                        .should.eventually.exist
                        .elementByAccessibilityId("cross")
                        .should.eventually.exist
                        .click()
                }
                else
                    return driver;
            })
            .waitForElementByAccessibilityId("ACCEPT", 2000)
            .should.eventually.exist
            .elementByAccessibilityId("DECLINE")
            .should.eventually.exist
            .elementByAccessibilityId("MAKE A COUNTER-OFFER")
            .should.eventually.exist
            .click()
            .waitForElementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeOther[1]/XCUIElementTypeTextField", 5000)
            .should.eventually.exist
            .click()
            .sendKeys('4900')
            .elementByAccessibilityId('send mmao')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeStaticText[starts-with(@name, "Your counter offer has been sent. The buyer has ")]', 5000)
            .should.eventually.exist
            .nodeify(done);
    });
    it("En tant que l'Acheteur, je fais 2eme contre offre", function (done) {
        _shared.methods.shouldLogin(driver, 'ngoc.le+4@vestiairecollective.com', '002299')
            // .waitForElementByXPath('//XCUIElementTypeButton[@name="Notifications"]', 5000)
            // .should.eventually.exist
            // .click()
            // // vi sao lai tra ve false
            // .sleep(1000)
            // .hasElementByXPath('//XCUIElementTypeStaticText[starts-with(@name, "You have received an ")]')
            // .then(function (exist) {
            //     if (exist)
            //         return driver.elementByXPath('//XCUIElementTypeStaticText[starts-with(@name, "You have received an ")]')
            //             .should.eventually.exist
            //             .sleep(500);
            //     else
            //         return driver;
            // })
            .waitForElementByAccessibilityId('Me', 5000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Price offers sent', 5000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell', 5000)
            .should.eventually.exist
            .click()
            .sleep(5000)
            .hasElementByAccessibilityId('tutorial_subtitle')
            .then(function (exist) {
                if (exist) {
                    return driver.elementByAccessibilityId('tutorial_subtitle')
                        .should.eventually.exist
                        .elementByAccessibilityId("cross")
                        .should.eventually.exist
                        .click()
                }
                else
                    return driver
            })
            .waitForElementByAccessibilityId("MAKE A COUNTER-OFFER", 5000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeOther[XCUIElementTypeButton[@name="send mmao"]]/XCUIElementTypeTextField', 2000)
                    //.elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeOther[1]/XCUIElementTypeTextField')
            .sendKeys('4600')
            .elementByAccessibilityId('send mmao')
            .should.eventually.exist
            .click()
            .elementByXPath('//XCUIElementTypeStaticText[starts-with(@name, "Counter offer sent")]')
            .should.eventually.exist
            .nodeify(done);
    });
    it("En tant que Vendeur, je refuse", function (done) {
        _shared.methods.shouldLogin(driver, 'ngoc.le+3@vestiairecollective.com', '09051989')
            .waitForElementByXPath("//XCUIElementTypeButton[@name=\"Notifications\"]", 5000)
            .should.eventually.exist
            .click()
            .hasElementByAccessibilityId("You have received an offer for your item")
            .then(function (exist) {
                if (exist)
                    return driver.elementByAccessibilityId("You have received an offer for your item")
                        .should.eventually.exist
                        .sleep(500);
                else
                    return driver;
            })
            .waitForElementByAccessibilityId('Me', 2000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("My items", 2000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeStaticText[starts-with(@name, "Offers received")]', 2000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell', 5000)
            .should.eventually.exist
            .click()
            .sleep(2000)
            .hasElementByAccessibilityId('tutorial_subtitle')
            .then(function (exist) {
                if (exist) {
                    return driver.elementByAccessibilityId('tutorial_subtitle')
                        .should.eventually.exist
                        .elementByAccessibilityId("cross")
                        .should.eventually.exist
                        .click()
                }
                else
                    return driver;
            })
            .waitForElementByAccessibilityId("ACCEPT", 2000)
            .should.eventually.exist
            .elementByAccessibilityId("MAKE A COUNTER-OFFER")
            .should.eventually.exist
            .elementByAccessibilityId("DECLINE")
            .should.eventually.exist
            .click()
            // .waitForElementByXPath('//XCUIElementTypeStaticText[starts-with(@name, "Your counter offer has been sent. The buyer has ")]', 5000)
            // .should.eventually.exist
            .nodeify(done);
    });
    it("En tant que l'Acheteur, je fais la dernier contre offre", function (done) {
        _shared.methods.shouldLogin(driver, 'ngoc.le+4@vestiairecollective.com', '002299')
            // .waitForElementByXPath("//XCUIElementTypeButton[@name=\"Notifications\"]", 5000)
            // .should.eventually.exist
            // .click()
            // // vi sao lai tra ve false
            // .sleep(1000)
            // .hasElementByXPath('//XCUIElementTypeStaticText[starts-with(@name, "You have received an ")]')
            // .then(function (exist) {
            //     if (exist)
            //         return driver.elementByXPath('//XCUIElementTypeStaticText[starts-with(@name, "You have received an ")]')
            //             .should.eventually.exist
            //             .sleep(500);
            //     else
            //         return driver;
            // })
            .waitForElementByAccessibilityId('Me', 5000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Price offers sent', 5000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell', 5000)
            .should.eventually.exist
            .click()
            .sleep(5000)
            .hasElementByAccessibilityId('tutorial_subtitle')
            .then(function (exist) {
                if (exist) {
                    return driver.elementByAccessibilityId('tutorial_subtitle')
                        .should.eventually.exist
                        .elementByAccessibilityId("cross")
                        .should.eventually.exist
                        .click()
                }
                else
                    return driver
            })
            .waitForElementByAccessibilityId("MAKE A COUNTER-OFFER", 5000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeOther[XCUIElementTypeButton[@name="send mmao"]]/XCUIElementTypeTextField', 2000)
            //.elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeOther[1]/XCUIElementTypeTextField')
            .sendKeys('4600')
            .elementByAccessibilityId('send mmao')
            .should.eventually.exist
            .click()
            // .waitForElementByXPath('//XCUIElementTypeStaticText[starts-with(@name, "Your offer has been sent. The seller has ")]', 5000)
            // .should.eventually.exist
            .waitForElementByXPath('//XCUIElementTypeStaticText[starts-with(@name, "Counter offer sent")]',5000)
            .should.eventually.exist
            .nodeify(done);
    });
    it("En tant que Vendeur, je fais la derniere contre offre", function (done) {
        _shared.methods.shouldLogin(driver, 'ngoc.le+3@vestiairecollective.com', '09051989')
            // .waitForElementByXPath("//XCUIElementTypeButton[@name=\"Notifications\"]", 5000)
            // .should.eventually.exist
            // .click()
            // .hasElementByAccessibilityId("You have received an offer for your item")
            // .then(function (exist) {
            //     if (exist)
            //         return driver.elementByAccessibilityId("You have received an offer for your item")
            //             .should.eventually.exist
            //             .sleep(500);
            //     else
            //         return driver;
            // })
            .waitForElementByAccessibilityId('Me', 2000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("My items", 2000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeStaticText[starts-with(@name, "Offers received")]', 2000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell', 5000)
            .should.eventually.exist
            .click()
            .sleep(2000)
            .hasElementByAccessibilityId('tutorial_subtitle')
            .then(function (exist) {
                if (exist) {
                    return driver.elementByAccessibilityId('tutorial_subtitle')
                        .should.eventually.exist
                        .elementByAccessibilityId("cross")
                        .should.eventually.exist
                        .click()
                }
                else
                    return driver;
            })
            .waitForElementByAccessibilityId("ACCEPT", 2000)
            .should.eventually.exist
            .elementByAccessibilityId("DECLINE")
            .should.eventually.exist
            .elementByAccessibilityId("MAKE A COUNTER-OFFER")
            .should.eventually.exist
            .click()
            .waitForElementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeOther[1]/XCUIElementTypeTextField", 5000)
            .should.eventually.exist
            .click()
            .sendKeys('4900')
            .elementByAccessibilityId('send mmao')
            .should.eventually.exist
            .click()
            // .waitForElementByXPath('//XCUIElementTypeStaticText[starts-with(@name, "Your counter offer has been sent. The buyer has ")]', 5000)
            // .should.eventually.exist
            .nodeify(done);
    });
    it("En tant que l'Acheteur, je refuse", function (done) {
        _shared.methods.shouldLogin(driver, 'ngoc.le+4@vestiairecollective.com', '002299')
            // .waitForElementByXPath("//XCUIElementTypeButton[@name=\"Notifications\"]", 5000)
            // .should.eventually.exist
            // .click()
            // // vi sao lai tra ve false
            // .sleep(1000)
            // .hasElementByXPath('//XCUIElementTypeStaticText[starts-with(@name, "You have received an ")]')
            // .then(function (exist) {
            //     if (exist)
            //         return driver.elementByXPath('//XCUIElementTypeStaticText[starts-with(@name, "You have received an ")]')
            //             .should.eventually.exist
            //             .sleep(500);
            //     else
            //         return driver;
            // })
            .waitForElementByAccessibilityId('Me', 5000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Price offers sent', 5000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell', 5000)
            .should.eventually.exist
            .click()
            .sleep(5000)
            .hasElementByAccessibilityId('tutorial_subtitle')
            .then(function (exist) {
                if (exist) {
                    return driver.elementByAccessibilityId('tutorial_subtitle')
                        .should.eventually.exist
                        .elementByAccessibilityId("cross")
                        .should.eventually.exist
                        .click()
                }
                else
                    return driver
            })
            .waitForElementByAccessibilityId("DECLINE", 5000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeStaticText[starts-with(@name, "The negotiation is over. You can no longer make an offer.")]',5000)
            .should.eventually.exist
            .nodeify(done);
    });
});