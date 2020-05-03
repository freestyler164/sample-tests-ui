import Page from './page'

class CompareProducts extends Page {
    get productFactsTable() {
        return $('#compareTableResults')
    }

    async verifyProductNameExists(productname) {
        const productNameRow = await $('tr*=Product name');
        const productNameCells = await productNameRow.$$('td')
        let itemFound = 0;
        const promises = productNameCells.map(async element => {
            if(await element.getText() === productname){
                itemFound = 1;
            }
        })
        await Promise.all(promises)
        console.log(itemFound);
        return (itemFound !== 0);
    }
}

export default new CompareProducts()