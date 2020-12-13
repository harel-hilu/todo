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

test("check the title", async () => {
await page.waitForSelector("#root");
const header = await page.$eval("#title", e => e.innerHTML);
  expect(header).toBe(`Create your first task`);
});

test("add task", async () => {
    await page.waitForSelector("#root");
    await page.type("#addTaskInput", "First Task!");
    await page.click("#addTaskButton");
    await page.waitForTimeout(100);
    
    const header = await page.$eval("#title", e => e.innerHTML);
    expect(header).toBe(`0/1 tasks`);
  });

afterAll(() => {
  browser.close();
});

// test('renders app', () => {
//   const wrapper = mount(<App/>);
// });