class Utilities {
    async waitForPageLoad(condition){
        await browser.waitUntil(
            condition,
            {
                timeout: 10000,
                timeoutMsg: 'expected page did not load in 10s'
            }
        );
    }
}

export default new Utilities()