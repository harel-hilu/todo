const taskToAddInputId = "taskToAddInput";

let getTaskToAddInputElem = () => document.getElementById(taskToAddInputId);
let getTaskToAddInputText = () => document.getElementById(taskToAddInputId).value;
let isEmptyTaskToAddInput = () => (getTaskToAddInputElem().value === "");
let focusTaskToAddInput = () => getTaskToAddInputElem().focus();
let clearTaskToAddInput = () => getTaskToAddInputElem().value = "";

export {getTaskToAddInputElem, getTaskToAddInputText, isEmptyTaskToAddInput, focusTaskToAddInput, clearTaskToAddInput};