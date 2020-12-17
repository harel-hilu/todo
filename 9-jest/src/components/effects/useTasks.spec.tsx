import { useTasksDriver } from "./UseTasks.driver";
import { TasksById } from '../../../../common/Tasks';

describe("useTasks custom hook: ", () => {
    let { given, when, then } = useTasksDriver();

    const taskData = {
        "1": {id:"1", text: "wow", isDone: false}
    }

    it('should has no tasks in state when server mocked without tasks', async () => { 
        given.mockServerTasks({});
        await given.createWrapper();

        expect(then.getTasks()).toStrictEqual({});
    });

    it('should has one task in state when server mocked with one task', async () => {   
        given.mockServerTasks(taskData);
        await given.createWrapper();
        
        expect(then.getTasks()).toStrictEqual(taskData);
    });
    
    it('should sets one task and verify that the tasks was added to the state', async () => {
        given.mockServerTasks({});
        await given.createWrapper();
   
        when.setTasks(taskData);
    
        expect(then.getTasks()).toStrictEqual(taskData);
    });
});