import loginPage from '../../pages/login-page'
import toolbarPage from '../../pages/toolbar-page'

describe('Site navigation test', () => {
    const login = new loginPage()
    const toolbar = new toolbarPage()
    
    beforeEach(() => {
        login.goToLogin()
        cy.fixture("user-details.json").then((user) =>{
            login.loginToTaskManager(user.username,user.password)            
        })
    });

    it('should go to All Tasks page', () => {
        toolbar.clickAllTasks()
        toolbar.landingUrl.should('contain','/nav/all-tasks')
        toolbar.toolbarTitle.should('have.text','All Tasks')
    })

    it('should go to Important Tasks page', () => {
        toolbar.clickImportantTasks()
        toolbar.landingUrl.should('contain','/nav/important-tasks')
        toolbar.toolbarTitle.should('have.text','Important Tasks')
    })

    it('should go to My day page',() =>{
        toolbar.clickAllTasks()
        toolbar.clickMyday()
        toolbar.landingUrl.should('contain','/nav/home')
        toolbar.toolbarTitle.should('have.text','My day')
    })

    it('should go to login page when logout', () => {
        toolbar.clickLogout()
        toolbar.landingUrl.should('contain','/login')        
    })


})