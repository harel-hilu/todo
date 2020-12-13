import React from 'react';
import TasksList from "./TasksList";
import Task from "../TaskLine/TaskLine";
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

const tasksArray = [
    {id: "1", text: "hi", isDone: false},
    {id: "2", text: "hi you", isDone: true}
];

it('no tasks', () => {
    const wrapper = mount(<TasksList tasks={[]} />);
    expect(wrapper.find(Task).length).toBe(0);
});

it('renders with 1 task', () => {
    const wrapper = mount(<TasksList tasks={tasksArray.slice(1)} />);
    expect(wrapper.find(Task).length).toBe(1);
});

it('renders with 2 tasks', () => {
    const wrapper = mount(<TasksList tasks={tasksArray} />);
    expect(wrapper.find(Task).length).toBe(2);
});
