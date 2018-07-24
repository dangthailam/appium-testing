var swipeCounter = 0;

function shouldLogin(driver) {
    return verifyLoginState(driver)
        .waitForElementByAccessibilityId('btn-login', 2000)
        .click()
        .waitForElementByXPath('//XCUIElementTypeTable/XCUIElementTypeCell[2]/XCUIElementTypeTextField', 500)
        .sendKeys('ngoc.le+4@vestiairecollective.com')
        .elementByXPath('//XCUIElementTypeTable/XCUIElementTypeCell[3]/XCUIElementTypeSecureTextField')
        .sendKeys('002299')
        .elementByXPath('//XCUIElementTypeButton[@name="LOG IN"]')
        .should.eventually.exist
        .click()
        .waitForElementByXPath('//XCUIElementTypeButton[@name="Me"]', 5000)
        .click()
        .elementByXPath('//XCUIElementTypeStaticText[@name="VIEW MY PROFILE"]')
        .should.eventually.exist
        .elementByAccessibilityId("Home")
        .should.eventually.exist
        .click();
}

function verifyLoginState(driver) {
    return driver
        .waitForElementByXPath('//XCUIElementTypeButton[@name="Me"]', 4000)
        .should.eventually.exist
        .click()
        .swipe({
            startX: 100,
            startY: 600,
            endX: 100,
            endY: 100,
            duration: 800
        })
        .hasElementByXPath('//XCUIElementTypeCell[@name="cell-user-logout"]')
        .then(function (exist) {
            if (exist)
                return driver.elementByXPath('//XCUIElementTypeCell[@name="cell-user-logout"]')
                    .click()
                    .waitForElementByXPath('//XCUIElementTypeButton[@name="Me"]', 500)
                    .click().sleep(500);
            else
                return driver.sleep(500);
        });
}

function swipeBottomUpAndCheckIfElementExist(driver, query, queryType) {
    if (swipeCounter > 50) {
        throw "Element not found";
    }

    let hasElementMethod = 'hasElementBy' + queryType;
    let getElementMethod = 'elementBy' + queryType;

    swipeCounter++;

    return driver.swipe({
        startX: 100,
        startY: 500,
        endX: 100,
        endY: 100,
        duration: 800
    }).then(function () {
        return driver[hasElementMethod](query)
            .then(function (exist) {
                console.log(exist);
                if (exist) {
                    return driver[getElementMethod](query)
                        .then(function (element) {
                            return element.getLocation().then(function (loc) {
                                if (loc.y > 0 && loc.y < 500) {
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
function searchTestProd(driver) {
   return driver.sleep(500)
        .waitForElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeTextField', 1000)
        .click()
        .waitForElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTextField', 500)
        .should.eventually.exist
        .sendKeys('6009688' + '\n')
        .waitForElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeTable/XCUIElementTypeCell[1]', 500)
        .should.eventually.exist
        .elementByAccessibilityId("Vestiaire_Collective.VCProductDetailWrapperView")
        .should.eventually.exist;
}

exports.methods = {
    verifyLoginState,
    shouldLogin,
    swipeBottomUpAndCheckIfElementExist,
    searchTestProd
};