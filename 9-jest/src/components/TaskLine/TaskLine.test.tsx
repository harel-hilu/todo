import React from 'react';
import TaskLine from "./TaskLine";
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

const taskText = "hello world";
const updateTask = jest.fn(() => {});
const deleteTask = jest.fn(() => {});
const TaskElement: JSX.Element = 
    <TaskLine 
        task={{id: "1", text: taskText, isDone: false}} 
        updateTask={updateTask}
        deleteTask={deleteTask}
    />

let wrapper: Enzyme.ReactWrapper;
beforeEach(() => wrapper = mount(TaskElement));

const getInput = (text=taskText) => wrapper.find(`input[value="${text}"]`).at(0);
const getInputValue = (text=taskText) => getInput(text).prop("value");
const getLabel = (text=taskText) => wrapper.find(`label[children="${text}"]`).at(0);
const getEditButton = () => wrapper.find('button[children="Edit"]').at(0);
export const getCheckbox = (inputWrapper = wrapper) => 
    inputWrapper.find('input[type="checkbox"]').at(0);    
export const getDeleteButton = (inputWrapper = wrapper) => 
    inputWrapper.find('button[children="Delete"]').at(0);

it('find all task line elements', () => {
    expect(getCheckbox().prop("checked")).toBeFalsy();
    expect(getLabel().text()).toBe(taskText);
    expect(getEditButton().text()).toBe("Edit");
    expect(getDeleteButton().text()).toBe("Delete");
});

it('click to change to edit mode', () => {
    expect(getLabel().text()).toBe(taskText);
    getEditButton().simulate("click");
    expect(getInputValue()).toBe(taskText);
});

it('edit with label click', () => {
    getLabel().simulate("click");
    expect(getLabel()).toHaveLength(0);
    expect(getInputValue()).toBe(taskText);
});

it('focus in and out the label', () => {
    getLabel().simulate("click");
    getInput().simulate("blur");
    expect(getLabel().text()).toBe(taskText);
});

it('check delete button', () => {
    getDeleteButton().simulate("click");
    expect(deleteTask).toBeCalledTimes(1);
});

it('check edit function by pressing checkbox', () => {
    getCheckbox().simulate("change", {target: {checked: true}});    
    expect(updateTask).toBeCalledTimes(1);
});

it('not call edit function after no edit', () => {
    getLabel().simulate("click");
    getInput().simulate("blur")
    expect(updateTask).toBeCalledTimes(0);
});

it('trigger change event without changing text wont call edit', () => {
    getLabel().simulate("click");
    getInput().simulate("change", {target: {value: taskText}});
    getInput().simulate("blur");
    getCheckbox().simulate("change", {target: {checked: false}});
    expect(updateTask).toBeCalledTimes(0);
});

it('call edit func after text change', () => {  
    const newTaskText = "new task!";
    getLabel().simulate("click");
    getInput().simulate("change", {target: {value: newTaskText}});
    getInput(newTaskText).simulate("blur");
    expect(getLabel).toHaveLength(0);
    expect(updateTask).toBeCalledTimes(1);
});