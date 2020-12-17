import { addNewTaskDriver } from "./AddNewTask.driver";

describe("AddNewTask: ", () => {
    const { 
        createAddNewTaskWrapper, 
        getAddTaskButtonText, 
        getAddTaskInputText,
        simulateInputChange,
        simulateAddTaskClick,
        simulateEnterPress,
        addTask,
    } = addNewTaskDriver();

    it("", () => expect(true).toBeTruthy());

    it('should render a button and an empty input', () => {
        createAddNewTaskWrapper();

        expect(getAddTaskButtonText()).toBe("Add Task!");
        expect(getAddTaskInputText()).toBe("");
    });
    
    it('should clear input after adding a task', () => {
        createAddNewTaskWrapper();

        const newText = "WOW";
        simulateInputChange(newText)
        simulateAddTaskClick();

        expect(getAddTaskInputText()).toBe("");
    });

    it('should call addTask once after adding a task', () => {
        createAddNewTaskWrapper();

        const newText = "WOW";
        simulateInputChange(newText)
        simulateAddTaskClick();

        expect(addTask).toBeCalledTimes(1);
    });
    
    it('should NOT call addTask when clicking add task with empty input', () => {
        createAddNewTaskWrapper();

        simulateAddTaskClick();
    
        expect(addTask).toBeCalledTimes(0);
    });

    it('should add a task with enter click', () => {
        createAddNewTaskWrapper();

        const newText = "WOW";
        simulateInputChange(newText)
        simulateEnterPress();

        expect(addTask).toBeCalledTimes(1);
    });
});
