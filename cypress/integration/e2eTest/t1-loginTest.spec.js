import loginPage from '../../pages/login-page'
import toolbarPage from '../../pages/toolbar-page'

describe('Login to application test', () => {
    const login = new loginPage()    

    beforeEach(() => {
        login.goToLogin()
    });

    it('should go to login page', () => {
        //TEST Assertion
        login.loginBoxTitle.should('contain','Login to manage your tasks')
    });

    it('should login when provide valid credentials', () => {
        cy.fixture("user-details.json").then((user) =>{
            login.loginToTaskManager(user.username,user.password)
        })     
        const toolbar = new toolbarPage()
        //TEST Assertion
        toolbar.landingUrl.should('contain','/nav/home')
        toolbar.toolbarTitle.should('have.text','My day')
    })

})