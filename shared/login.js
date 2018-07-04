function verifyLoginState(driver) {
    return driver.sleep(1000)
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
        .hasElementByXPath('//XCUIElementTypeCell[@name="cell-user-logout"]')
        .then(function (exist) {
            if (exist)
                return driver.elementByXPath('//XCUIElementTypeCell[@name="cell-user-logout"]')
                    .click()
                    .sleep(500)
                    .elementByXPath('//XCUIElementTypeButton[@name="Me"]')
                    .click()
                    .sleep(500)
                    .elementByAccessibilityId('btn-login');
            else
                return driver.elementByAccessibilityId('btn-login');
        })
        .click();
}

function shouldLogin(driver) {
    return verifyLoginState(driver)
        .sleep(500)
        .elementByXPath('//XCUIElementTypeTable/XCUIElementTypeCell[2]/XCUIElementTypeTextField')
        .sendKeys('lebichngoc090589@gmail.com')
        .elementByXPath('//XCUIElementTypeTable/XCUIElementTypeCell[3]/XCUIElementTypeSecureTextField')
        .sendKeys('09051989')
        .elementByXPath('//XCUIElementTypeButton[@name="LOG IN"]')
        .should.eventually.exist
        .click()
        .waitForElementByXPath('//XCUIElementTypeButton[@name="Me"]', 5000)
        .click()
        .elementByXPath('//XCUIElementTypeStaticText[@name="VIEW MY PROFILE"]')
        .should.eventually.exist;
}

exports.login = {
    verifyLoginState,
    shouldLogin
};