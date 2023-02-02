class BasePage {
    constructor(page){
        this.page = page;
    }

    async navigate(path){
        await this.page.goto(`https://dhi2uhaad6mm8.cloudfront.net/${path}`)
    }
}
module.exports = BasePage;