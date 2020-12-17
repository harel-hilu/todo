import { AppEnzymeDriver } from "./App.driver";

describe("App: ", () => {
    const { given, when, then } = AppEnzymeDriver();    

     it('should render Title once', async () => {
        given.mockServerTasks({});
        await given.createAppWrapper();

        expect(then.numOfTitleComponents()).toBe(1);
    });

    it('should render TaskLine once', async () => {
        given.mockServerTasks({});
        await given.createAppWrapper();

        expect(then.numOfTaskListComponents()).toBe(1);
    });
    
    it('should render empty state once', async() => {
        given.mockServerTasks({});
        await given.createAppWrapper();

        expect(then.numOfEmptyStateComponents()).toBe(1);
    });

    it('should NOT render empty state when server has tasks', async() => {
        given.mockServerTasks({"1": {id: "1", text: "wow", isDone: true}});
        await given.createAppWrapper();

        expect(then.numOfEmptyStateComponents()).toBe(0);
    });
});