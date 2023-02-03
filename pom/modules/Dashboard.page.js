const BasePage = require('./Base.page');

class DashboardPage extends BasePage {
    constructor(page){
        super(page);
    }

    async clickAddNewProject(){
        await this.page.getByTestId('addProjectButton').click();
    }
    async enterProjectName(name){
        await this.page.getByTestId('projectName').fill(name);
    }
    async enterProjectDescription(description){
        await this.page.getByTestId('projectDescription').fill(description);
    }
    async enterProjectUser(userEmail, role){
        await this.page.getByRole('textbox', { name: 'email' }).fill(userEmail);
        await this.page.getByText(role).click();
        await this.page.getByRole('button', { name: 'Add' }).click();
    }
    async confirmAddProject(){
        await this.page.getByTestId('addButton').click();
    }
    async addNewProjectWithAllFieldsAndOneUser(name, description, userEmail, role){
        clickAddNewProject();
        enterProjectName(name);
        enterProjectDescription(description);
        enterProjectUser(userEmail, role);
        confirmAddProject();
    }

}
module.exports = DashboardPage;