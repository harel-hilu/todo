import { AppPuppeteerDriver } from "./App.driver";

describe("App e2e: ", () => {
  const { given, when, then } = AppPuppeteerDriver();

  afterEach(() => {
    then.closeBrowser();
  });

  it("should render one task after adding a task", async () => {
      await given.goToTasksSite();

      const newText = "wow";
      await when.addTask(newText);
      
      expect(await then.getFirstTaskText()).toBe(newText);
      expect(await then.getNumOfTasks()).toBe(1);
  });
  
  it("should render task with the new text after updating the text", async () => {
    await given.goToTasksSite();
      
    const newText = "hello";
    await when.addTask(newText);
    await when.addTextToTask(" world")
    
    expect(await then.getFirstTaskText()).toBe("hello world");
    expect(await then.getNumOfTasks()).toBe(1);
  });
  
  it("should render no tasks after adding and deleting a task", async () => {
    await given.goToTasksSite();

    const newText = "hello";
    await when.addTask(newText);
    await when.deleteFirstTask();

    expect(await then.getNumOfTasks()).toBe(0);
  });
});