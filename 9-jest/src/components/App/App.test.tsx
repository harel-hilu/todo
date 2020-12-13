import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import TaskLine from '../TaskLine/TaskLine';

Enzyme.configure({ adapter: new Adapter() })

jest.mock('axios');
let idMockedCounter: number = 1;
jest.spyOn(axios, 'delete').mockImplementation((url: string) => Promise.resolve(null));

jest.spyOn(axios, 'post').mockImplementation((url: string) => {
    idMockedCounter++;
    
    return (url !== '/api/v1/tasks') ? Promise.resolve({data: {}}) :
        Promise.resolve({data: { 
            id: idMockedCounter.toString(), 
            text: "task" + idMockedCounter, 
            isDone: true 
        }}
    )
});

jest.spyOn(axios, 'get').mockImplementation((url: string) => 
    (url !== '/api/v1/tasks') ? Promise.resolve({data: {}}) :
    Promise.resolve({data: { "1": { id: "1", text: "task from server", isDone: true }}}));

const mountApp = async () => {
    let wrapper = mount(<div />);
    await act(async () => { wrapper = await mount(<App />) });
    wrapper.update();

    return wrapper;
}

it('find all task line elements', async () => {
    let wrapper = await mountApp();
    expect(wrapper.find(TaskLine)).toHaveLength(1);
});

it('add tasks', async () => {
    let wrapper = await mountApp();
    
    await act(async() => {
        await wrapper.find("input").at(0).simulate("change", {target: {value: "task1"}});
        await wrapper.find('button[children="Add Task!"]').simulate("click");
    });
    act(() => {wrapper.update()});
    expect(wrapper.find(TaskLine)).toHaveLength(2);

    await act(async () => {
        await wrapper.find("input").at(0).simulate("change", {target: {value: "task2"}});
        await wrapper.find('button[children="Add Task!"]').simulate("click");
    });
    act(() => {wrapper.update()});
    expect(wrapper.find(TaskLine)).toHaveLength(3);
});

it('delete task', async () => {
    let wrapper = await mountApp();
    
    expect(wrapper.find(TaskLine)).toHaveLength(1);
    await act(async() => {
        await wrapper.find('button[children="Delete"]').simulate("click");
    });
    act(() => {wrapper.update()});
    expect(wrapper.find(TaskLine)).toHaveLength(0);
});

it('check title numbers', async () => {
    let wrapper = await mountApp();
    expect(wrapper.find("h1").text()).toBe("1/1 tasks");

    await act(async() => {
        await wrapper.find('input[checked=true]').simulate("change", {target: {checked: false}});
    });
    act(() => {wrapper.update()});
    expect(wrapper.find("h1").text()).toBe("0/1 tasks");

    await act(async() => {
        await wrapper.find('button[children="Delete"]').simulate("click");
    });
    act(() => {wrapper.update()});
    expect(wrapper.find("h1").text()).toBe("Create your first task");

    await act(async () => {
        await wrapper.find("input").at(0).simulate("change", {target: {value: "task2"}});
        await wrapper.find('button[children="Add Task!"]').simulate("click");
        await wrapper.find("input").at(0).simulate("change", {target: {value: "task2"}});
        await wrapper.find('button[children="Add Task!"]').simulate("click");
        await wrapper.find("input").at(0).simulate("change", {target: {value: "task2"}});
        await wrapper.find('button[children="Add Task!"]').simulate("click");
    });
    act(() => {wrapper.update()});
    expect(wrapper.find("h1").text()).toBe("3/3 tasks");
});
