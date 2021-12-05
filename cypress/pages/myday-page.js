class mydayPage{
    
    elements = {
        taskTitleInput : "#mat-input-2",
        taskDescriptionInput : "#mat-input-3",
        taskDueDateInput : "#mat-input-4",
        datePicker : "button[aria-label='Open calendar']",
        todayDate : ".mat-calendar-body-cell-content.mat-calendar-body-today",        
        importantCheckBox : "input[name='isImportant']",
        addButton : ".mat-card-actions > button[type='submit']",
        removeButton : ".mat-card-content > .mat-icon.remove-icon",
        taskAllCards : ".home-page",
        taskcardTitle : "[ng-reflect-ng-class='[object Object]']",
        taskcardDate : ".mat-card-content > span.ng-star-inserted",
        taskcardFavourite : ".mat-card-content > .mat-icon.ng-star-inserted",
        taskcardCheckbox : "mat-card.home-card.task-card.mat-card.ng-star-inserted > * input[type='checkbox']"
    }

   get taskTitle(){
       return cy.get(this.elements.taskTitleInput)
   }
   get taskDescription(){
        return cy.get(this.elements.taskDescriptionInput)
   }
   get taskDueDate(){
       return cy.get(this.elements.taskDueDateInput)       
   }
   get importantCheckBox(){
       return cy.get(this.elements.importantCheckBox)
   }
   get allCards(){
        
        return cy.get(this.elements.taskAllCards).find(this.elements.taskcardTitle)
   }
   get lastTaskcardTitle(){
       return cy.get(this.elements.taskcardTitle).last()
   }
   get lastTaskcardDate(){
       return cy.get(this.elements.taskcardDate).last()
   }
   get lastTaskcardFavourite(){
    return cy.get(this.elements.taskcardFavourite).last()
   }
   get lastTaskcardRemoveButton(){
       return cy.get(this.elements.removeButton).last()
   }

   get firstTaskcardCheckbox(){
       return cy.get(this.elements.taskcardCheckbox).first()
   }

    addNewTask(title,description,duedate,isImportant){
        cy.get(this.elements.taskTitleInput)
          .clear()
          .type(title)

        cy.get(this.elements.taskDescriptionInput)
          .clear()
          .type(description)
        if(duedate == "today"){
            cy.get(this.elements.datePicker).click()
            cy.get(this.elements.todayDate).click()
        }
        // can be extended to allows days in the future
        if(isImportant == true){
            cy.get(this.elements.importantCheckBox).check({force:true})
        }

        cy.get(this.elements.addButton).click()
    }

    removeTask(item){
        if (item == 'last'){ //can be extended the test to remove different task
            cy.get(this.elements.removeButton).last().click()
        }
        
    }

    
}

export default mydayPage