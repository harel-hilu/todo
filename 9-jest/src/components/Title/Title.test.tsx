import React from 'react';
import Title from './Title';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

let container: any = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders with or without a name", () => {
  act(() => {
    render(<Title/>, container);  
  });  

  expect(container.textContent).toBe("Create your first task");
});

it("renders with or without a name", () => {
    act(() => {
      render(
        <Title totalTasks={10} doneTasks={5}/>, 
        container);  
    });  
  
    expect(container.textContent).toBe("5/10 tasks");
});

it("renders with or without a name", () => {
    act(() => {
      render(
        <Title totalTasks={10} doneTasks={0}/>, 
        container);  
    });  
  
    expect(container.textContent).toBe("0/10 tasks");
});

it("renders with or without a name", () => {
    act(() => {
      render(
        <Title totalTasks={10} doneTasks={10}/>, 
        container);  
    });  
  
    expect(container.textContent).toBe("10/10 tasks");
});

it("renders with or without a name", () => {
    act(() => {
      render(
        <Title totalTasks={0} doneTasks={0}/>, 
        container);  
    });  
  
    expect(container.textContent).toBe("Create your first task");
});