import { addNewTaskDriver } from "./Title.driver";

describe("Title: ", () => {
    const { given, then } = addNewTaskDriver();

    it('should render title without tasks', () => {
        given.createTitleWrapper(0, 0);
        
        expect(then.getTitleText()).toBe("Create your first task");
    });
    
    it("should render a title with 5 done tasks out of 10", () => {
        given.createTitleWrapper(5, 10);

        expect(then.getTitleText()).toBe("5/10 tasks");
    });
    
    it("should render a title 10 uncompleted tasks", () => {
        given.createTitleWrapper(0, 10);

        expect(then.getTitleText()).toBe("0/10 tasks");
    });
    
    it("should render a title with 10 completed tasks", () => {
      given.createTitleWrapper(10, 10);

      expect(then.getTitleText()).toBe("10/10 tasks");
    });
})
