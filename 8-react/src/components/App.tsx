import React, { useEffect, useState } from 'react';
import AddNewTask from './AddNewTask';
import { NewTask, Task, TasksById } from '../../../common/Tasks';
import Title from './Title';
import TasksList from './TasksList';
import {createUseStyles} from 'react-jss';
import {getAllTasksFromServer, deleteTaskFromServer, addTaskToServer, updateTaskOnServer} from '../data-access/server-api';
import {useStorage} from '../effects/useStorage';

export default function App() {
  const [tasks, setTasks] = useState<TasksById>({});
  const [isShowCompleted, setShowCompleted] = 
    useStorage<boolean>("todo_shouldShowCompleted", true);
  const classes: Record<string, string> = useStyles();    
  
  useEffect((): void => {
    (async (): Promise<void> => {
      try {
        const tasksFromServer: TasksById = await getAllTasksFromServer();
        setTasks(tasksFromServer);
      } catch (error) {
        alert("cannot get your tasks");
      }
    })()
  }, []);

  const addTask = async (taskText: string): Promise<void> => {
    try {
      const newTask: NewTask = {text: taskText, isDone: false};
      const taskToAdd = await addTaskToServer(newTask);
      const newTasks: TasksById = {...tasks, [taskToAdd.id]: taskToAdd};
      setTasks(newTasks);
    } catch (error) {
      alert("we cannot add your task!");
    }
  }

  const updateTask = async({id, text, isDone}: Task): Promise<void> => {
    try {
      await updateTaskOnServer({id, text, isDone});
      // const newTasks = {...tasks};
      tasks[id] = {id, text, isDone};
      setTasks(tasks);
    } catch (error) {
      alert("cannot update task");
    }
  }

  const deleteTask = async (taskToDelete: Task): Promise<void> => {
    try {
      await deleteTaskFromServer(taskToDelete.id);
      const {[taskToDelete.id]: task, ...res } = tasks;
      setTasks(res);
    } catch (error) {
      alert("we cannot delete your task");
    }
  }

  const filteredTasks = () => tasks;
  // Object.values(tasks).filter((task: Task) => isShowCompleted || !task.isDone);

  return (
    <div className={classes.app}>
      <Title tasks={tasks} showCompleted={isShowCompleted} />
      <AddNewTask addTask={addTask}  />
      <button 
        onClick={() => setShowCompleted(!isShowCompleted)}
        className={classes.button}>
        {isShowCompleted ? "Hide completed" : "Show completed"}
      </button>
      <TasksList 
        tasks={Object.values(tasks)} 
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
