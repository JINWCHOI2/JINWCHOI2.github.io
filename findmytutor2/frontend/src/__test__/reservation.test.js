import React from 'react';
import ReactDom from 'react-dom';
import Reservation_Search from '../components/Reservation_Search';
import {cleanup} from "@testing-library/react";
// import renderer from 'react-test-renderer';
// import { shallow } from 'enzyme';

afterEach(cleanup);
describe("Reservation_Search", () => {
    it("should render my component", () => {
        const component = shallow(<Reservation_Search />);
        const form = component.find('Form.Control');
        form.props().onChange({target: {
                name: 'myName',
                value: 'myValue'
            }});
        // then
        expect(component.state('Form.Control')).toEqual('myValue');
    });
});


it('renders correctly', () => {
    const span = document.createElement("span");
    debugger;
    ReactDom.render(Reservation_Search, span);
    // const tree = renderer.create(<Link>Facebook</Link>).toJSON();
    // expect(tree).toMatchSnapshot();
});



