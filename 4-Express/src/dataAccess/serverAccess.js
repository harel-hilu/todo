const errorMessage = "There was a problem accessing the server:";

export const saveTaskToServer = (task) => {
    return fetch("http://localhost:3000/api/v1/tasks/" + task.id, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    }).then(enrichFetchError);
}

export const getAllTasksFromServer = () => 
    fetch("http://localhost:3000/api/v1/tasks")
    .then(enrichFetchError);

export const deleteTask = (id) => {
    return fetch("http://localhost:3000/api/v1/tasks/" + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(enrichFetchError);
}

const enrichFetchError = (res) => {
    if (res.ok) {
        return res.json();
    } else {
        throw res.statusText;
    }
};