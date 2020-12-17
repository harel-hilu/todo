import { AppPuppeteerDriver } from "./App.driver";

describe("App e2e: ", () => {
  const {
    goToTasksSite,
    deleteFirstTask,
    getFirstTaskText,
    closeBrowser,
    addTask,
    getNumOfTasks,
    addTextToTask,
  } = AppPuppeteerDriver();

  afterEach(() => {
    closeBrowser();
  });

  it("should render one task after adding a task", async () => {
      await goToTasksSite();

      const newText = "wow";
      await addTask(newText);
      
      expect(await getFirstTaskText()).toBe(newText);
      expect(await getNumOfTasks()).toBe(1);
  });
  
  it("should render task with the new text after updating the text", async () => {
    await goToTasksSite();
      
    const newText = "hello";
    await addTask(newText);
    await addTextToTask(" world")
    
    expect(await getFirstTaskText()).toBe("hello world");
    expect(await getNumOfTasks()).toBe(1);
  });
  
  it("should render no tasks after adding and deleting a task", async () => {
    await goToTasksSite();

    const newText = "hello";
    await addTask(newText);
    await deleteFirstTask();

    expect(await getNumOfTasks()).toBe(0);
  });
});

  
          
