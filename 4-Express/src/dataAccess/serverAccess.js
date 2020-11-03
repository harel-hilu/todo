const url = window.location.href;

export const saveTaskToServer = (task) => {
    return fetch(`${url}api/v1/tasks/` + task.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    }).then(enrichFetchError);
}

export const getAllTasksFromServer = () => 
    fetch(`${url}api/v1/tasks/`)
    .then(enrichFetchError).then(res => res.json());

export const deleteTaskFromServer = (id) => {
    return fetch(`${url}api/v1/tasks/` + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(enrichFetchError);
}

const enrichFetchError = (res) => {
    if (!res.ok) {
        throw res.statusText;
    }

    return res;
};