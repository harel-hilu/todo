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
        given: {
            createTaskWrapper: (text: string, isDone: boolean) => wrapper = mount(
                <TaskLine 
                    task={{id: "1", text: text, isDone: isDone}} 
                    updateTask={updateTask}
                    deleteTask={deleteTask}
                />)
        },
        when: {
            clickOnDeleteButton: () =>
                wrapper.find('button[children="Delete"]').at(0).simulate("click"),
            blurTaskInput: () => 
                wrapper.find('input[data-hook="taskInput"]').at(0).simulate("blur"),
            clickOnLabel: () => 
                wrapper.find(`label[data-hook="taskLabel"]`).at(0).simulate("click"),
            setCheckboxValue: (value: boolean) =>     
                wrapper.find('input[type="checkbox"]').at(0)
                .simulate("change", {target: {checked: value}}),
            clickOnEditButton: () => 
                wrapper.find('button[children="Edit"]').at(0).simulate("click"),
        },
        then: {
            isTaskEditMode: () =>
                wrapper.find(`input[data-hook="taskInput"]`).length === 1,
            getLabelText: () => 
                wrapper.find(`label[data-hook="taskLabel"]`).at(0).text(),
            getEditButtonText: () => 
                wrapper.find('button[children="Edit"]').at(0).text(),
            getCheckboxValue: () => 
                wrapper.find('input[type="checkbox"]').at(0).prop("checked") as boolean,
            getDeleteButtonText: () => 
                wrapper.find('button[children="Delete"]').at(0).text(),
            updateTask: updateTask,
            deleteTask: deleteTask
        }
    }
}
