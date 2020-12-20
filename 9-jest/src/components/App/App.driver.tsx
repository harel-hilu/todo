import { NewTask, TasksById } from "../../../../common/Tasks";
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';
import { act } from 'react-dom/test-utils';
import TaskLine from '../TaskLine/TaskLine';
import EmptyState from '../EmptyState/EmptyState';
import TasksList from '../TasksList/TasksList';
import Title from '../Title/Title';
import * as serverApi from "../../dataAccess/server-api";   
import { addNewTaskDriver } from "../AddNewTask/AddNewTask.driver";
import puppeteer from "puppeteer";

Enzyme.configure({ adapter: new Adapter() })

export const AppEnzymeDriver = () => {
    let i =0;

    let wrapper: Enzyme.ReactWrapper;
    const { 
        given: addNewTaskGiven, 
        when: addNewTaskWhen,
        then: addNewTaskThen
    } = addNewTaskDriver();

    jest.spyOn(serverApi, 'addTaskToServer').mockImplementation((newTask: NewTask) => 
        Promise.resolve({id: (i++).toString(), text: "text", isDone: true}));

    const updateWrapper = () => act(() => { wrapper.update() });
    const createWrapper = async () => await act(async() => {
            wrapper = await mount(<App />);
    });
    
    return {
        given: {
            createAppWrapper: async () => {
                await createWrapper();
                wrapper.update();
                addNewTaskGiven.setParentWrapper(wrapper);
            },
            mockServerTasks: (tasks: TasksById) => 
                jest.spyOn(serverApi, 'getAllTasksFromServer')
                .mockImplementation(() => Promise.resolve(tasks)),
        },
        when: {
            addTask: async (text: string) => {
                await addNewTaskWhen.simulateInputChange(text);
                await addNewTaskWhen.simulateAddTaskClick();
                await wrapper.update();
            }
        },
        then: {
            numOfEmptyStateComponents: () => wrapper.find(EmptyState).length,
            numOfTaskLineComponents: () => wrapper.find(TaskLine).length,
            numOfTaskListComponents: () => wrapper.find(TasksList).length,
            numOfTitleComponents: () => wrapper.find(Title).length,
        }
    }
}

export const AppPuppeteerDriver = () => {
    let browser: puppeteer.Browser;
    let page: puppeteer.Page;

    return {
        given: {
            goToTasksSite: async() => {
                browser = await puppeteer.launch({
                    headless: false
                });
                page = await browser.newPage();
                await page.goto("http://localhost:3300/");
                await page.waitForSelector("#root");
            }
        },
        when: {
            addTask: async (text: string) => {
                await page.type("#addTaskInput", text);
                await page.click("#addTaskButton");
                await page.waitForTimeout(100);
            },
            addTextToTask: async (text: string) => {
                await page.click('[data-hook="taskLabel"]');
                await page.type('[data-hook="taskInput"]', text);
                await page.$eval('[data-hook="taskInput"]', (e: any) => e.blur());
                await page.waitForTimeout(100);
            },
            deleteFirstTask: async () => {
                await page.click('[data-hook="taskDeleteButton"]');
                await page.waitForTimeout(100);
            }
        }, 
        then: {
            closeBrowser: () => browser.close(),
            getFirstTaskText: async() => 
                await page.$eval('[data-hook="taskLabel"]', e => e.innerHTML),
            getNumOfTasks: async() => 
                await page.$$eval('[data-hook="taskLabel"]', e => e.length)
        }
    }
}
