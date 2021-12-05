import loginPage from '../../pages/login-page'
import mydayPage from '../../pages/myday-page'
import toolbarPage from '../../pages/toolbar-page'
import alltasksPage from '../../pages/alltasks-page'

const allTasksData = require('../../fixtures/task-details.json')

describe('Check / Uncheck Task test', () => {
    const login = new loginPage()
    const myday = new mydayPage()
    const toolbar = new toolbarPage()
    const alltasks = new alltasksPage()

    var checkboxStatus

    before(() => {
        login.goToLogin()
        cy.fixture("user-details.json").then((user) =>{
            login.loginToTaskManager(user.username,user.password)            
        })
        toolbar.clickMyday()
        //add tasks data before test
        allTasksData.forEach((task) => {
            myday.addNewTask(task.title,task.description,task.duedate,task.important)
        })
        
    }) 
    it('Should check first task - My Day Page', () => {
        toolbar.clickMyday()
        //check the current status of the checkbox and uncheck if it is already checked
        checkboxStatus = myday.firstTaskcardCheckbox.invoke('attr','aria-checked').then(($currentStatus) => {
            checkboxStatus = $currentStatus
            cy.log('Current checkbox status for the first task is :' + checkboxStatus)
                //cy.log('Before Test, Checkbox for the first task is :' + checkboxStatus)
            if($currentStatus == 'true'){
                myday.firstTaskcardCheckbox.uncheck({force:true})
                cy.log('Uncheck the check box. Ready for testing')
            }

            myday.firstTaskcardCheckbox.click({force:true})
            //TEST Assertion
            myday.firstTaskcardCheckbox.invoke('attr','aria-checked').should('eq','true')
            cy.log('Checkbox for the task is checked')
        })
    })

    it('Should uncheck first task - My Day Page', () => {
        toolbar.clickMyday()
        //check the current status of the checkbox and uncheck if it is already checked
        checkboxStatus = myday.firstTaskcardCheckbox.invoke('attr','aria-checked').then(($currentStatus) => {
            checkboxStatus = $currentStatus
            cy.log('Current checkbox status for the first task is :' + checkboxStatus)
                //cy.log('Before Test, Checkbox for the first task is :' + checkboxStatus)
            if($currentStatus == 'false'){
                myday.firstTaskcardCheckbox.check({force:true})
                cy.log('Check the check box. Ready for testing')
            }

            myday.firstTaskcardCheckbox.click({force:true})
            //TEST Assertion
            myday.firstTaskcardCheckbox.invoke('attr','aria-checked').should('eq','false')
            cy.log('Checkbox for the task is unchecked')
        })
    })

    it('Should check first task - All Tasks Page', () => {
        toolbar.clickAllTasks()
        //check the current status of the checkbox and uncheck if it is already checked
        checkboxStatus = alltasks.firstTaskcardCheckbox.invoke('attr','aria-checked').then(($currentStatus) => {
            checkboxStatus = $currentStatus
            cy.log('Current checkbox status for the first task is :' + checkboxStatus)
                //cy.log('Before Test, Checkbox for the first task is :' + checkboxStatus)
            if($currentStatus == 'true'){
                alltasks.firstTaskcardCheckbox.uncheck({force:true})
                cy.log('Uncheck the check box. Ready for testing')
            }

            alltasks.firstTaskcardCheckbox.click({force:true})
            //TEST Assertion
            alltasks.firstTaskcardCheckbox.invoke('attr','aria-checked').should('eq','true')
            cy.log('Checkbox for the task is checked')
        })
    })

    it('Should uncheck first task - All Tasks Page', () => {
        toolbar.clickMyday()
        //check the current status of the checkbox and uncheck if it is already checked
        checkboxStatus = alltasks.firstTaskcardCheckbox.invoke('attr','aria-checked').then(($currentStatus) => {
            checkboxStatus = $currentStatus
            cy.log('Current checkbox status for the first task is :' + checkboxStatus)
                //cy.log('Before Test, Checkbox for the first task is :' + checkboxStatus)
            if($currentStatus == 'false'){
                alltasks.firstTaskcardCheckbox.check({force:true})
                cy.log('Check the check box. Ready for testing')
            }

            alltasks.firstTaskcardCheckbox.click({force:true})
            //TEST Assertion
            alltasks.firstTaskcardCheckbox.invoke('attr','aria-checked').should('eq','false')
            cy.log('Checkbox for the task is unchecked')
        })
    })
})
   