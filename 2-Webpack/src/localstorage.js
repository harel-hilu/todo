let saveTaskToStorage = (task) => {
    window.localStorage.setItem(task.id, JSON.stringify(task));
}

let removeTaskFromStorage = (task) => {
    window.localStorage.removeItem(task.id);
}

let getTasksFromStorage = () => {
    const tasks = [];
    for(let i=0; i<localStorage.length; i++){
        tasks.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
    }
    
    return tasks;
}

export {saveTaskToStorage, getTasksFromStorage, removeTaskFromStorage};