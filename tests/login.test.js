const { chromium } = require('playwright');
const LoginPage = require('../pom/modules/Login.page');

describe(`UI login Tests for TMT WEB APP`, () => {
    jest.setTimeout(30000);
    let browser = null;
    let page = null;
    let context = null;
    let loginPage = null;

    beforeEach( async() => {
        browser = await chromium.launch({headless:false, slowMo:100});
        context = await browser.newContext();
        page = await context.newPage();
        loginPage = new LoginPage(page);
        await loginPage.navigate();
    });

    afterEach( async() => {
        await context.close();
        await browser.close();
    });

    test(`Should load page`, async() =>{
        expect(page).not.toBeNull();
        expect(await page.title()).not.toBeNull();
    });

    test( `Login Ok`, async() => {
        await loginPage.login('fabian.callejas@endava.com', 'Password.123');
        const projectTittle = await page.getByRole('heading', { name: 'PROJECTS' });
        await page.screenshot({path:'output/screenshoots/fullpage.png', fullPage: true});
        expect(await projectTittle.innerText()).toBe('PROJECTS');
        expect(await page.title()).toBe('Dashboard - Test Management Tool');
    });

    test( `Login should fail`, async() => {
        await loginPage.login('fabian.callejas@endava.com', '123');
        expect(await page.getByText('Incorrect username or password.').isVisible());
    });

});
