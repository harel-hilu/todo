window.addEventListener('load', function(){
    let numOfTasks = 0;
    newTaskInput = document.getElementById("newTaskInput");
    tasksList = document.getElementById("tasksList");
    newTaskInput.focus();

    document.getElementById("addItem").addEventListener("click", function(){
        if (newTaskInput.value != ""){
            addTask(tasksList, newTaskInput, numOfTasks);
            numOfTasks++;
        }
    });

    document.getElementById("newTaskInput").addEventListener("keydown", function(e){
        if ((newTaskInput.value != "") && (e.code == "Enter")) {
            addTask(tasksList, newTaskInput, numOfTasks);
            numOfTasks++;
        }});
});
    
// Adds a new task and return the number of new tasks
function addTask(tasksList, newTaskInput, numOfTasks){
    taskLine = createTaskLine(numOfTasks);
    taskLine.appendChild(createCheckbox());
    taskLine.appendChild(createLabelTask(numOfTasks, newTaskInput));
    taskLine.appendChild(createEditButton(numOfTasks));
    taskLine.appendChild(createDeleteButton(numOfTasks, tasksList)); 
    tasksList.appendChild(taskLine);
    
    newTaskInput.value = '';
    newTaskInput.focus();   
    numOfTasks++;
    
    return numOfTasks;
}

// taskLine represents a task, with: checkbox, label, edit button and delete button
function createTaskLine(numOfTasks){
    taskLine = document.createElement("div");
    taskLine.setAttribute("id", "task" + numOfTasks);
    taskLine.setAttribute("class", "task");

    // Show all buttons under task dic on mouse enter
    taskLine.addEventListener("mouseenter", function() {
        let buttons =  this.querySelectorAll("button");
        for (let i = 0; i < buttons.length; i++){
            buttons[i].classList.remove("hideButtons");
        }
    });

    // Hide buttons
    taskLine.addEventListener("mouseleave", function() {
        let buttons =  this.querySelectorAll("button");
        for (let i = 0; i < buttons.length; i++){
            buttons[i].classList.add("hideButtons");
        }
    });

    return taskLine;
}

function createLabelTask(numOfTasks, newTaskInput){
    labelTask = document.createElement("label");
    labelTask.appendChild(document.createTextNode(newTaskInput.value));
    labelTask.setAttribute("contenteditable", "true");
    labelTask.setAttribute("id", "label" + numOfTasks);
    labelTask.setAttribute("class", "label");

    return labelTask;
}

function createDeleteButton(numOfTasks, tasksList){
    deleteTaskButton = document.createElement("button");
    deleteTaskButton.appendChild(document.createTextNode("Delete"));
    deleteTaskButton.addEventListener("click", function(){tasksList.removeChild(document.getElementById("task" + numOfTasks))});
    deleteTaskButton.setAttribute("class", "taskButtons");
    deleteTaskButton.setAttribute("class", "hideButtons");

    return deleteTaskButton;
}

function createEditButton(numOfTasks){
    editTaskButton = document.createElement("button");
    editTaskButton.appendChild(document.createTextNode("Edit"));
    editTaskButton.addEventListener("click", function(){document.getElementById("label" + numOfTasks).focus()});
    editTaskButton.setAttribute("class", "taskButtons");
    editTaskButton.setAttribute("class", "hideButtons");

    return editTaskButton;
}

function createCheckbox(){
    checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    addEventListener("click", function(e){
        e.target.checked ? e.target.parentNode.querySelector(".label").classList.add("labelStrike") : e.target.parentNode.querySelector(".label").classList.remove("labelStrike")});

    return checkbox;
}
