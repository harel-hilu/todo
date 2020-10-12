let createTaskDiv = (taskId) => {
    const newTaskDiv = document.createElement("div");
    newTaskDiv.setAttribute("id", taskId);

    return newTaskDiv;
};

let createLabel = (taskText) => {
    const label = document.createElement("label");
    label.setAttribute("contenteditable", "true");
    label.append(document.createTextNode(taskText));

    return label;
}

let createCheckbox = (isComplete) => {
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");

    if(isComplete) {
        checkbox.setAttribute("checked", "checked");
    }

    return checkbox;
}

let createEditButton = (newTaskDiv) => {
    const editButton = document.createElement("button");
    editButton.appendChild(document.createTextNode("Edit"));

    return editButton;
}

let createDeleteButton = (newTaskDiv) => {
    const deleteButton = document.createElement("button");
    deleteButton.appendChild(document.createTextNode("Delete"));

    return deleteButton;
}

export {createTaskDiv, createCheckbox, createDeleteButton, createEditButton, createLabel};