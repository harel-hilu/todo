window.addEventListener('load', function(){
    let numOfTasks = 0;
    newTask = document.getElementById("newTask");
    tasksList = document.getElementById("tasksList");

    document.getElementById("addItem").addEventListener("click", function(){ numOfTasks = addTask(tasksList, newTask, numOfTasks);});
    document.getElementById("newTask").addEventListener("keydown", function(e){ if (e.code == "Enter" ) numOfTasks = addTask(tasksList, newTask, numOfTasks);});
    
    newTask.focus();
});
    
// Adds a new task and return the number of new tasks
function addTask(tasksList, newTask, numOfTasks){
    if (newTask.value == ""){
        newTask.focus();   
        return;
    }

    taskLine = createTaskLine(numOfTasks);
    
    taskLine.appendChild(createCheckbox());
    taskLine.appendChild(createLabelTask(numOfTasks, newTask));
    taskLine.appendChild(createEditButton(numOfTasks));
    taskLine.appendChild(createDeleteButton(numOfTasks, tasksList)); 
    tasksList.appendChild(taskLine);
    
    newTask.value = '';
    newTask.focus();   
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

function createLabelTask(numOfTasks, newTask){
    labelTask = document.createElement("label");
    labelTask.appendChild(document.createTextNode(newTask.value));
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

    return deleteTaskButton;
}

function createEditButton(numOfTasks){
    editTaskButton = document.createElement("button");
    editTaskButton.appendChild(document.createTextNode("Edit"));
    editTaskButton.addEventListener("click", function(){document.getElementById("label" + numOfTasks).focus()});
    editTaskButton.setAttribute("class", "taskButtons");

    return editTaskButton;
}

function createCheckbox(){
    checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    addEventListener("click", function(e){
        e.target.checked ? e.target.parentNode.querySelector(".label").classList.add("labelStrike") : e.target.parentNode.querySelector(".label").classList.remove("labelStrike")});

    return checkbox;
}