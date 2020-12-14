import React from 'react';
import { Task } from "../../../../common/Tasks";
import TasksList from "./TasksList";
import TaskLine from "../TaskLine/TaskLine";
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

let wrapper = mount(<div />);
const updateTask = jest.fn(() => {});
const deleteTask = jest.fn(() => {});

const tasksArray = [
    {id: "1", text: "hi", isDone: false},
    {id: "2", text: "hi you", isDone: true}
];
const mountWrapper = (tasks: Task[]) => wrapper = mount(
    <TasksList tasks={tasks} 
               updateTask={updateTask} 
               deleteTask={deleteTask} 
    />);

it('no tasks', () => {
    mountWrapper([]);
    expect(wrapper.find(TaskLine).length).toBe(0);
});

it('renders with 1 task', () => {
    mountWrapper([{id: "1", text: "hi", isDone: false}]);
    expect(wrapper.find(TaskLine).length).toBe(1);
});

it('renders with 2 tasks', () => {
    mountWrapper(tasksArray);
    expect(wrapper.find(TaskLine).length).toBe(2);
});