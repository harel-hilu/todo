export const saveTasksToServer = (todo) => {
    return window.fetch("http://localhost:3000/save", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
    });
}

export const getTasksFromServer = 
    () => window.fetch("http://localhost:3000/get").then(response => response.json());