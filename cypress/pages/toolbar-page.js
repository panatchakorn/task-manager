class toolbarPage{
    elements = {        
        showHideNaviagtionButton : "app-nav-toolbar > mat-toolbar > :nth-child(1)",
        toolbarTitle : "app-nav-toolbar > mat-toolbar > :nth-child(2)",
        logoutButton : "app-nav-toolbar > mat-toolbar > :nth-child(3)",
        myDayButton : "mat-nav-list > :nth-child(1) > a",
        allTasksButton : "mat-nav-list > :nth-child(2) > a",
        importantTasksButton : "mat-nav-list > :nth-child(3) > a"
    }

    //Top navigation

    get landingUrl(){
        return cy.url()
    }

    get toolbarTitle(){
        return cy.get(this.elements.toolbarTitle)
    }

    clickLogout(){
        cy.get(this.elements.logoutButton).click()
    }
    // Side navigation
    clickMyday(){
        cy.get(this.elements.myDayButton).click()
    }

    clickAllTasks(){
        cy.get(this.elements.allTasksButton).click()
    }

    clickImportantTasks(){
        cy.get(this.elements.importantTasksButton).click()
    }
}
export default toolbarPage