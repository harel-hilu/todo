import { addNewTaskDriver } from "./Title.driver";

describe("Title: ", () => {
    const {getTitleText, createTitle} = addNewTaskDriver();

    it('should render title without tasks', () => {
        createTitle(0, 0);
        
        expect(getTitleText()).toBe("Create your first task");
    });
    
    it("should render a title with 5 done tasks out of 10", () => {
        createTitle(5, 10);

        expect(getTitleText()).toBe("5/10 tasks");
    });
    
    it("should render a title 10 uncompleted tasks", () => {
        createTitle(0, 10);

        expect(getTitleText()).toBe("0/10 tasks");
    });
    
    it("should render a title with 10 completed tasks", () => {
      createTitle(10, 10);

      expect(getTitleText()).toBe("10/10 tasks");
    });
})
