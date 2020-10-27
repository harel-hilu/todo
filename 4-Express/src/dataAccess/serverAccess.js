const errorMessage = "There was a problem accessing the server:";

export const saveTaskToServer = (task) => {
    return fetch("http://localhost:3000/API/v1/tasks/" + task.id, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    }).catch(err => console.log(errorMessage, err));
}

export const getAllTasksFromServer = () => {
    return fetch("http://localhost:3000/API/v1/tasks")
    .then(response => response.json())
    .catch(err => console.log(errorMessage, err));
}

export const deleteTask = (id) => {
    return fetch("http://localhost:3000/API/v1/tasks/" + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    }).catch(err => console.log(errorMessage, err));
}