class navigationPage{

    elements = {        
        myDayButton : "mat-nav-list > :nth-child(1) > a",
        allTasksButton : "mat-nav-list > :nth-child(2) > a",
        importantTasksButton : "mat-nav-list > :nth-child(3) > a"
    }

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
export default navigationPage