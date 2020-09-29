const NEW_TASK_INPUT_ID = "newTaskInput";

function getNewTaskInput(){
    return document.getElementById(NEW_TASK_INPUT_ID);
}

function clearNewTaskInput(){
    getNewTaskInput().value = "";
}

function focusNewTaskInput(){
    getNewTaskInput().focus();
}

function isNewTaskInputEmpty(){
    return (getNewTaskInput().value === "");
}