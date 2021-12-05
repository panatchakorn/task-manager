import loginPage from '../../pages/login-page'
import mydayPage from '../../pages/myday-page'
import toolbarPage from '../../pages/toolbar-page'
import alltasksPage from '../../pages/alltasks-page'

const allTasksData = require('../../fixtures/task-details.json')

describe('Remove Task test', () => {
    const login = new loginPage()
    const myday = new mydayPage()
    const toolbar = new toolbarPage()
    const allTasks = new alltasksPage()
    var taskCount
    var lastTaskTitleToRemove
    var lastTaskInAllTasks
    before(() => {
        login.goToLogin()
        cy.fixture("user-details.json").then((user) =>{
            login.loginToTaskManager(user.username,user.password)            
        })
        //add tasks data before test
        allTasksData.forEach((task) => {
            myday.addNewTask(task.title,task.description,task.duedate,task.important)
        })

        //count total tasks before test
        taskCount = myday.allCards.then((cardCount) =>{
            taskCount = Cypress.$(cardCount).length           
            //cy.log('MY LENGTH is ' + Cypress.$(cardCount).length)    
            cy.log('Start with Total Tasks: ' + taskCount)
        })

        // last task title to remove
        lastTaskTitleToRemove = myday.lastTaskcardTitle.then((title) => {
            lastTaskTitleToRemove = Cypress.$(title).text()
            cy.log("Current last task title is: " + lastTaskTitleToRemove)
        })

        // check last task appears in All Tasks Page
        toolbar.clickAllTasks()
        toolbar.toolbarTitle.should('have.text','All Tasks')
        lastTaskInAllTasks = allTasks.lastTaskcardTitle.then((title) => {
            lastTaskInAllTasks = Cypress.$(title).text()
            expect(lastTaskInAllTasks).to.equal(lastTaskTitleToRemove)
            cy.log("Current last task title in All Pages is: " + lastTaskInAllTasks)
           
        })
    })
   
    it('should remove a task from My day Page', () => {
        var updatedTasksCount = taskCount //start with total amount of tasks
        var currentLastTaskTitle = ""
        // remove last task
        toolbar.clickMyday()   
        myday.removeTask('last');
                       
        // TEST Assertion
        cy.log('CHECK a task is removed')
            
        //Total number of task is reduced by 1
        updatedTasksCount = updatedTasksCount-1
        taskCount = myday.allCards.then((cardCount) =>{                    
            taskCount = Cypress.$(cardCount).length
            cy.log('Total Tasks is updated to ' + taskCount)
        
        // Check total tasks has decreased to expected number.
        expect(cardCount).to.have.length(updatedTasksCount) 
        })    
        //Check last task title is not the same as the old task  /* data prep is important to have unique task title */
        currentLastTaskTitle = myday.lastTaskcardTitle.then((title) => {
            currentLastTaskTitle = Cypress.$(title).text()
            cy.log("Current last task title is: " + currentLastTaskTitle)
            cy.log('Old last task title (removed) was ' + lastTaskTitleToRemove)
            expect(currentLastTaskTitle).to.not.equal(lastTaskTitleToRemove)
        }) 
    })

    it('remove task from My Day Page also remove from All Tasks Page', () => {
        toolbar.clickAllTasks()
        toolbar.toolbarTitle.should('have.text','All Tasks')
        lastTaskInAllTasks = allTasks.lastTaskcardTitle.then((title) => {
            lastTaskInAllTasks = Cypress.$(title).text()
            expect(lastTaskInAllTasks).to.not.equal(lastTaskTitleToRemove)
            cy.log("Current last task title in All Pages is: " + lastTaskInAllTasks)
            cy.log('Old last task title (removed) was ' + lastTaskTitleToRemove)
           
        })
    })
    
})