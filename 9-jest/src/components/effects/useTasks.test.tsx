import axios from 'axios';
import React from 'react';
import useTasks from "./useTasks";
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { act } from 'react-dom/test-utils';

Enzyme.configure({ adapter: new Adapter() })

function HookWarpper({hook}: any) {
    const hookResults: any = hook();

    return <div data-hook={hookResults} />;
}

jest.spyOn(axios, "get").mockImplementationOnce((url) => {
    return (url === '/api/v1/tasks') ? 
        Promise.resolve({data: {id:"1", text: "wow", isDone: true}}) :
        Promise.resolve(null);
})

it('get all tasks in render', async() => {    
    await act(async ()=>{
        const wrapper = await mount(<HookWarpper hook={useTasks}/>);
    });

    expect(axios.get).toBeCalledTimes(1);
});

it('Change component state but get all tasks shouldnt be called again', async() => {    
    let wrapper = mount(<div/>);

    await act(async()=>{
        wrapper = await mount(<HookWarpper hook={useTasks}/>);
        await (wrapper.find("div").prop("data-hook") as any)[1]({"1": {id:"1", text: "wow", isDone: true}});
    });

    expect(axios.get).toBeCalledTimes(1);
});