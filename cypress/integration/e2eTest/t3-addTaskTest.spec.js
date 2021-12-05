import loginPage from '../../pages/login-page'
import mydayPage from '../../pages/myday-page'
import toolbarPage from '../../pages/toolbar-page'
import alltasksPage from '../../pages/alltasks-page'

const allTasksData = require('../../fixtures/task-details.json')

describe('Add Task test', () => {
    const login = new loginPage()
    const myday = new mydayPage()
    const toolbar = new toolbarPage()
    const alltasks = new alltasksPage()
    var taskCount

    before(() => {
        login.goToLogin()
        cy.fixture("user-details.json").then((user) =>{
            login.loginToTaskManager(user.username,user.password)            
        })
        //Get total count to to used for assertion later.
        taskCount = myday.allCards.then((cardCount) =>{
            taskCount = Cypress.$(cardCount).length
            //cy.log('MY LENGTH is ' + Cypress.$(cardCount).length)    
            cy.log('Start with Total Tasks: ' + taskCount)
        })
    })

    allTasksData.forEach((task) => {
        it('should add a new task - ' + task.title, () => {
            var updatedTasksCount = 0
                toolbar.clickMyday()
                
                myday.addNewTask(task.title,task.description,task.duedate,task.important)
                
                cy.log('New Task Title is - from data file ' + task.title)
                
                // TEST Assertion
                cy.log('CHECK a new task is added')
    
                myday.lastTaskcardTitle.should('have.text',task.title)
                
                // Check due date is today when the due date was entered for today
                // Can be improved to add different date in the data file
                if (task.duedate == 'today'){
                    var currentDate = new Date();
                    // date format eg. Dec 5, 2021
                    myday.lastTaskcardDate.should('contain',currentDate.toLocaleDateString("en-US", { month: 'short' }) + " " + currentDate.toLocaleDateString("en-US", { day: 'numeric' }) + ", " + currentDate.toLocaleDateString("en-US", { year: 'numeric' }))
                }

                //Check task's favourite    
                if (task.important == true){
                    myday.lastTaskcardFavourite.should('have.text','star') // Check favourite is set for the task
                }
                else {
                    myday.lastTaskcardFavourite.should('have.text','star_border') // Check favourite is not set for the task
                }

                // Total tasks increased by 1 after a new task was added
                updatedTasksCount = taskCount + 1
                
                taskCount = myday.allCards.then((cardCount) =>{                    
                    taskCount = Cypress.$(cardCount).length
                    cy.log('Total Tasks is updated to ' + taskCount)
                    // Check total tasks has increased to expected number.
                    expect(cardCount).to.have.length(updatedTasksCount) 
                })
            // TEST Assertion
            cy.log('CHECK fields are clear after adding a new task')
            myday.taskTitle.should('have.text','')        
            myday.taskDescription.should('have.text','')        
            myday.taskDueDate.should('have.text','')        
            myday.importantCheckBox.should('not.be.checked')
        })

        it('add task from My Day Page also appear in All Tasks Page', () => {
            // TEST Assertion
            toolbar.clickAllTasks()
            toolbar.toolbarTitle.should('have.text','All Tasks')
            // task that was added appears in All Tasks page
            alltasks.lastTaskcardTitle.should('have.text',task.title)
 
            if (task.important == true){
                alltasks.lastTaskcardFavourite.should('have.text','star') // Check favourite is set for the task
            }
            else {
                alltasks.lastTaskcardFavourite.should('have.text','star_border') // Check favourite is not set for the task
            }
            // not checking due date as it does not appear in All Tasks page
        })
    })
    
})
   