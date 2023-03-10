const BasePage = require('./Base.page');

class LoginPage extends BasePage {

    constructor(page){
        super(page);
    }


    async login(username, password){
        const emailField = await this.page.getByLabel('Username');
        const passField = await this.page.getByLabel('Password', { exact: true });
        const submitButton = await this.page.getByRole('button', { name: 'submitButton' });

        await emailField.fill(username);
        await passField.fill(password);
        await submitButton.click();
    }
}
module.exports = LoginPage;

