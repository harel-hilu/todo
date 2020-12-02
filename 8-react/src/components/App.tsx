import React, { useEffect, useState } from 'react';
import AddNewTask from './AddNewTask';
import { Task, NewTask, TasksById } from '../../../common/Tasks';
import Title from './Title';
import TasksList from './TasksList';
import { getAllTasksFromServer, deleteTaskFromServer, addTaskToServer, updateTaskOnServer } from '../data-access/server-api';
import {createUseStyles} from 'react-jss';

export default function App() {
  const [tasks, setTasks] = useState<TasksById>({});
  const classes = useStyles();  
  useEffect(() => {
    (async function getTasks() {
      try {
        setTasks(await getAllTasksFromServer());
      } catch (error) {
        alert("cannot get your tasks");
      }
  })()}, []);

  async function addTask(taskText: string){
    try {
      const taskToAdd: Task = await addTaskToServer({text: taskText, isDone: false});
      const newTasks = {...tasks};
      newTasks[taskToAdd.id] = taskToAdd;
      setTasks(newTasks);
    } catch (error) {
      alert("we cannot add your task!");
    }
  }

  async function updateTask(task: Task) {
    try {
      await updateTaskOnServer(task);
    } catch (error) {
      alert("cannot update task");
    }
  }

  async function deleteTask (taskToDelete: Task) {
    try {
      await deleteTaskFromServer(taskToDelete.id);
      let {[taskToDelete.id]: task, ...res } = tasks;
      setTasks(res);
    } catch (error) {
      alert("we cannot delete your task");
    }
  }

  return (
    <div className={classes.app}>
      <Title tasks={tasks} />
      <AddNewTask addTask={addTask} />
      <TasksList 
        tasks={tasks} 
        updateTask={updateTask}
        deleteTask={deleteTask}
      />
    </div>
  );
}

const useStyles = createUseStyles({
  app: {
    maxWidth: "600px",
    minHeight: "400px",
    padding: "10px",            
    fontFamily: "Helvetica",
}});
