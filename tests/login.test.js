const { chromium } = require('playwright');

describe(`UI login Tests for TMT WEB APP`, () => {
    let browser = null;
    let page = null;
    let context = null;

    beforeEach( async() => {
        browser = await chromium.launch({headless:false, slowMo:100});
        context = await browser.newContext();
        page = await context.newPage();
        await page.goto('https://dhi2uhaad6mm8.cloudfront.net/');
    });

    afterEach( async() => {
        await browser.close();
    });

    test(`Should load page`, async() =>{
        expect(page).not.toBeNull();
        expect(await page.title()).not.toBeNull();
    });

    test( `Login Ok`, async() => {
        const emailField = await page.getByLabel('Username');
        const passField = await page.getByLabel('Password', { exact: true });
        const submitButton = await page.getByRole('button', { name: 'submitButton' });

        await emailField.fill('fabian.callejas@endava.com');
        await passField.fill('Password.123');
        await submitButton.click();

        const projectTittle = await page.getByRole('heading', { name: 'PROJECTS' });
        const dashboardTittle =  await page.getByRole('heading', { name: 'DASHBOARD' });
        await page.screenshot({path:'screenshoots/fullpage.png', fullPage: true});
        expect(await projectTittle.innerText()).toBe('PROJECTS');
        expect(await dashboardTittle.innerText()).toBe('DASHBOARD');
    });

    test( `Login should fail`, async() => {
        const emailField = await page.getByLabel('Username');
        const passField = await page.getByLabel('Password', { exact: true });
        const submitButton = await page.getByRole('button', { name: 'submitButton' });

        await emailField.fill('fabian.callejas@endava.com');
        await passField.fill('123');
        await submitButton.click();

        expect(await page.getByText('Incorrect username or password.').isVisible());
    });

});
