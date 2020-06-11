import React from 'react';
import ReactDom from 'react-dom';
import MeetingReminder from '../components/MeetingReminder';
import {cleanup} from "@testing-library/react";
// import { shallow, configure } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// configure({ adapter: new Adapter() });

afterEach(cleanup);
it("renders without crashing", () => {
    const div2 = document.createElement("div");
    ReactDom.render(MeetingReminder, div2);
})

// describe('<MeetingReminder />', () => {
//     it("modal open", () => {
//       const wrapper = shallow(<MeetingReminder />);
//       //wrapper.find('#unit-test').simulate('submit');
//       wrapper.find('#unit-test').simulate('click');
//       expect(wrapper.state().visible).toBeTrue();
//     });
//   });
