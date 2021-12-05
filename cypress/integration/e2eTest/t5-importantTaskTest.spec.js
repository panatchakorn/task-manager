import loginPage from '../../pages/login-page'
import mydayPage from '../../pages/myday-page'
import toolbarPage from '../../pages/toolbar-page'
import alltasksPage from '../../pages/alltasks-page'

const allTasksData = require('../../fixtures/task-details.json')

describe('Important Task test', () => {
    const login = new loginPage()
    const myday = new mydayPage()
    const toolbar = new toolbarPage()
    const alltasks = new alltasksPage()

    before(() => {
        login.goToLogin()
        cy.fixture("user-details.json").then((user) =>{
            login.loginToTaskManager(user.username,user.password)            
        })
        // Seed data with a favourite task to make sure test don't run into exception where the page has no task item
        // the task title will be used for test assertion later
        toolbar.clickMyday()
        myday.addNewTask('Seed task data','seed 123','',true)
        
    })

    allTasksData.forEach((task) => {
        
        it('Add a new task - ' + task.title + ' : isFavourite - ' + task.important, () => {
            toolbar.clickMyday()
            myday.addNewTask(task.title,task.description,task.duedate,task.important)
            toolbar.clickImportantTasks()
            toolbar.toolbarTitle.should('have.text','Important Tasks')
        })
        
        if(task.important == true){
            it('Add new favourite task appears in Important Tasks Page - ' + task.title, () => {
                //TEST Assertion
                //Favourite task addedd appear at the cottom of the list in the Important Tasks Page
                alltasks.lastTaskcardTitle.should('have.text',task.title) 
                alltasks.lastTaskcardFavourite.should('have.text','star') 
            })

        }
        
        else{
            it('Add NON favourite task should not appear in Important Tasks Page - ' + task.title, () => {     
                //TEST Assertion
                // Non favourite task was not added at the bottom of the list           
                alltasks.lastTaskcardTitle.should('not.have.text',task.title)
            })

        }
        
    })
    
})
   