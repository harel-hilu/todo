import { taskLineDriver } from "./TaskLine.driver";

describe("TaskLine: ", () => {
    const {given, when, then} = taskLineDriver();

    it('should render a task with checkbox, label, edit and delete buttons', () => {
        const taskText = "wow";
        given.createTaskWrapper(taskText, false);

        expect(then.getCheckboxValue()).toBeFalsy();
        expect(then.getLabelText()).toBe(taskText);
        expect(then.getEditButtonText()).toBe("Edit");
        expect(then.getDeleteButtonText()).toBe("Delete");
    });
    
    it('should render task in edit mode after click on task label', () => {
        given.createTaskWrapper("wow", false);

        when.clickOnLabel();

        expect(then.isTaskEditMode()).toBeTruthy();
    });
    
    it('should render task in edit mode after click on edit button', () => {
        given.createTaskWrapper("wow", false);

        when.clickOnEditButton();

        expect(then.isTaskEditMode()).toBeTruthy();
    });
    
    it('should render task not in edit mode after blurring task input', () => {
        given.createTaskWrapper("wow", false);

        when.clickOnLabel();
        when.blurTaskInput();

        expect(then.isTaskEditMode()).toBeFalsy();
    });
    
    it('should call deleteTask func after clicking delete button', () => {
        given.createTaskWrapper("wow", false);

        when.clickOnDeleteButton();

        expect(then.deleteTask).toBeCalledTimes(1);
    });
    
    it('should call updateTask after pressing on checkbox', () => {
        given.createTaskWrapper("wow", false);

        when.setCheckboxValue(true);

        expect(then.updateTask).toBeCalledTimes(1);
    });
    
    it('should NOT call update task after not changing task values', () => {
        given.createTaskWrapper("wow", false);

        when.setCheckboxValue(false);

        expect(then.updateTask).toBeCalledTimes(0);
    });
})
