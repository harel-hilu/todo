window.addEventListener('load', function(){
    newTaskInput = document.getElementById("newTaskInput");
    tasksList = document.getElementById("tasksList");
    newTaskInput.focus();

    document.getElementById("addItem").addEventListener("click", function(){
        if (newTaskInput.value != ""){
            addTask(tasksList, newTaskInput);
        }});

    document.getElementById("newTaskInput").addEventListener("keydown", function(e){
        if ((newTaskInput.value != "") && (e.code == "Enter")) {
            addTask(tasksList, newTaskInput);
        }});
});
    
// Adds a new task and return the number of new tasks
function addTask(tasksList, newTaskInput){
    taskLine = createTaskLine();
    taskLine.appendChild(createCheckbox());
    taskLine.appendChild(createLabelTask(newTaskInput.value));
    taskLine.appendChild(createEditButton());
    taskLine.appendChild(createDeleteButton()); 
    tasksList.appendChild(taskLine);
    
    newTaskInput.value = '';
    newTaskInput.focus();   
}

// taskLine represents a task, with: checkbox, label, edit button and delete button
function createTaskLine(){
    taskLine = document.createElement("div");
    taskLine.setAttribute("class", "task");

    // Show all buttons under task dic on mouse enter
    taskLine.addEventListener("mouseenter", function(e) { toggleButtonsHide(e.target) });

    // Hide buttons
    taskLine.addEventListener("mouseleave", function(e) { toggleButtonsHide(e.target) });

    return taskLine;
}

function toggleButtonsHide(element){
    let buttons =  element.querySelectorAll("button");
    for (let i = 0; i < buttons.length; i++){
        buttons[i].classList.toggle("hideButtons");
    }
}

function createLabelTask(inputValue){
    labelTask = document.createElement("label");
    labelTask.appendChild(document.createTextNode(inputValue));
    labelTask.setAttribute("contenteditable", "true");
    labelTask.setAttribute("class", "label");

    return labelTask;
}

function createDeleteButton(){
    deleteTaskButton = document.createElement("button");
    deleteTaskButton.appendChild(document.createTextNode("Delete"));
    deleteTaskButton.addEventListener("click", function(e){ e.target.parentNode.remove() });
    deleteTaskButton.setAttribute("class", "taskButtons hideButtons");

    return deleteTaskButton;
}

function createEditButton(){
    editTaskButton = document.createElement("button");
    editTaskButton.appendChild(document.createTextNode("Edit"));
    editTaskButton.addEventListener("click", function(e){ e.target.parentNode.querySelector("label").focus() });
    editTaskButton.setAttribute("class", "taskButtons hideButtons editButton");

    return editTaskButton;
}

function createCheckbox(){
    checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.addEventListener("click", function(e){
        e.target.parentNode.querySelector("label").classList.toggle("labelStrike");
        e.target.parentNode.querySelector(".editButton").disabled = !(e.target.parentNode.querySelector(".editButton").disabled);
    });

    return checkbox;
}
