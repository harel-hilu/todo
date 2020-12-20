import { addNewTaskDriver } from "./AddNewTask.driver";

describe("AddNewTask: ", () => {
    const { given, when, then } = addNewTaskDriver();

    it('should render a button and an empty input', () => {
        given.createAddNewTaskWrapper();

        expect(then.getAddTaskButtonText()).toBe("Add Task!");
        expect(then.getAddTaskInputText()).toBe("");
    });
    
    it('should clear input after adding a task', async () => {
        given.createAddNewTaskWrapper();
        const newText = "WOW";
        await when.simulateInputChange(newText);
        expect(then.getAddTaskInputText()).toBe(newText);

        await when.simulateAddTaskClick();

        expect(then.getAddTaskInputText()).toBe("");
    });

    it('should call addTask once after adding a task', async () => {
        given.createAddNewTaskWrapper();

        const newText = "WOW";
        await when.simulateInputChange(newText)
        await when.simulateAddTaskClick();

        expect(then.addTask).toBeCalledTimes(1);
    });
    
    it('should NOT call addTask when clicking add task with empty input', async () => {
        given.createAddNewTaskWrapper();

        await when.simulateAddTaskClick();
    
        expect(then.addTask).toBeCalledTimes(0);
    });

    it('should call addTask with enter click', async() => {
        given.createAddNewTaskWrapper();

        const newText = "WOW";
        await when.simulateInputChange(newText)
        await when.simulateEnterPress();

        expect(then.addTask).toBeCalledTimes(1);
    });
});
