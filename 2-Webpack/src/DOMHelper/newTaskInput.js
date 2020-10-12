const NEW_TASK_INPUT_ID = "taskToAddInput";

let getNewTaskInputElement = () => document.getElementById(NEW_TASK_INPUT_ID);
let getNewTaskInputText = () => document.getElementById(NEW_TASK_INPUT_ID).value;
let isEmptyNewTaskInput = () => (getNewTaskInputElement().value === "");
let focusNewTaskInput = () => getNewTaskInputElement().focus();
let clearNewTaskInput = () => getNewTaskInputElement().value = "";

export {getNewTaskInputElement, getNewTaskInputText, isEmptyNewTaskInput, focusNewTaskInput, clearNewTaskInput};