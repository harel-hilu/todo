import React from 'react';
import AddNewTask from "./AddNewTask";
import Enzyme, { mount, ReactWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { act } from 'react-dom/test-utils';
import { AddNewTaskProps } from '../../types/props';

Enzyme.configure({ adapter: new Adapter() })

export const addNewTaskDriver = () => {
    let wrapper: Enzyme.ReactWrapper<AddNewTaskProps>;
    const addTask = jest.fn(() => {});
    
    return {
        given: {
            setParentWrapper: (inputWrapper: Enzyme.ReactWrapper) => 
                wrapper = inputWrapper.find(AddNewTask),
            createAddNewTaskWrapper: () =>
                wrapper = mount(<AddNewTask addTask={addTask} />),
            updateWrapper: () => wrapper.update()
        },
        when: {
            simulateInputChange: async (text = "") => await act(async () => {
                await wrapper.find("#addTaskInput")
                    .simulate('change', { target: { value: text } });
            }),
            simulateAddTaskClick: async () => {
                await act(async () => {
                    await wrapper.find('button[children="Add Task!"]').simulate("click");
                });
                
                await wrapper.update();
            },
            simulateEnterPress: () =>
                wrapper.find("#addTaskInput").simulate("keypress", {key: "Enter"})
        },
        then: {
            addTask: addTask,
            getAddTaskButtonText: () => 
                wrapper.find('button[children="Add Task!"]').text(),
            getAddTaskInputText: () => 
                wrapper.find("#addTaskInput").prop("value")
        }
    }
}
