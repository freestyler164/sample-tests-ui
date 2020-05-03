import Page from './page'
import utilities from "../_helpers/utilities";

class Home extends Page {

    get linkToRetail() {return  $('=Individual & SMSF investors')}
    async open() {
        await super.open('/au/portal/homepage.jsp')
        await utilities.waitForPageLoad(() => $('=Individual & SMSF investors').isExisting())
    }
}

export default new Home()