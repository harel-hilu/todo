import React from 'react';
import EmptyState from "./EmptyState";
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

export const emptyStateDriver = () => {
    let wrapper: Enzyme.ReactWrapper;

    return {
        given: {
            createEmptyStateWrapper: () => wrapper = mount(<EmptyState />)
        },
        then: {
            hasTitle: () => wrapper.find("h4").text() !== "",
            hasParagraph: () => wrapper.find("p").text() !== ""
        }
    }
}