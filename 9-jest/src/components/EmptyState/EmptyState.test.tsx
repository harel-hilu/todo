import React from 'react';
import EmptyState from "./EmptyState";
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { emptyStateTestHelper } from './EmptyState.testHelper';

Enzyme.configure({ adapter: new Adapter() })

let wrapper = mount(<EmptyState />);
const { getTitle, getParagraph } = emptyStateTestHelper(wrapper);

beforeEach(() => {
    wrapper = mount(<EmptyState />);
});

it("see the empty state", () => {
    expect(getTitle().text()).toBe("Break your goals into simple tasks");
    expect(getParagraph()).toHaveLength(1);
});