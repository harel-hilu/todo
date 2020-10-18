const NEW_TASK_INPUT_ID = "taskToAddInput";

export const getNewTaskInputElement = () => document.getElementById(NEW_TASK_INPUT_ID);
export const getNewTaskInputText = () => document.getElementById(NEW_TASK_INPUT_ID).value;
export const isEmptyNewTaskInput = () => (getNewTaskInputElement().value === "");
export const focusNewTaskInput = () => getNewTaskInputElement().focus();
export const clearNewTaskInput = () => getNewTaskInputElement().value = "";