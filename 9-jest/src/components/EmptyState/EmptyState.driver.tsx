import React from 'react';
import EmptyState from "./EmptyState";
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

export class EmptyStateDriver {
    private wrapper: Enzyme.ReactWrapper;

    constructor() {
        this.wrapper = mount(<EmptyState />)
    }

    hasTitle = () => this.wrapper.find("h4").text() !== "";
    hasParagraph = () => this.wrapper.find("p").text() !== "";
}