import {classes} from "./headerStyle.js";

const titleDomId = "title";

export const createAppHeader = (numOfTasks, numOfDoneTasks) => {
    let titleElement = document.getElementById(titleDomId);

    if (titleElement === null) {
        createTitleElement();
    } else {
        titleElement.innerHTML = (numOfTasks === 0 && numOfDoneTasks === 0) ?
            "Create your first task" : 
            (numOfDoneTasks + "/" + numOfTasks + " tasks");    
    }
}

const createTitleElement = () => {
    const titleElement = document.createElement("h1");
    titleElement.setAttribute("id", titleDomId);
    titleElement.classList.add(classes.title);
    document.getElementById("app").append(titleElement);
}

