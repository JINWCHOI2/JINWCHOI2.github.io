/////////////////////////////////////////////////////////////////////////////
//Contains a list of the tutoring session schedule and the reservation history.
/////////////////////////////////////////////////////////////////////////////

import React, { Component } from 'react';
import axios from 'axios';
import { Table, Navbar, Nav, Jumbotron, Button } from 'react-bootstrap';
import Timetable from 'react-timetable-events'
import moment from 'moment';
import '../App.css';

class ViewScheduleHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reservations: [], //all logs
            current_reservations: [], //logs from this sem
            old_reservations: [],   //logs from past sem
            cal_events: [],
            now: '',
            empty: '',
            semesterInfo: '',
            currentUser: {},
            timetableProps: [],
        }
    }

    componentDidMount = () => {
        this.handleLogin();
        this.getReservationLog();
        this.checkIfTutor();
    };

    handleLogin() {
        axios.get('/signup/' + this.props.match.params.id)
            .then(response => {
                this.setState({ currentUser: response.data, loggedin: true });
                console.log(this.state.currentUser);
            })
            .catch(error => {
                console.log("check login error", error);
            });
    }

    /*get reservation records from the database*/
    /*classify records by term*/
    getReservationLog = () => {
        const today = this.getSemester();
        axios.get('/reservations')
            .then((response) => {
                const data = response.data;
                console.log("data received");
                const old = [];
                const cur = [];
                for (let i = 0; i < data.length; i++) {
                    if (data[i].tutor.email == localStorage.getItem("currentUserEmail") || this.props.match.params.id === data[i].tutee.id) {
                        if (data[i].semester === today) cur.push(data[i]);
                        else old.push(data[i]);
                    }
                }
                this.setState({ reservations: data });
                this.setState({ current_reservations: cur });
                this.setState({ old_reservations: old });
                //call function
                this.setEvents(this.state.current_reservations);
                //this.setEvents2(this.state.current_reservations);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    /*display records of past semesters*/
    displayReservation = (old_reservations) => {
        if (!old_reservations.length) {
            return (
                <tr>
                    <td>No past records yet!</td>
                </tr>
            );
        }
        return old_reservations.map((old_reservations, index) => (
            <tr key={index}>
                <td>{old_reservations.semester}</td>
                <td>{old_reservations.course}</td>
                <td>{old_reservations.tutor.fName + ' ' + old_reservations.tutor.lName}</td>
                <td>{old_reservations.tutee.name}</td>
                <td>{old_reservations.daysOfWeek + ' from ' + old_reservations.from + ':00 to ' + old_reservations.to + ':00'}</td>
            </tr>
        ));
    };

    /*set events obj for the calendar app*/
    setEvents2 = (current_reservations) => {
        const appointments = {
            MONDAY: [],
            TUESDAY: [],
            WEDNESDAY: [],
            THURSDAY: [],
            FRIDAY: []
        };
        const time = '2020-01-01T';
        //console.log(current_reservations);
        for (let i = 0; i < current_reservations.length; i++) {
            const day = current_reservations[i].daysOfWeek;
            const event = {
                id: current_reservations[i]._id,
                name: current_reservations[i].course,
                type: 'custom',
                startTime: moment(time + String(current_reservations[i].from) + ':00:00'),
                endTime: moment(time + String(current_reservations[i].to) + ':00:00'),
            }
            appointments[day].push(event);
        }
        this.setState({ cal_events: appointments });
        if (!current_reservations.length) {
            this.setState({ empty: true });
        }
    }

    /*set events obj for the calendar app*/
    setEvents = (current_reservations) => {
        var colors = ["#BE81F7", "#FF9933", "#0080FF", "#F7819F"] //violet, orange, green, pink
        const appointments = {
            MONDAY: [],
            TUESDAY: [],
            WEDNESDAY: [],
            THURSDAY: [],
            FRIDAY: []
        };
        const time = '2020-01-01T';
        //console.log(current_reservations);
        for (let i = 0; i < current_reservations.length; i++) {
            const day = current_reservations[i].daysOfWeek;
            const event = {
                id: current_reservations[i]._id,
                name: current_reservations[i].course,
                colorIndex: i % 4,
                type: 'custom',
                startTime: moment(time + String(current_reservations[i].from) + ':00:00'),
                endTime: moment(time + String(current_reservations[i].to) + ':00:00'),
                tutor: current_reservations[i].tutor.fName + ' ' + current_reservations[i].tutor.lName,
                tutee: current_reservations[i].tutee.name,
            }
            appointments[day].push(event);
        }
        let timetableProps = {
            events: appointments,
            hoursInterval: [8, 24],
            timeLabel: "Time",
            renderHour(hour, defaultAttributes, styles) {
                return (
                    <div
                        {...defaultAttributes}
                        key={hour}
                        style={{
                            ...defaultAttributes.style,
                            textAlign: "center",
                        }}
                    >
                        {hour}
                    </div>
                );
            },
            renderEvent(event, defaultAttributes, styles) {
                return (
                    <div
                        {...defaultAttributes}
                        title={event.name}
                        key={event.id}
                        style={{
                            ...defaultAttributes.style,
                            background: colors[event.colorIndex],
                            borderRadius: "50px"
                        }}
                    >
                        <span className={styles.event_info} id="font-large">[ {event.name} ]</span>
                        <span className={styles.event_info} id="font-large">Tutor: {event.tutor}</span>
                        <span className={styles.event_info} id="font-large">Tutee: {event.tutee}</span>
                        <span className={styles.event_info} id="font-medium">
                            {event.startTime.format("HH:mm")} -{" "}
                            {event.endTime.format("HH:mm")}
                        </span>
                    </div>
                );
            }
        }
        this.setState({ timetableProps: timetableProps });
        if (!current_reservations.length) {
            this.setState({ empty: true });
        }
    }

    /* when there's no reservation */
    showMsg = (empty) => {
        if (empty) {
            return (
                <div>
                    <h4>
                        Seems like reservations haven't been made this semester!
                        {'    '}
                        <Button variant="outline-secondary" href={`/Reservation_Search/${this.state.currentUser.id}`}>Click here to start</Button>
                    </h4>
                </div>
            )
        }
    };

    /*get info of this semester*/
    getSemester = () => {
        var year = '';
        if (moment().format('MM') > '07') {
            year += 'Fall ';
        } else {
            year += 'Spring ';
        }
        year += String(moment().format('YYYY'));
        this.setState({ semesterInfo: year });
        localStorage.setItem("semInfo", this.state.semesterInfo);
        return year;
    };

    checkIfTutor() {
        axios.get('/tutors')
            .then(res => {
                console.log("checking");
                console.log(this.state.currentUser.name);
                for (let i = 0; i < res.data.length; i++) {
                    if (this.state.currentUser.email == res.data[i].email) {
                        console.log("found");
                        this.setState({ isTutor: true });
                    }
                }
                if (this.state.isTutor == true) {
                }
            });
    }

    //Return the ViewProfile, View Schedule & History only if the user is logged in
    getNavContent() {
        if (this.state.isTutor == true) {
            return (<><Nav.Link href={`/Attendance_Generate/${this.state.currentUser.id}`}>
                <center><h4><a className="btn btn-primary btn-md text-uppercase js-scroll-trigger">CHECK ATTENDANCE</a>
                </h4></center>
            </Nav.Link>
                <Nav.Link href={`/ViewProfile/${this.state.currentUser.id}`}>
                    <center><h4><a className="btn btn-primary btn-md text-uppercase js-scroll-trigger">VIEW PROFILE</a>
                    </h4></center>
                </Nav.Link><Nav.Link href={`/ViewScheduleHistory/${this.state.currentUser.id}`}>
                    <center><h4><a className="btn btn-primary btn-md text-uppercase js-scroll-trigger">SCEHDULE,
                        HISTORY</a></h4></center>
                </Nav.Link>
                <Nav.Link href={`/About_Us/${this.state.currentUser.id}`}>
                    <center><h4><a className="btn btn-primary btn-md text-uppercase js-scroll-trigger">
                        CONTACT US
                    </a></h4></center>
                </Nav.Link><Nav.Link href="/">
                    <button className="btn btn-primary btn-sm text-uppercase js-scroll-trigger">
                        <center><h4>Log Out</h4></center>
                    </button>
                </Nav.Link>
            </>)
        } else {
            return ((<>
                <Nav.Link href={`/ViewProfile/${this.state.currentUser.id}`}>
                    <center><h4><a className="btn btn-primary btn-md text-uppercase js-scroll-trigger">VIEW PROFILE</a>
                    </h4></center>
                </Nav.Link><Nav.Link href={`/ViewScheduleHistory/${this.state.currentUser.id}`}>
                    <center><h4><a className="btn btn-primary btn-md text-uppercase js-scroll-trigger">SCEHDULE, HISTORY</a>
                    </h4></center>
                </Nav.Link>
                <Nav.Link href={`/About_Us/${this.state.currentUser.id}`}>
                    <center><h4><a className="btn btn-primary btn-md text-uppercase js-scroll-trigger">
                        CONTACT US
                    </a></h4></center>
                </Nav.Link><Nav.Link href="/">
                    <button className="btn btn-primary btn-sm text-uppercase js-scroll-trigger">
                        <center><h4>Log Out</h4></center>
                    </button>
                </Nav.Link>
            </>))
        }
    }

    render() {
        return (
            <div className="container">
                <div><Navbar bg="light" variant="light">
                    <Navbar.Brand href={`/Home/${this.state.currentUser.id}`}>
                        <center><h4><a
                            className="btn btn-primary btn-md text-uppercase js-scroll-trigger"><b>FindMyTutor</b></a>
                        </h4></center>
                    </Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href={`/Reservation_Search/${this.state.currentUser.id}`}>
                            <center><h4><a className="btn btn-primary btn-md text-uppercase js-scroll-trigger">
                                MAKE A NEW RESERVATION
                            </a></h4></center>
                        </Nav.Link>
                        <Nav.Link href={`/MeetingReminder/${this.state.currentUser.id}`}>
                            <center><h4><a className="btn btn-primary btn-md text-uppercase js-scroll-trigger">
                                SET A REMINDER
                            </a></h4></center>
                        </Nav.Link>
                        <Nav.Link href={`/Rate_ViewTutor/${this.state.currentUser.id}`}>
                            <center><h4><a className="btn btn-primary btn-md text-uppercase js-scroll-trigger">
                                RATE TUTOR</a></h4></center>
                        </Nav.Link>
                        {this.getNavContent()}
                    </Nav>
                </Navbar></div>
                <div>
                    <header className="masthead">
                        <div className="container">
                            <div className="intro-text">
                            </div>
                        </div>
                    </header>
                    <section className="bg-light page-section" id="portfolio">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12 text-center">
                                    <h1>VIEW SCHEDULE & HISTORY</h1>
                                </div>
                            </div>
                        </div>
                    </section>
                    <br></br><br></br>
                    <h3>Your tutoring schudule on {this.state.semesterInfo} Semester</h3>
                    {/* <Timetable events={this.state.cal_events[0]}/> */}
                    <Jumbotron>
                        {this.showMsg(this.state.empty)}
                        <Timetable {...this.state.timetableProps} />
                        {/* {<Timetable
                            hoursInterval={[8, 24]}
                            timeLabel="Time"
                            events={this.state.cal_events}
                            renderHour={this.renderHour}
                            renderEvent={this.renderEvent}
                        />} */}
                    </Jumbotron>
                </div>
                <div>
                    <br></br>
                    <h3>Your past tutoring records!</h3>
                    <center><Table responsive>
                        <thead>
                            <tr>
                                <th>Semeter</th>
                                <th>Course</th>
                                <th>Tutor</th>
                                <th>Tutee</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.displayReservation(this.state.old_reservations)}
                        </tbody>
                    </Table></center>
                </div>
                <div>
                </div>
                <footer className="footer">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-md-4">
                                <span className="copyright">Copyright &copy; Find My Tutor 2020</span>
                            </div>
                            <div className="col-md-4">
                                <ul className="list-inline social-buttons">
                                    <li className="list-inline-item">
                                        <a href="#something">
                                            <i className="fa fa-twitter"></i>
                                        </a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href="#something">
                                            <i className="fa fa-facebook-f"></i>
                                        </a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href="#something">
                                            <i className="fa fa-linkedin-in"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-4">
                                <ul className="list-inline quicklinks">
                                    <li className="list-inline-item">
                                        <a href="#something">Privacy Policy</a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href="#something">Terms of Use</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </footer>

            </div>
        )
    }
}

export default ViewScheduleHistory;