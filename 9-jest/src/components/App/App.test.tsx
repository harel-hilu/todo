import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { act } from 'react-dom/test-utils';
import TaskLine from '../TaskLine/TaskLine';
import EmptyState from '../EmptyState/EmptyState';

import { AppTest } from "./App.testHelper";
import { getAddTaskButton, getAddTaskInput } from "../AddNewTask/AddNewTask.test";
import { getCheckbox, getDeleteButton } from "../TaskLine/TaskLine.test";
import { getTitleText } from "../Title/Title.test";

Enzyme.configure({ adapter: new Adapter() })

const appTest = new AppTest();
beforeEach(async () => { await appTest.mountApp() });

it('find all task line elements', () => {
    expect(appTest.wrapper.find(TaskLine)).toHaveLength(1);
});

it('add tasks', async () => {
    expect(getTitleText(appTest.wrapper)).toBe("1/1 tasks");
    await act(async() => {
        await getAddTaskInput(appTest.wrapper).simulate("change", {target: {value: "task1"}});
        await getAddTaskButton(appTest.wrapper).simulate("click");
    });

    appTest.updateWrapper();
    expect(appTest.wrapper.find(TaskLine)).toHaveLength(2);
    expect(getTitleText(appTest.wrapper)).toBe("2/2 tasks");

    await act(async () => {
        await getAddTaskInput(appTest.wrapper)
            .simulate("change", {target: {value: "task2"}});
        await getAddTaskButton(appTest.wrapper).simulate("click");
    });

    appTest.updateWrapper();
    expect(appTest.wrapper.find(TaskLine)).toHaveLength(3);
    expect(getTitleText(appTest.wrapper)).toBe("3/3 tasks");
});

it('delete task', async () => {
    await act(async() => {
        await getDeleteButton(appTest.wrapper).simulate("click");
    });

    appTest.updateWrapper();
    expect(appTest.wrapper.find(TaskLine)).toHaveLength(0);
    expect(getTitleText(appTest.wrapper)).toBe("Create your first task");
});

it('edit task', async () => {
    expect(getTitleText(appTest.wrapper)).toBe("1/1 tasks");
    await act(async() => {
        await getCheckbox(appTest.wrapper)
            .simulate("change", {target: {checked: false}});
    });
    expect(getTitleText(appTest.wrapper)).toBe("0/1 tasks");
});

it('empty state', async() => {
    await act(async() => {
        await getDeleteButton(appTest.wrapper).simulate("click");
    });

    appTest.updateWrapper();
    expect(appTest.wrapper.find(EmptyState)).toHaveLength(1);
});
