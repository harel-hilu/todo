import React from 'react';
import Title from './Title';
import { render } from '@testing-library/react'

it('renders empty tasks list', () => {
    const {getByText} = render(<Title></Title>);
    expect(getByText("Create your first task").textContent).toBe("Create your first task");
});

it("renders with some todos", () => {
    const {getByText} = render(<Title totalTasks={10} doneTasks={5}/>);  
    expect(getByText("5/10 tasks").textContent).toBe("5/10 tasks");
});

it("renders with 0 done out if some todos", () => {
    const {getByText} = render(<Title totalTasks={10} doneTasks={0}/>)
    expect(getByText("0/10 tasks").textContent).toBe("0/10 tasks");
});

it("renders with some todos that they are all completed", () => {
  const {getByText} = render(<Title totalTasks={10} doneTasks={10}/>)
  expect(getByText("10/10 tasks").textContent).toBe("10/10 tasks");
});

it("renders without todos", () => {
  const {getByText} = render(<Title totalTasks={0} doneTasks={0}/>)
  expect(getByText("Create your first task").textContent).toBe("Create your first task");
});