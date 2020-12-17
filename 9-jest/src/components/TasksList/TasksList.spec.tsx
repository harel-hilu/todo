import { taskListDriver } from "./TaskList.driver";

describe("TaskList: ", () => {
    const { given, then } = taskListDriver();
    
    it('should render TaskList without tasks', () => {
        given.createTaskListWrapper([]);

        expect(then.getNumberOfTasks()).toBe(0);
    });
    
    it('should render TaskList with one task', () => {
        given.createTaskListWrapper([{id: "1", text: "hi", isDone: false}]);

        expect(then.getNumberOfTasks()).toBe(1);
    });
})
