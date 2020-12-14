import Enzyme from 'enzyme';

export const emptyStateTestHelper = (wrapper: Enzyme.ReactWrapper) => {
    return {
        getTitle: () => wrapper.find("h4"),
        getParagraph: () => wrapper.find("p")
    }
}