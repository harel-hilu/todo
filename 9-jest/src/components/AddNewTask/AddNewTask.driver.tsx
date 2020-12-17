import React from 'react';
import AddNewTask from "./AddNewTask";
import Enzyme, { mount, ReactWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { act } from 'react-dom/test-utils';

Enzyme.configure({ adapter: new Adapter() })

export const addNewTaskDriver = () => {
    let wrapper: Enzyme.ReactWrapper;
    const addTask = jest.fn(() => {});
    
    return {
        given: {
            createAddNewTaskWrapper: () =>
                wrapper = mount(<AddNewTask addTask={addTask} />)
        },
        when: {
            simulateInputChange: (text = "") =>
                wrapper.find("#addTaskInput")
                .simulate('change', { target: { value: text } }),
            simulateAddTaskClick: () => 
                wrapper.find('button[children="Add Task!"]').simulate("click"),
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
