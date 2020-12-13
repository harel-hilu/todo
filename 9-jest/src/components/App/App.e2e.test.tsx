import React from 'react';
import Enzyme, { mount } from 'enzyme';
import App from './App';
import puppeteer from "puppeteer";

let browser: puppeteer.Browser;
let page: puppeteer.Page;

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false
  });
  page = await browser.newPage();
  await page.goto("http://localhost:3300/");
  
});

test("check sanity and the title", async () => {
await page.waitForSelector("#root");
const header = await page.$eval("#title", e => e.innerHTML);
  expect(header).toBe(`Create your first task`);
});

describe("CRUD tasks", () => {
    test("add task", async () => {
        await page.waitForSelector("#root");
        await page.type("#addTaskInput", "First task");
        await page.click("#addTaskButton");
        await page.waitForTimeout(100);
        
        const header = await page.$eval("#title", e => e.innerHTML);
        expect(header).toBe(`0/1 tasks`);
    
        const taskContent = await page.$eval('[data-hook="taskLabel"]', e => e.innerHTML);
        expect(taskContent).toBe("First task");
        
        const numOfTasks = await page.$$eval('[data-hook="taskLabel"]', e => e.length);
        expect(numOfTasks).toBe(1);
    });

    test("update task", async () => {
        await page.click('[data-hook="taskLabel"]');
        await page.type('[data-hook="taskInput"]', " ever");
        await page.click('[data-hook="taskCheckbox"]');
        await page.waitForTimeout(100);

        const taskLabel = await page.$eval('[data-hook="taskLabel"]', e => e.textContent);
        expect(taskLabel).toBe("First task ever");

        const numOfTasks = await page.$$eval('[data-hook="taskLabel"]', e => e.length);
        expect(numOfTasks).toBe(1);
    });
        
    test("delete task", async () => {
        await page.click('[data-hook="taskDeleteButton"]');
        await page.waitForTimeout(100);

        const numOfTasks = await page.$$eval('[data-hook="taskLabel"]', e => e.length);
        expect(numOfTasks).toBe(0);
    });
});

afterAll(() => {
  browser.close();
});

// test('renders app', () => {
//   const wrapper = mount(<App/>);
// });