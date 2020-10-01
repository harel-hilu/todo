const taskToAddInputId = "taskToAddInput";

// export let getTaskToAddInputElem = () => document.getElementById(taskToAddInputId);
// export let isEmptyTaskToAddInput = () => (getTaskToAddInputElem().value === "");
// export let focusTaskToAddInput = () => getTaskToAddInputElem().focus();

let getTaskToAddInputElem = () => document.getElementById(taskToAddInputId);
let getTaskToAddInputText = () => document.getElementById(taskToAddInputId).value;
let isEmptyTaskToAddInput = () => (getTaskToAddInputElem().value === "");
let focusTaskToAddInput = () => getTaskToAddInputElem().focus();
let clearTaskToAddInput = () => getTaskToAddInputElem().value = "";

export {getTaskToAddInputElem, getTaskToAddInputText, isEmptyTaskToAddInput, focusTaskToAddInput, clearTaskToAddInput};