import { emptyStateDriver } from './EmptyState.driver';

describe('EmptyState: ', () => {
    const { given, then } = emptyStateDriver();

    it("should render a title", () => {
        given.createEmptyStateWrapper();
        
        expect(then.hasTitle()).toBe(true);
    });

    it("should render a paragraph", () => {
        given.createEmptyStateWrapper();
        
        expect(then.hasParagraph()).toBe(true);
    });
});
