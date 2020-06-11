import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import './bootstrap.min.css'
import './agency.min.css'
import './timetable.css'
import Home from './components/Home';
import Admin_Home from './components/Admin_Home';
import Admin_EditTutor from './components/Admin_EditTutor';
import Admin_ReminderLog from './components/Admin_ReminderLog';
import Admin_AttendanceLog from './components/Admin_AttendanceLog';
import Admin_AddTutor from './components/Admin_AddTutor';
import Admin_ReservationLog from './components/Admin_ReservationLog';
import Admin_ShowTutor from './components/Admin_ShowTutor';
import Attendance_Generate from './components/Attendance_Generate';
import Attendance_Scan from './components/Attendance_Scan';
import EditProfile from './components/EditProfile';
import MeetingReminder from './components/MeetingReminder';
import Rate_ViewTutor from './components/Rate_ViewTutor';
import Rate_DetailTutor from './components/Rate_DetailTutor';
import Rate_RateTutor from "./components/Rate_RateTutor";
import Reservation_Success from "./components/Reservation_Success"
import Reservation_Confirm from './components/Reservation_Confirm';
import Reservation_Reserve from './components/Reservation_Reserve';
import Reservation_Search from './components/Reservation_Search';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ViewProfile from './components/ViewProfile';
import ViewScheduleHistory from './components/ViewScheduleHistory';
import Admin_ViewTutorDetail from "./components/Admin_ViewTutorDetail";
import About_Us from './components/About_Us';

// import 'bootstrap/dist/css/bootstrap.css'

ReactDOM.render(
    <Router>
        <div>
            <Route exact path='/' component={App} />
            <Route exact path='/Home/:id' component={Home} />
            <Route path='/Admin_Home/:id' component={Admin_Home} />
            <Route path='/Admin_EditTutor/:id' component={Admin_EditTutor} />
            <Route path='/Admin_ViewTutorDetail/:id' component={Admin_ViewTutorDetail} />
            <Route path='/Admin_ReminderLog/:id' component={Admin_ReminderLog} />
            <Route path='/Admin_AttendanceLog/:id' component={Admin_AttendanceLog} />
            <Route path='/Admin_AddTutor/:id' component={Admin_AddTutor} />
            <Route path='/Admin_ReservationLog/:id' component={Admin_ReservationLog} />
            <Route path='/Admin_ShowTutor/:id' component={Admin_ShowTutor} />
            <Route path='/Attendance_Generate/:id' component={Attendance_Generate} />
            <Route path='/Attendance_Scan/:id/:aid' component={Attendance_Scan} />
            <Route path='/EditProfile/:id' component={EditProfile} />
            <Route path='/MeetingReminder/:id' component={MeetingReminder} />
            <Route path='/Reservation_Reserve/:id' component={Reservation_Reserve} />
            <Route path='/Reservation_Confirm/:id' component={Reservation_Confirm} />
            <Route path='/Rate_ViewTutor/:id' component={Rate_ViewTutor} />
            <Route path='/Rate_DetailTutor/:id/:id' component={Rate_DetailTutor} />
            <Route path='/Rate_RateTutor/:id' component={Rate_RateTutor} />
            <Route path='/Reservation_Search/:id' component={Reservation_Search} />
            <Route path='/Reservation_Success/:id' component={Reservation_Success} />
            <Route path='/SignIn' component={SignIn} />
            <Route path='/SignUp' component={SignUp} />
            <Route path='/ViewProfile/:id' component={ViewProfile} />
            <Route path='/ViewScheduleHistory/:id' component={ViewScheduleHistory} />
            <Route path='/About_Us/:id' component={About_Us} />
        </div>
    </Router>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
