import { useTasksDriver } from "./UseTasks.driver";
import { TasksById } from '../../../../common/Tasks';

describe("useTasks custom hook: ", () => {
    let driver = useTasksDriver();

    const taskData = {
        "1": {id:"1", text: "wow", isDone: false}
    }

    it('should has no tasks in state when server mocked without tasks', async () => { 
        driver.mockServerTasks({});
        await driver.createWrapper();
        
        driver.updateState();

        expect(driver.getTasks()).toStrictEqual({});
    });

    it('should has one task in state when server mocked with one task', async () => {   
        driver.mockServerTasks(taskData);
        await driver.createWrapper();

        driver.updateState();
        
        expect(driver.getTasks()).toStrictEqual(taskData);
    });
    
    it('should sets one task and verify that the tasks was added to the state', async () => {
        driver.mockServerTasks({});
        await driver.createWrapper();
   
        driver.setTasks(taskData);
        driver.updateState();
    
        expect(driver.getTasks()).toStrictEqual(taskData);
    });
});