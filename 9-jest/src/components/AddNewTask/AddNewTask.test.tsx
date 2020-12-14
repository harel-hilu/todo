import React from 'react';
import AddNewTask from "./AddNewTask";
import Enzyme, { mount, ReactWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactTestUtils from 'react-dom/test-utils'; 
import { Task } from '../../../../common/Tasks';
import { create } from 'jss';

Enzyme.configure({ adapter: new Adapter() })

let wrapper: Enzyme.ReactWrapper;
const addTask = jest.fn(() => {});
const createWrapper = () => { wrapper = mount(<AddNewTask addTask={addTask} />) };

export const getAddTaskButton = (inputWrapper = wrapper) => 
    inputWrapper.find('button[children="Add Task!"]');
export const getAddTaskInput = (inputWrapper = wrapper) => 
    inputWrapper.find("#addTaskInput");
export const getAddTaskInputText = (inputWrapper = wrapper) => 
    inputWrapper.find("#addTaskInput").prop("value");

it('renders button and an empty input', () => {
    createWrapper();
    expect(getAddTaskButton()).toHaveLength(1);
    expect(getAddTaskInputText()).toBe("");
    expect(addTask).toBeCalledTimes(0);
});

it('clears input after add task click', () => {
    createWrapper();
    const newText = "WOW";
    getAddTaskInput().simulate('change', { target: { value: newText } });
    expect(getAddTaskInputText()).toBe(newText);

    getAddTaskButton().simulate("click");
    expect(getAddTaskInputText()).toBe("");
    expect(addTask).toBeCalledTimes(1);
});

it('clears input after add task enter', () => {
    createWrapper();
    const newText = "WOW";
    getAddTaskInput().simulate('change', { target: { value: newText } });

    getAddTaskInput().simulate("keypress", {key: "Enter"});
    expect(getAddTaskInputText()).toBe("");
    expect(addTask).toBeCalledTimes(1);
});

it('empty task cannot be added', () => {
    createWrapper();
    const newText = "";
    getAddTaskInput().simulate('change', { target: { value: newText } });

    getAddTaskInput().simulate("keypress", {key: "Enter"});
    expect(addTask).toBeCalledTimes(0);
});