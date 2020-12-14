import { useEffect, useState } from 'react';
import { TasksById } from '../../../../common/Tasks';
import { getAllTasksFromServer } from '../../dataAccess/server-api';

export default function useTasks() {
    const [tasks, setTasks] = useState<TasksById>({});

    useEffect(() => {
        (async () => {
            setTasks(await getAllTasksFromServer());
        })();
    }, []);

    return [tasks, setTasks] as const;
}