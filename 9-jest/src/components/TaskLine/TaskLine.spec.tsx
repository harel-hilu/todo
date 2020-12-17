import { taskLineDriver } from "./TaskLine.driver";

describe("TaskLine: ", () => {
    const {
        updateTask,
        deleteTask,
        setCheckboxValue,
        clickOnDeleteButton,
        blurTaskInput,
        createTaskWrapper,
        clickOnEditButton,
        isTaskEditMode,
        getLabelText,
        clickOnLabel,
        getEditButtonText,
        getCheckboxValue,
        getDeleteButtonText        
    } = taskLineDriver();

    it('should render a task with checkbox, label, edit and delete buttons', () => {
        createTaskWrapper("wow", false);

        expect(getCheckboxValue()).toBeFalsy();
        expect(getLabelText()).toBe("wow");
        expect(getEditButtonText()).toBe("Edit");
        expect(getDeleteButtonText()).toBe("Delete");
    });
    
    it('should render task in edit mode after click on task label', () => {
        createTaskWrapper("wow", false);

        clickOnLabel();

        expect(isTaskEditMode()).toBeTruthy();
    });
    
    it('should render task in edit mode after click on edit button', () => {
        createTaskWrapper("wow", false);

        clickOnEditButton();

        expect(isTaskEditMode()).toBeTruthy();
    });
    
    it('should render task not in edit mode after blurring task input', () => {
        createTaskWrapper("wow", false);

        clickOnLabel();
        blurTaskInput();

        expect(isTaskEditMode()).toBeFalsy();
    });
    
    it('should call deleteTask func after clicking delete button', () => {
        createTaskWrapper("wow", false);

        clickOnDeleteButton();

        expect(deleteTask).toBeCalledTimes(1);
    });
    
    it('should call updateTask after pressing on checkbox', () => {
        createTaskWrapper("wow", false);

        setCheckboxValue(true);

        expect(updateTask).toBeCalledTimes(1);
    });
    
    it('should NOT call update task after not changing task values', () => {
        createTaskWrapper("wow", false);

        setCheckboxValue(false);

        expect(updateTask).toBeCalledTimes(0);
    });
})
