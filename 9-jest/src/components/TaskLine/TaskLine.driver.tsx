import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TaskLine from "./TaskLine";

Enzyme.configure({ adapter: new Adapter() })

export const taskLineDriver = () => {
    let wrapper: Enzyme.ReactWrapper;
    const updateTask = jest.fn(() => {});
    const deleteTask = jest.fn(() => {});

    return {
        updateTask: updateTask,
        deleteTask: deleteTask,
        clickOnDeleteButton: () =>
            wrapper.find('button[children="Delete"]').at(0).simulate("click"),
        blurTaskInput: () => 
            wrapper.find('input[data-hook="taskInput"]').at(0).simulate("blur"),
        isTaskEditMode: () =>
            wrapper.find(`input[data-hook="taskInput"]`).length === 1,
        clickOnLabel: () => 
            wrapper.find(`label[data-hook="taskLabel"]`).at(0).simulate("click"),
        getLabelText: () => 
            wrapper.find(`label[data-hook="taskLabel"]`).at(0).text(),
        getEditButtonText: () => 
            wrapper.find('button[children="Edit"]').at(0).text(),
        getCheckboxValue: () => 
            wrapper.find('input[type="checkbox"]').at(0).prop("checked") as boolean,
        setCheckboxValue: (value: boolean) =>     
            wrapper.find('input[type="checkbox"]').at(0)
            .simulate("change", {target: {checked: value}}),
        getDeleteButtonText: () => 
            wrapper.find('button[children="Delete"]').at(0).text(),
        clickOnEditButton: () => 
            wrapper.find('button[children="Edit"]').at(0).simulate("click"),
        createTaskWrapper: (text: string, isDone: boolean) => wrapper = mount(
            <TaskLine 
                task={{id: "1", text: text, isDone: isDone}} 
                updateTask={updateTask}
                deleteTask={deleteTask}
            />
        )
    }
}
