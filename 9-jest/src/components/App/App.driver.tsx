import { TasksById } from "../../../../common/Tasks";
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
import puppeteer from "puppeteer";

Enzyme.configure({ adapter: new Adapter() })

export const AppDriver = () => {
    let wrapper: Enzyme.ReactWrapper;

    return {
        createAppWrapper: async () => {
            await act(async() => {
                wrapper = await mount(<App />);
            });
        },
        update: () => {wrapper.update()},
        mockServerTasks: (tasks: TasksById) => 
            jest.spyOn(serverApi, 'getAllTasksFromServer')
            .mockImplementation(() => Promise.resolve(tasks)),
        numOfEmptyStateComponents: () => wrapper.find(EmptyState).length,
        numOfTaskLineComponents: () => wrapper.find(TaskLine).length,
        numOfTaskListComponents: () => wrapper.find(TasksList).length,
        numOfTitleComponents: () => wrapper.find(Title).length,
    }
}

export const AppPuppeteerDriver = () => {
    let browser: puppeteer.Browser;
    let page: puppeteer.Page;

    return {
        goToTasksSite: async() => {
            browser = await puppeteer.launch({
                headless: false
            });
            page = await browser.newPage();
            await page.goto("http://localhost:3300/");
            await page.waitForSelector("#root");
        },
        closeBrowser: () => browser.close(),
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
        getFirstTaskText: async() => 
            await page.$eval('[data-hook="taskLabel"]', e => e.innerHTML),
        getNumOfTasks: async() => 
            await page.$$eval('[data-hook="taskLabel"]', e => e.length),
        deleteFirstTask: async () => {
            await page.click('[data-hook="taskDeleteButton"]');
            await page.waitForTimeout(100);
        }
    }
}
