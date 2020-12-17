import axios from 'axios';
import React from 'react';
import useTasks from "./useTasks";
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { act } from 'react-dom/test-utils';
import { TasksById } from "../../../../common/Tasks";

Enzyme.configure({ adapter: new Adapter() })

export const useTasksDriver = () => {
    let wrapper: Enzyme.ReactWrapper;

    function HookWarpper({hook}: any) {
        const hookResults: any = hook();
        return <div data-hook={hookResults} />;
    }   

    const createWrapper = async() => await act(async() => {
        wrapper = await mount(<HookWarpper hook={useTasks}/>);   
    });

    const setTasks = (tasks: TasksById) => 
        act(() => (wrapper.find("div").prop("data-hook") as any)[1](tasks));

    const updateWrapper = () => act(() => { wrapper.update() });
    
    return {
        given: {
            mockServerTasks: (tasks: TasksById) => 
                jest.spyOn(axios, "get").mockImplementationOnce((url) => 
                    (url === '/api/v1/tasks') ? 
                    Promise.resolve({data: tasks}) :
                    Promise.resolve(null)),
            createWrapper: async () => {
                await createWrapper();
                updateWrapper();
            }
        },
        when: {
            setTasks : (tasks: TasksById) => {
                setTasks(tasks);
                updateWrapper();
            }
        },
        then: {
            getTasks : () => (wrapper.find("div").prop("data-hook") as any)[0]
        }
    }
}