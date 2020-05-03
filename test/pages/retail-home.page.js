import Page from './page'
import homePage from './home.page'
import utilities from "../_helpers/utilities";

class RetailHome extends Page {

    get linkToManagedFunds() {return  $('=Retail managed funds')}
    async open() {
        await homePage.open()
        await (await homePage.linkToRetail).click();
        await utilities.waitForPageLoad(() => $('=Retail managed funds').isExisting())
    }
}

export default new RetailHome()