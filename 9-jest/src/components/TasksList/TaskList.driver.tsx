import { Task } from "../../../../common/Tasks";
import TasksList from "./TasksList";
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TaskLine from "../TaskLine/TaskLine";

Enzyme.configure({ adapter: new Adapter() })

export const taskListDriver = () => {
    let wrapper: Enzyme.ReactWrapper;
    const updateTask = jest.fn(() => {});
    const deleteTask = jest.fn(() => {});

    return {
        given: {
            createTaskListWrapper: (tasks: Task[]) => wrapper = mount(
                <TasksList tasks={tasks} 
                           updateTask={updateTask} 
                           deleteTask={deleteTask} 
                />)
        },
        then: {
            getNumberOfTasks: () => wrapper.find(TaskLine).length
        }
    }
}
