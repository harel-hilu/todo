import { AppDriver } from "./App.driver";

describe("App: ", () => {
    const { 
        createAppWrapper, 
        update,
        numOfTaskListComponents,
        numOfEmptyStateComponents, 
        numOfTitleComponents,
        mockServerTasks,
     } = AppDriver();    

     it('should render Title once', async () => {
        mockServerTasks({});
        await createAppWrapper();

        expect(numOfTitleComponents()).toBe(1);
    });

    it('should render TaskLine once', async () => {
        mockServerTasks({});
        await createAppWrapper();

        expect(numOfTaskListComponents()).toBe(1);
    });
    
    it('should render empty state once', async() => {
        mockServerTasks({});
        await createAppWrapper();

        expect(numOfEmptyStateComponents()).toBe(1);
    });

    it('should NOT render empty state when server has tasks', async() => {
        mockServerTasks({"1": {id: "1", text: "wow", isDone: true}});
        await createAppWrapper();
        
        update();

        expect(numOfEmptyStateComponents()).toBe(0);
    });
});