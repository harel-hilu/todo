import React from 'react';
import { NewTask, Task } from '../../../../common/Tasks';
import AddNewTask from '../AddNewTask/AddNewTask';
import useTasks from '../effects/useTasks';
import Title from '../Title/Title';
import TasksList from '../TasksList/TasksList';
import EmptyState from '../EmptyState/EmptyState';
import { createUseStyles } from 'react-jss';
import { addTaskToServer, 
         deleteTaskFromServer, 
         updateTaskOnServer } from '../../dataAccess/server-api';

export default function App() {
    const [tasks, setTasks] = useTasks();
    const classes = useStyles();

    const executeAndNotifyForErrors = async (func: Function) => {
        try {
            await func();
        } catch (error) {
            console.log(error);
            alert("We cannot reach the server, the best coders in town are on it!");
        }
    }

    const addTask = async (task: NewTask) => {
        await executeAndNotifyForErrors(async() => {
            const taskToAdd = await addTaskToServer(task); 
            const newTasks = {...tasks, [taskToAdd.id]: taskToAdd}
            setTasks(newTasks);
        });
    };

    const updateTask = async (taskToUpdate: Task) => {
        await executeAndNotifyForErrors(async() => {
            await updateTaskOnServer(taskToUpdate);
            const newTasks = {...tasks};
            newTasks[taskToUpdate.id] = taskToUpdate;
            setTasks(newTasks);
        })
    }

    const deleteTask = async (taskToDelete: Task) => {
        await executeAndNotifyForErrors(async() => {
            await deleteTaskFromServer(taskToDelete.id);
            const newTasks = {...tasks};
            delete newTasks[taskToDelete.id];
            setTasks(newTasks);
        })
    }

    const totalTasks = () => Object.values(tasks).length;
    const doneTasks = () => Object.values(tasks).filter((task) => task.isDone).length;
    
    return (
        <div className={classes.app}>
            {totalTasks() === 0 && <EmptyState />}
            <Title doneTasks={doneTasks()} totalTasks={totalTasks()} />
            <AddNewTask addTask={addTask} />
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