window.addEventListener('load', function(){
    document.getElementById("newTaskInput").focus();

    document.getElementById("addItem").addEventListener("click", function(){
        if (document.getElementById("newTaskInput").value !== ""){
            addTask();
    }});

    document.getElementById("newTaskInput").addEventListener("keydown", function(e){
        if ((document.getElementById("newTaskInput").value !== "") && (e.code === "Enter")) {
            addTask();
    }});
});
    
function addTask(){
    let taskLine = document.createElement("div");
    taskLine.setAttribute("class", "task");
    taskLine.appendChild(createCheckbox());
    taskLine.appendChild(createLabelTask(document.getElementById("newTaskInput").value));
    taskLine.appendChild(createEditButton());
    taskLine.appendChild(createDeleteButton()); 
    taskLine.addEventListener("mouseenter", function(e) { toggleButtonsHide(e.target) });
    taskLine.addEventListener("mouseleave", function(e) { toggleButtonsHide(e.target) });

    document.getElementById("tasksList").appendChild(taskLine);
    document.getElementById("newTaskInput").value = '';
    document.getElementById("newTaskInput").focus();   
}

function toggleButtonsHide(element){
    let buttons =  element.querySelectorAll("button");

    for (let i = 0; i < buttons.length; i++){
        buttons[i].classList.toggle("hideButtons");
    }
}

function createLabelTask(inputValue){
    let labelTask = document.createElement("label");
    labelTask.appendChild(document.createTextNode(inputValue));
    labelTask.setAttribute("contenteditable", "true");
    labelTask.setAttribute("class", "label");

    return labelTask;
}

function createDeleteButton(){
    let deleteTaskButton = document.createElement("button");
    deleteTaskButton.appendChild(document.createTextNode("Delete"));
    deleteTaskButton.addEventListener("click", function(e){ e.target.parentNode.remove() });
    deleteTaskButton.setAttribute("class", "taskButtons hideButtons");

    return deleteTaskButton;
}

function createEditButton(){
    let editTaskButton = document.createElement("button");
    editTaskButton.appendChild(document.createTextNode("Edit"));
    editTaskButton.addEventListener("click", function(e){ e.target.parentNode.querySelector("label").focus() });
    editTaskButton.setAttribute("class", "taskButtons hideButtons editButton");

    return editTaskButton;
}

function createCheckbox(){
    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.addEventListener("click", function(e){
        e.target.parentNode.querySelector("label").classList.toggle("labelStrike");
        e.target.parentNode.querySelector(".editButton").disabled = !(e.target.parentNode.querySelector(".editButton").disabled);
    });

    return checkbox;
}
