import * as webUrl from '../support/hostconfig'

class loginPage {

    elements = {
        emailTextField : "[type='email']",
        passwordTextField : "[type='password']",
        loginButton : "[type='submit']",
        loginTitle : "* mat-card > mat-card-title"        
    }
    
    
    goToLogin(){
        const url = webUrl.getBaseUrl()    
        cy.visit(url + '/login')                   
    }

    enterEmail(username){
        cy.get(this.elements.emailTextField)
          .clear()
          .type(username)
    }
    
    enterPassword(password){
        cy.get(this.elements.passwordTextField)
          .clear()
          .type(password)
    
    }
    clickLogin(){
        cy.get(this.elements.loginButton).contains('Login')
          .click()
    }

    loginToTaskManager(username,password){
        this.enterEmail(username)
        this.enterPassword(password)
        this.clickLogin()
    }

    get loginBoxTitle(){
        return cy.get(this.elements.loginTitle)
    }
    
}

export default loginPage

