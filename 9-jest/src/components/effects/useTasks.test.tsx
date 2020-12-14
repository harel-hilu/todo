import axios from 'axios';
import React from 'react';
import useTasks from "./useTasks";
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { act } from 'react-dom/test-utils';

Enzyme.configure({ adapter: new Adapter() })

let wrapper = mount(<div />);
const tasksData = {data: {id:"1", text: "wow", isDone: true}};

function HookWarpper({hook}: any) {
    const hookResults: any = hook();
    return <div data-hook={hookResults} />;
}
jest.spyOn(axios, "get").mockImplementationOnce((url) => {
    return (url === '/api/v1/tasks') ? 
        Promise.resolve(tasksData) :
        Promise.resolve(null);
})
beforeEach(async () => {
    await act(async() => {
        wrapper = await mount(<HookWarpper hook={useTasks}/>);   
    });
});
const updateWrapper = () => { act(() => { wrapper.update() }) };  
const getStateTasks = () => (wrapper.find("div").prop("data-hook") as any)[0];
const getStateSetTasks = () => (wrapper.find("div").prop("data-hook") as any)[1];

it('get all tasks in render', () => {    
    expect(axios.get).toBeCalledTimes(1);
    updateWrapper();
    expect(getStateTasks()).toStrictEqual(tasksData.data);
});

it('check get and set state and make sure "get" is called once', async() => {    
    const tasksNewData = {"1": {id:"1", text: "wow2", isDone: false}}
    
    await act(async()=>{
        await getStateSetTasks()(tasksNewData);
    });

    updateWrapper();
    expect(axios.get).toBeCalledTimes(1);
    expect(getStateTasks()).toStrictEqual(tasksNewData)
});