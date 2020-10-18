export const createTaskElement = (taskId) => {
    const newTaskDiv = document.createElement("div");
    newTaskDiv.setAttribute("id", taskId);
    newTaskDiv.setAttribute("class", "task");

    return newTaskDiv;
};

export const createTaskLabel = (taskText) => {
    const label = document.createElement("label");
    label.setAttribute("contenteditable", "true");
    label.append(document.createTextNode(taskText));
    label.setAttribute("class", "task-label");

    return label;
}

export const createTaskCheckbox = (isComplete) => {
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("class", "task-checkbox");

    if(isComplete) {
        checkbox.setAttribute("checked", "checked");
    }

    return checkbox;
}

export const createTaskEditButton = () => {
    const editButton = document.createElement("button");
    editButton.appendChild(document.createTextNode("Edit"));
    editButton.setAttribute("class", "task-buttons");

    return editButton;
}

export const createTaskDeleteButton = () => {
    const deleteButton = document.createElement("button");
    deleteButton.appendChild(document.createTextNode("Delete"));
    deleteButton.setAttribute("class", "task-buttons");

    return deleteButton;
}

export const updateTasksTitle = (numOfTasks, numOfDoneTasks) => {
    document.getElementById("title").innerHTML =
        (numOfTasks === 0 && numOfDoneTasks === 0) ?
        "Create your first task" : (numOfDoneTasks + "/" + numOfTasks + " tasks");
}