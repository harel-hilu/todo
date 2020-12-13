import React from 'react';
import AddNewTask from "./AddNewTask";
import Enzyme, { mount, ReactWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactTestUtils from 'react-dom/test-utils'; 
import { Task } from '../../../../common/Tasks';

Enzyme.configure({ adapter: new Adapter() })

const addTask = jest.fn(() => {});

it('renders button and input', () => {
    const wrapper = mount(<AddNewTask addTask={addTask} />);
    expect(wrapper.find('button').text()).toBe("Add Task!");
    expect(wrapper.find('input').prop('value')).toBe("");
    expect(addTask).toBeCalledTimes(0);
});

it('clears input after add task click', () => {
    const wrapper = mount(<AddNewTask addTask={addTask} />);
    wrapper.find('input').simulate('change', { target: { value: "WOW" } });
    expect(wrapper.find('input').prop('value')).toBe("WOW");

    wrapper.find('button').simulate("click");
    expect(wrapper.find('input').text()).toBe("");
    expect(addTask).toBeCalledTimes(1);
});

it('clears input after add task enter', () => {
    const wrapper = mount(<AddNewTask addTask={addTask} />);

    wrapper.find('input').simulate('change', { target: { value: "WOW" } });
    expect(wrapper.find('input').prop('value')).toBe("WOW");

    wrapper.find('input').simulate("keypress", {key: "Enter"});
    expect(wrapper.find('input').text()).toBe("");
    expect(addTask).toBeCalledTimes(1);
});