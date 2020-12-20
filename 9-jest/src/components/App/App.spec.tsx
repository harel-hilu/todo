import { AppEnzymeDriver } from "./App.driver";
import {Chance} from 'chance';
import { Task } from "../../../../common/Tasks";

describe("App: ", () => {
    const { given, when, then } = AppEnzymeDriver();    
    const chance = new Chance();

     it('should render Title once', async () => {
         aTask();
        given.tasks({});
        await given.createAppWrapper();

        expect(then.numOfTitleComponents()).toBe(1);
    });

    it('should render TaskLine once', async () => {
        given.tasks({});
        await given.createAppWrapper();

        expect(then.numOfTaskListComponents()).toBe(1);
    });
    
    it('should render empty state once', async() => {
        given.tasks({});
        await given.createAppWrapper();

        expect(then.numOfEmptyStateComponents()).toBe(1);
    });

    it('should NOT render empty state when server has tasks', async() => {
        const task = aTask();
        given.tasks({[task.id]: task});
        await given.createAppWrapper();

        expect(then.numOfEmptyStateComponents()).toBe(0);
    });

    it('should render TaskLine after adding a task', async () => {
        given.tasks({});
        await given.createAppWrapper();

        await when.addTask("hi1");
        await when.addTask("hi2");
        await when.addTask("hi3");

        expect(then.numOfTaskLineComponents()).toBe(3);
    });

    function aTask(): Task {
        return {
            id: chance.guid(),
            text: chance.string(),
            isDone: chance.bool()
        }
    }
});