import React from 'react';
import TaskLine from "./TaskLine";
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

const updateTask = jest.fn(() => {});
const deleteTask = jest.fn(() => {});

it('find all task line elements', () => {
    const wrapper = mount(<TaskLine task={{id: "1", text: "wow", isDone: true}} />);
    
    expect(wrapper.find("input").prop("checked")).toBeTruthy();
    expect(wrapper.find('label[children="wow"]')).toHaveLength(1);
    expect(wrapper.find('button[children="Edit"]').text()).toBe("Edit");
    expect(wrapper.find('button[children="Delete"]').text()).toBe("Delete");
});

it('click to change to edit mode', () => {
    const wrapper = mount(<TaskLine task={{id: "1", text: "wow", isDone: true}} />);
    wrapper.find('button[children="Edit"]').simulate("click");
    expect(wrapper.find('label[children="wow"]')).toHaveLength(0);
    expect(wrapper.find('input[value="wow"]')).toHaveLength(1);
});

it('edit with label click', () => {
    const wrapper = mount(<TaskLine task={{id: "1", text: "wow", isDone: true}} />);
    wrapper.find('label[children="wow"]').simulate("click");
    expect(wrapper.find('label[children="wow"]')).toHaveLength(0);
    expect(wrapper.find('input[value="wow"]')).toHaveLength(1);
});

it('focus in and out the label', () => {
    const wrapper = mount(<TaskLine task={{id: "1", text: "wow", isDone: true}} />);
    wrapper.find('label[children="wow"]').simulate("click");
    wrapper.find('input[value="wow"]').simulate("blur");
    expect(wrapper.find('label[children="wow"]')).toHaveLength(1);
});

it('check delete button', () => {
    const wrapper = mount(
        <TaskLine 
            task={{id: "1", text: "wow", isDone: true}} 
            deleteTask={deleteTask}
        />);

    wrapper.find('button[children="Delete"]').simulate("click");
    expect(deleteTask).toBeCalledTimes(1);
});

it('check edit function by pressing checkbox', () => {
    const wrapper = mount(
        <TaskLine 
            task={{id: "1", text: "wow", isDone: false}} 
            updateTask={updateTask}
        />);

    wrapper.find('input[type="checkbox"]').simulate("change", {target: {checked: true}});    
    expect(updateTask).toBeCalledTimes(1);
});

it('not call edit function after no edit', () => {
    const wrapper = mount(
        <TaskLine 
            task={{id: "1", text: "wow", isDone: false}} 
            updateTask={updateTask}
        />);

    wrapper.find('label[children="wow"]').simulate("click");
    wrapper.find('input[value="wow"]').simulate("blur");
    
    expect(updateTask).toBeCalledTimes(0);
});

it('trigger change event without changing text wont call edit', () => {
    const wrapper = mount(
        <TaskLine 
            task={{id: "1", text: "wow", isDone: false}} 
            updateTask={updateTask}
        />);

    wrapper.find('label[children="wow"]').simulate("click");
    wrapper.find('input[value="wow"]').simulate("change", {target: {value: "wow"}});
    wrapper.find('input[value="wow"]').simulate("blur");
    expect(updateTask).toBeCalledTimes(0);
});

it('call edit func after text change', () => {
    const wrapper = mount(
        <TaskLine 
            task={{id: "1", text: "wow", isDone: false}} 
            updateTask={updateTask}
        />);

    wrapper.find('label[children="wow"]').simulate("click");
    wrapper.find('input[value="wow"]').simulate("change", {target: {value: "!!!"}});
    expect(wrapper.find('input[value="wow"]')).toHaveLength(0);
    wrapper.find('input[value="!!!"]').simulate("blur");
    expect(updateTask).toBeCalledTimes(1);
});