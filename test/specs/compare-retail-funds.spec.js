import retailManagedFunds from "../pages/retail-managed-funds.page"
import compareProducts from "../pages/compare-products.page"
import utilities from "../_helpers/utilities";

beforeEach(async () => {
    await retailManagedFunds.open();
})

describe('Compare retail funds', () => {
    it('compare button should not exist when no funds selected', async () => {
        await expect(await retailManagedFunds.dataListContainer).toBeExisting();
        await expect(await retailManagedFunds.compareButton).not.toBeExisting();
        await expect(await retailManagedFunds.floatingFooter).toHaveText("Select products for comparison");
    })
    it('compare button should exist when atleast one fund is selected', async () => {
        await retailManagedFunds.clickProductCheckBox("Vanguard Cash Plus Fund");
        await expect(await retailManagedFunds.compareButton).toBeExisting();
        const footer= await retailManagedFunds.floatingFooter
        await expect(await footer.getText()).toBe("1 Product(s) selected for comparison");
    })
    it('should be able to compare products', async () => {
        await retailManagedFunds.clickProductCheckBox("Vanguard Cash Plus Fund");
        await retailManagedFunds.clickProductCheckBox("Vanguard Diversified Bond Index Fund");
        await retailManagedFunds.clickProductCheckBox("Vanguard Australian Property Securities Index Fund");
        await retailManagedFunds.clickProductCheckBox("Vanguard Australian Shares Index Fund");
        await (await retailManagedFunds.compareButton).click();
        await utilities.waitForPageLoad(() => $('#compareTableResults').isExisting())
        await expect(compareProducts.productFactsTable).toBeExisting();
        await expect(await compareProducts.verifyProductNameExists("Vanguard Index Australian Shares Fund")).toBe(true);
        await expect(await compareProducts.verifyProductNameExists("Vanguard Investor Cash Plus Fund")).toBe(true);
        await expect(await compareProducts.verifyProductNameExists("Vanguard Index Australian Property Securities Fund")).toBe(true);
    })

    it('should not be able to select more than 4 products', async () => {
        await retailManagedFunds.clickProductCheckBox("Vanguard Cash Plus Fund");
        await retailManagedFunds.clickProductCheckBox("Vanguard Diversified Bond Index Fund");
        await retailManagedFunds.clickProductCheckBox("Vanguard Australian Property Securities Index Fund");
        await retailManagedFunds.clickProductCheckBox("Vanguard Australian Shares Index Fund");
        const checkbox = await retailManagedFunds.getProductCheckBox("Vanguard Australian Shares High Yield Fund");
        await expect(checkbox).toBeDisabled;
    })
})
