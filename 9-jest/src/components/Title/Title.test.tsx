import React from 'react';
import Title from './Title';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

let wrapper: Enzyme.ReactWrapper;

const mountWrapper = (totalTasks = 0, doneTasks = 0) => {
    wrapper = mount(<Title totalTasks={totalTasks} doneTasks={doneTasks} />);
}
export const getTitleText = (inputWrapper = wrapper) => inputWrapper.find("h1").text();

it('renders empty tasks list', () => {
    mountWrapper();
    expect(getTitleText()).toBe("Create your first task");
});

it("renders with some todos", () => {
    mountWrapper(10, 5);
    expect(getTitleText()).toBe("5/10 tasks");
});

it("renders with 0 done out if some todos", () => {
    mountWrapper(10, 0);
    expect(getTitleText()).toBe("0/10 tasks");
});

it("renders with some todos that they are all completed", () => {
  mountWrapper(10, 10);
  expect(getTitleText()).toBe("10/10 tasks");
});

it("renders without todos", () => {
  mountWrapper();
  expect(getTitleText()).toBe("Create your first task");
});