const wd = require('wd');

var swipeCounter = 0;

function swipeBottomUpAndCheckIfElementExist(driver, query, queryType) {
    if (swipeCounter > 50) {
        throw "Element not found";
    }

    let hasElementMethod = 'hasElementBy' + queryType;
    let getElementMethod = 'elementBy' + queryType;

    swipeCounter++;

    return driver
        //.execute('mobile: scroll', { direction: 'down' })
        .swipe({ startX: 500, endX: 500, startY: 1000, endY: 350, duration: 1000 })
        .then(function () {
            return driver[hasElementMethod](query)
                .then(function (exist) {
                    console.log(exist);
                    if (exist) {
                        return driver[getElementMethod](query)
                            .then(function (element) {
                                return element.getLocation().then(function (loc) {
                                    console.log('location *********************', loc);
                                    if (loc.y > 0 && loc.y < 600) {
                                        return element;
                                    } else {
                                        return swipeBottomUpAndCheckIfElementExist(driver, query, queryType);
                                    }
                                });
                            });
                    } else {
                        return swipeBottomUpAndCheckIfElementExist(driver, query, queryType);
                    }
                });
        });
}

function shouldLogin(driver, login, password, registerWhenLoginFailed = false) {
    return driver
        .waitForElementById('fr.vestiairecollective:id/btn_connect_vestiaire', 5000)
        .click()
        .waitForElementById('fr.vestiairecollective:id/text_title_vestiaire_connect', 5000)
        .should.eventually.exist
        .elementById('fr.vestiairecollective:id/edit_login_username')
        .sendKeys(login)
        .elementById('fr.vestiairecollective:id/edit_login_password')
        .sendKeys(password)
        .elementById('fr.vestiairecollective:id/btn_connect_from_vestiaire')
        .click()
        .waitForElementById('fr.vestiairecollective:id/tab_me', 5000)
        .click()
        .waitForElementById('fr.vestiairecollective:id/cell_vacation', 5000)
        .should.eventually.exist
        .elementById("fr.vestiairecollective:id/tab_home")
        .should.eventually.exist
        .click();
    }

function searchTestProd(driver, productId) {
    return driver.sleep(500)
        .waitForElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeTextField', 2000)
        .click()
        .waitForElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTextField', 2000)
        .should.eventually.exist
        .sendKeys(productId + '\n')
        .waitForElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeTable/XCUIElementTypeCell[1]', 2000)
        .should.eventually.exist
        .elementByAccessibilityId("Vestiaire_Collective.VCProductDetailWrapperView")
        .should.eventually.exist;
}

exports.methods = {
    // verifyLoginState,
    shouldLogin,
    swipeBottomUpAndCheckIfElementExist,
    searchTestProd
};