const BasePage = requiere('./Base.page');

class LoginPage extends BasePage {
    constructor(page){
        super(page);
    }


    async login(username, password){
        const emailField = await page.getByLabel('Username');
        const passField = await page.getByLabel('Password', { exact: true });
        const submitButton = await page.getByRole('button', { name: 'submitButton' });

        await emailField.fill(username);
        await passField.fill(password);
        await submitButton.click();
    }
}
module.exports = LoginPage;

