import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';
import axios from 'axios';
import { act } from 'react-dom/test-utils';

Enzyme.configure({ adapter: new Adapter() })

export class AppTest {
    wrapper = mount(<div />);
    
    constructor() {
        initializeTest();
    }

    updateWrapper = () => { act(() => { this.wrapper.update() }) };

    mountApp = async () => {
        await act(async () => { this.wrapper = await mount(<App />) });
        this.updateWrapper();
    }
}

const initializeTest = () => {
    let idMockedCounter: number = 1;
    jest.mock('axios');

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
}
