import React from 'react';
import ReactDom from 'react-dom';
import Rate_RateTutor from '../components/Rate_ViewTutor';
import {cleanup} from "@testing-library/react";
// import renderer from 'react-test-renderer';
// import { shallow } from 'enzyme';

afterEach(cleanup);
it('renders correctly', () => {
    const div4 = document.createElement("div");
    debugger;
    ReactDom.render(Rate_ViewTutor, div4);
});

describe("Rate_VieewTutor", () => {
    it("should render my component", () => {
        const component = shallow(<Rate_ViewTutor />);
        const star = component.find('StarRatingComponent');
        star.props().onStarClick({target: {
                name: 'myName',
                value: 'myValue'
            }});
        // then
        expect(component.state('StarRatingComponent')).toEqual('myValue');
    });
});
