import Page from './page'
import retailHome from './retail-home.page'
import utilities from "../_helpers/utilities";

class RetailManagedFunds extends Page {

    get dataListContainer() {return $('.dataListContainer')}
    get compareButton() { return $('#compareFunds')}
    get cashPlusCheckbox() {return $('[value="F0AUS05K30"]')}
    get propertySecuritiesIndexCheckbox() {return $('[value="F0AUS05F3X"]')}
    get floatingFooter() {return $('.floatingFooter h4')}

    async open() {
        await retailHome.open()
        await (await retailHome.linkToManagedFunds).click();
        await utilities.waitForPageLoad(() => $('.vuiDataTable').isExisting())
    }

    async clickProductCheckBox(productname){
        const productRow =  await $('tbody*='+productname);
        const productCheckbox = await productRow.$('.fundCompareChkBox');
        await productCheckbox.waitForClickable();
        await productCheckbox.click();
    }

    async getProductCheckBox(productname){
        const productRow =  await $('tbody*='+productname);
        return productRow.$('.fundCompareChkBox');
    }
}

export default new RetailManagedFunds()