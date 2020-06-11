import React from 'react';
import ReactDom from 'react-dom';
import Attendance_Generate from '../components/Attendance_Generate';
import {cleanup} from "@testing-library/react";
// import { shallow, configure } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// configure({ adapter: new Adapter() });

afterEach(cleanup);
it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDom.render(Attendance_Generate, div);
})

// describe('<Attendance_Generate />', () => {
//     it("modal open", () => {
//       const wrapper = shallow(<Attendance_Generate />);
//       //wrapper.find('#unit-test').simulate('submit');
//       wrapper.find('#unit-test').simulate('click');
//       expect(wrapper.state().visible).toBeTrue();
//     });
//   });