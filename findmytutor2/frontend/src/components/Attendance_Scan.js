/////////////////////////////////////////////////////////////////////////////
//Contains a QR code generated in Attendance_Scan.js. As tutees scan the code, the attendance of a tutoring session will be checked. This links to SignIn.js if the user has not signed in.
/////////////////////////////////////////////////////////////////////////////

import React, {Component} from 'react';
import axios from 'axios';
import {Nav, Button, Navbar} from 'react-bootstrap';
import moment from 'moment';
import '../App.css'

class Attendance_Scan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            attendance: {},
            checked: false,
            reservation: {},
            tutor: '',
            tutee: '',
            currentUser: {},
        }
    };

    componentDidMount = () => {
        this.handleLogin();
        this.updateAttendance();
    };

    handleLogin() {
        axios.get('/signup/' + this.props.match.params.id)
            .then(response => {
                this.setState({currentUser: response.data, loggedin: true});
                console.log(this.state.currentUser);
            })
            .catch(error => {
                console.log("check login error", error);
            });
    }

    updateAttendance = () => {
        //var check = false;
        axios.get('/attendance/' + this.props.match.params.aid)
            .then((response) => {
                if (response.data.attended === true)
                    this.setState({checked: true});
                this.setState({reservation: response.data.reservation});
                this.setState({tutor: response.data.reservation.tutor.fullName});
                this.setState({tutee: response.data.reservation.tutee.name});
                //check = true;
            })
            .catch((err) => {
                console.log(err);
            });

        //if(check){
        axios.put('/attendance/' + this.props.match.params.aid,
            {attended: true, tuteeTime: moment().format("HH:mm:ss")}
        )
            .then(response => {
                console.log(response.data);
                this.setState({attendance: response.data});
            })
            .catch((err) => {
                console.log(err);
            });
        //}
    };

    displayResult = (attendance, reservation, checked, tutor, tutee) => {
        //if(!attendance.length) return null;
        if (checked) {
            return (
                <div>
                    <h1>Oops! Seems like this attendance has already been record!</h1>
                    <p>Please try again.</p>
                </div>
            )
        } else if (!attendance) {
            return (
                <div>
                    <h1>Oops! We could'nt confirm your attendance.</h1>
                    <p>Please try again.</p>
                </div>
            )
        } else {
            //const reservation = attendance.reservation
            //console.log(reservation.course)
            return (
                <div>
                    <h1>Thank you! Your attendance has been recorded.</h1>
                    <p>Tutoring session for {reservation.course}</p>
                    <p>Tutor Name: {tutor}</p>
                    <p>Tutee {tutee}</p>
                    <p>Place of the session: {attendance.placeOfSession}</p>
                    <p>Attendance check request made at {attendance.tutorTime} {attendance.dateOfSession}</p>
                    <p>Attendance check comfirmed at {attendance.tuteeTime} {attendance.dateOfSession}</p>
                    {/* <ListGroup.Item>Tutoring session for {attendance.reservation.course}</ListGroup.Item>
                    <ListGroup.Item>Tutor: {attendance.reservation.tutor.fName} {attendance.reservation.tutor.lName}</ListGroup.Item>
                    <ListGroup.Item>Tutee: {attendance.reservation.tutee.name} {attendance.reservation.tutee.familyName}</ListGroup.Item>
                    <ListGroup.Item>Place of the session: {attendance.placeOfSession}</ListGroup.Item>
                    <ListGroup.Item>Attendance check request made at {attendance.tutorTime} {attendance.dateOfSession}</ListGroup.Item>
                    <ListGroup.Item>Attendance check comfirmed made at {attendance.tuteeTime} {attendance.dateOfSession}</ListGroup.Item> */}
                </div>
            );
        }
    };

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
                    <center><h4><a className="btn btn-primary btn-md text-uppercase js-scroll-trigger">CONTACT US</a></h4></center>
                </Nav.Link>
                <Nav.Link href="/">
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
                    <center><h4><a className="btn btn-primary btn-md text-uppercase js-scroll-trigger">CONTACT US</a></h4></center>
                </Nav.Link>
                <Nav.Link href="/">
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
                            <center><h4><a className="btn btn-primary btn-md text-uppercase js-scroll-trigger">MAKE A
                                NEW RESERVATION</a></h4></center>
                        </Nav.Link>
                        <Nav.Link href={`/MeetingReminder/${this.state.currentUser.id}`}>
                            <center><h4><a className="btn btn-primary btn-md text-uppercase js-scroll-trigger">SET A
                                REMINDER</a></h4></center>
                        </Nav.Link>
                        <Nav.Link href={`/Rate_ViewTutor/${this.state.currentUser.id}`}>
                            <center><h4><a className="btn btn-primary btn-md text-uppercase js-scroll-trigger">RATE
                                TUTOR</a></h4></center>
                        </Nav.Link>
                        {this.getNavContent()}
                    </Nav>
                </Navbar></div>
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
                                <h1>CHECK ATTENDANCE</h1>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <ListGroup variant="flush"> */}
                <br></br><br></br>
                {this.displayResult(this.state.attendance, this.state.reservation, this.state.checked, this.state.tutor, this.state.tutee)}
                {/* </ListGroup> */}
                <Button className="btn btn-outline-success" href={`/Home/${this.state.currentUser.id}`}>Back to main</Button>

            </div>
        )
    }
}

export default Attendance_Scan;
