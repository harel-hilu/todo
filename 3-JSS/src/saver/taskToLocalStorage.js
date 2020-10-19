const todoPrefix = "TODOS_";

export const saveTaskToStorage = (task) => window.localStorage.setItem(todoPrefix + task.id, JSON.stringify(task));
export const removeTaskFromStorage = (taskId) => window.localStorage.removeItem(todoPrefix + taskId);
export const getTasksFromStorage =
    () => Object.entries(localStorage)
    .filter(([key, value]) => key.substring(0,6) === todoPrefix)
    .map(([key, value]) => JSON.parse(value));