import React, { useEffect, useState } from 'react';
import AddNewTask from './AddNewTask';
import { NewTask, Task, TasksById } from '../../../common/Tasks';
import Title from './Title';
import TasksList from './TasksList';
import {getAllTasksFromServer, deleteTaskFromServer, addTaskToServer, updateTaskOnServer}
  from '../data-access/server-api';
import {createUseStyles} from 'react-jss';

export default function App() {
  const [tasks, setTasks] = useState<TasksById>({});
  const [isShowCompleted, setShowCompleted] = useState<boolean>(true);
  const classes: Record<string, string> = useStyles();  

  useEffect((): void => {
    const storageShowCompleted = localStorage.getItem("todo_isShowCompleted");
    storageShowCompleted && setShowCompleted(JSON.parse(storageShowCompleted));

    (async (): Promise<void> => {
      try {
        const tasksFromServer: TasksById = await getAllTasksFromServer();
        setTasks(tasksFromServer);
      } catch (error) {
        alert("cannot get your tasks");
      }
    })()
  }, []);

  useEffect(() => {
      localStorage.setItem("todo_isShowCompleted", JSON.stringify(isShowCompleted));
  }, [isShowCompleted]);

  async function addTask(taskText: string): Promise<void> {
    try {
      const newTask: NewTask = {text: taskText, isDone: false};
      const taskToAdd: Task = await addTaskToServer(newTask);
      const newTasks: TasksById = {...tasks, [taskToAdd.id]: taskToAdd};
      setTasks(newTasks);
    } catch (error) {
      alert("we cannot add your task!");
    }
  }

  async function updateTask(updatedTask: Task): Promise<void> {
    try {
      await updateTaskOnServer(updatedTask);
      const newTasks: TasksById = {...tasks};
      newTasks[updatedTask.id] = updatedTask;
      setTasks(newTasks);
    } catch (error) {
      alert("cannot update task");
    }
  }

  async function deleteTask (taskToDelete: Task): Promise<void> {
    try {
      await deleteTaskFromServer(taskToDelete.id);
      const {[taskToDelete.id]: task, ...res } = tasks;
      setTasks(res);
    } catch (error) {
      alert("we cannot delete your task");
    }
  }

  return (
    <div className={classes.app}>
      <Title tasks={tasks} showCompleted={isShowCompleted} />
      <AddNewTask addTask={addTask} />
      <button 
        onClick={() => setShowCompleted(!isShowCompleted)}
        className={classes.button}>
        {isShowCompleted ? "Hide completed" : "Show completed"}
      </button>
      <TasksList 
        tasks={tasks} 
        updateTask={updateTask}
        deleteTask={deleteTask}
        showCompleted={isShowCompleted} 
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
  },
  button: {
    backgroundColor: "white",
    textColor: "black",
    marginBottom: "10px",
    marginRight: 0,
    marginLeft: 0,
    border: "none"
  }
});
