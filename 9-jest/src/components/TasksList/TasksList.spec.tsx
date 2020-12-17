import { taskListDriver } from "./TaskList.driver";

describe("TaskList: ", () => {
    const { createTaskList, getNumberOfTasks } = taskListDriver();
    
    it('should render TaskList without tasks', () => {
        createTaskList([]);

        expect(getNumberOfTasks()).toBe(0);
    });
    
    it('should render TaskList with one task', () => {
        createTaskList([{id: "1", text: "hi", isDone: false}]);

        expect(getNumberOfTasks()).toBe(1);
    });
})
