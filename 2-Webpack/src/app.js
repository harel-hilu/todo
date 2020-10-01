import {getTaskToAddInputElem, getTaskToAddInputText, isEmptyTaskToAddInput, focusTaskToAddInput, clearTaskToAddInput} from "./taskToAddInput.js";

window.addEventListener("load", () => {
    focusTaskToAddInput();
    document.getElementById("addTaskButton").addEventListener("click", addTaskHandler);
    
    getTaskToAddInputElem().addEventListener("keydown", (e) => { 
        if (e.code === "Enter"){
            addTaskHandler();
        }
    })
});

let addTaskHandler = () => {
    if (!isEmptyTaskToAddInput()){
        addTask(getTaskToAddInputText());
        clearTaskToAddInput();
        focusTaskToAddInput();    
    }    
};

let addTask = (taskText) => {
    const newTaskDiv = document.createElement("div");
    newTaskDiv.append(document.createTextNode(taskText));
    document.getElementById("tasksList").append(newTaskDiv);
};

// import { v4 } from 'uuid';
// const person = {
//     name: "Vita",
//     getFullName: function (lastname) {
//         return this.name + " " + lastname;
//     } 
// }
// let x = v4();
// alert(x);
// window.localStorage.setItem(x, "c");
//alert(window.localStorage.getItem("a"));
//alert(person.getFullName.bind({name: "Vita"}, "Bertman")("bertman"));