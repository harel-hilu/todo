let saveTaskToStorage = (task) => window.localStorage.setItem(task.id, JSON.stringify(task));
let removeTaskFromStorage = (taskId) => window.localStorage.removeItem(taskId);
let getTasksFromStorage = () => Object.values(localStorage).map(task => JSON.parse(task));

export {saveTaskToStorage, getTasksFromStorage, removeTaskFromStorage};