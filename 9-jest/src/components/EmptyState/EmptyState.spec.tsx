import { EmptyStateDriver } from './EmptyState.driver';

describe('EmptyState: ', () => {
    it("should render a title", () => {
        const driver = new EmptyStateDriver();
        
        expect(driver.hasTitle()).toBeTruthy();
    });

    it("should render a paragraph", () => {
        const driver = new EmptyStateDriver();
        
        expect(driver.hasParagraph()).toBeTruthy();
    });
});
