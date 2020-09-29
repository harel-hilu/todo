window.addEventListener('load', function(){
    focusNewTaskInput();

    document.getElementById("addItem").addEventListener("click", function(){
        if (!isNewTaskInputEmpty()){
            addTask();
    }});

    getNewTaskInput().addEventListener("keydown", function(e){
        if ((!isNewTaskInputEmpty()) && (e.code === "Enter")) {
            addTask();
    }});
});
    
function addTask(){
    const taskLine = document.createElement("div");
    taskLine.setAttribute("class", "task");
    taskLine.appendChild(createCheckbox());
    taskLine.appendChild(createLabelTask(getNewTaskInput().value));
    taskLine.appendChild(createEditButton());
    taskLine.appendChild(createDeleteButton()); 
    taskLine.addEventListener("mouseenter", function(e) { toggleButtonsHide(e.target) });
    taskLine.addEventListener("mouseleave", function(e) { toggleButtonsHide(e.target) });

    document.getElementById("tasksList").appendChild(taskLine);
    clearNewTaskInput();
    focusNewTaskInput();
}

function toggleButtonsHide(taskLine){
    taskLine.querySelectorAll("button").forEach(element => {element.classList.toggle("hideButtons")});
}

function createLabelTask(inputValue){
    const labelTask = document.createElement("label");
    labelTask.appendChild(document.createTextNode(inputValue));
    labelTask.setAttribute("contenteditable", "true");
    labelTask.setAttribute("class", "label");

    return labelTask;
}

function createDeleteButton(){
    const deleteTaskButton = document.createElement("button");
    deleteTaskButton.appendChild(document.createTextNode("Delete"));
    deleteTaskButton.addEventListener("click", function(e){ e.target.parentNode.remove(); focusNewTaskInput(); });
    deleteTaskButton.setAttribute("class", "taskButtons hideButtons");

    return deleteTaskButton;
}

function createEditButton(){
    const editTaskButton = document.createElement("button");
    editTaskButton.appendChild(document.createTextNode("Edit"));
    editTaskButton.addEventListener("click", function(e){ e.target.parentNode.querySelector("label").focus() });
    editTaskButton.setAttribute("class", "taskButtons hideButtons editButton");

    return editTaskButton;
}

function createCheckbox(){
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.addEventListener("click", function(e){
        e.target.parentNode.querySelector("label").classList.toggle("labelStrike");
        e.target.parentNode.querySelector(".editButton").disabled = 
            !(e.target.parentNode.querySelector(".editButton").disabled);
    });

    return checkbox;
}
