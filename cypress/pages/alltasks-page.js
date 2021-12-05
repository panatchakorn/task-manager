class allTasksPage{
    
    elements = {
        taskAllCards : ".home-page",
        taskcardTitle : "[ng-reflect-ng-class='[object Object]']",
        //taskcardDate : ".mat-card-content > span.ng-star-inserted",
        taskcardFavourite : ".mat-card-content > .mat-icon.ng-star-inserted",
        taskcardCheckbox : ".mat-card-content > * input[type='checkbox']"
    }
    get allCards(){        
        return cy.get(this.elements.taskAllCards).find(this.elements.taskcardTitle)
    }
   get lastTaskcardTitle(){
       return cy.get(this.elements.taskcardTitle).last()
   }
  /* get lastTaskcardDate(){
       return cy.get(this.elements.taskcardDate).last()
   }
   */
   get lastTaskcardFavourite(){
    return cy.get(this.elements.taskcardFavourite).last()
   }
   get lastTaskcardRemoveButton(){
       return cy.get(this.elements.removeButton).last()
   }
   get firstTaskcardCheckbox(){
    return cy.get(this.elements.taskcardCheckbox).first()
   }


    enterTask(title,description,duedate,isImportant){
        cy.get(this.elements.taskTitleInput)
          .clear()
          .type(title)

        cy.get(this.elements.taskDesctiptionInput)
          .clear()
          .type(description)

        cy.get(this.elements.taskDueDateInput)
          .clear()
          .type(duedate)
        
          if(isImportant == true){
              cy.get(this.elements.importantCheckBox).check()
          }

        cy.get(this.elements.addButton).click()
    }

}

export default allTasksPage