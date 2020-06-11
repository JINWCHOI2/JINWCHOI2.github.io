/////////////////////////////////////////////////////////////////////////////
//Contain a summary of an user input so far, and a button that enables the user clicks to complete the reservation. This links to the Login.js if the user has not signed in yet.
/////////////////////////////////////////////////////////////////////////////

import React, { Component } from 'react';
import axios from 'axios';
import { Nav, Navbar, Jumbotron, Button, Card, ProgressBar } from "react-bootstrap";
import moment from "moment";
import '../App.css'

class Reservation_Success extends Component {

    constructor(props) {
        super(props);
        this.state = {
            reservations: [],
            reservation_record: {},
            tutorName: '',
            sessionCourse: '',
            from: '',
            to: '',
            currentUser: {},
            semesterInfo: '',
        }
    }

    componentDidMount = () => {
        this.handleLogin();
        this.getReservation();
        this.getSemesterInfo();
    };

    getReservation = () => {
        axios.get('/reservations')
            .then(res => {
                this.setState({ reservations: res.data });
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].tutee.name == this.state.currentUser.name) {
                        console.log('----Reservation Record found!---');
                        this.setState({
                            reservation_record: res.data[i],
                            sessionCourse: res.data[i].course,
                            tutorName: res.data[i].tutor.fName + " " + res.data[i].tutor.lName,
                            from: res.data[i].from + " : 00 pm",
                            to: res.data[i].to + " : 00 pm"
                        });
                    }
                }
                console.log(this.state.reservation_record);
            });
    };

    handleLogin() {
        axios
            .get('/signup/' + this.props.match.params.id)
            .then(response => {
                this.setState({ currentUser: response.data, loggedin: true });
                console.log(this.state.currentUser);
            })
            .catch(error => {
                console.log("check login error", error);
            });
    }

    getSemesterInfo = () => {
        var year = '';
        if (moment().format('MM') > '07') {
            year += 'Fall ';
        } else {
            year += 'Spring ';
        }
        year += String(moment().format('YYYY'));
        this.setState({ semesterInfo: year });
        return year;
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
            </Nav.Link><Nav.Link href="/">
                <button className="btn btn-primary btn-sm text-uppercase js-scroll-trigger">
                    <center><h4>Log Out</h4></center>
                </button>
            </Nav.Link>
            </>))
        }
    }

    render() {
        const now = 100;
        const progressInstance = <ProgressBar striped variant="success" animated now={now} label={`${now}%`} />;
        return (
            <div className="container">
                <div><Navbar bg="light" variant="light">
                    <Navbar.Brand href={`/Home/${this.state.currentUser.id}`}>
                        <center><h4><a
                            className="btn btn-primary btn-md text-uppercase js-scroll-trigger"><b>FindMyTutor</b></a>
                        </h4></center>
                    </Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href={`/About_Us/${this.state.currentUser.id}`}>
                            <center><h4><a className="btn btn-primary btn-md text-uppercase js-scroll-trigger">
                                CONTACT US
                            </a></h4></center>
                        </Nav.Link>
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
                                <h1>RESERVATION RESULT</h1>
                            </div>
                        </div>
                    </div>
                </section>
                <br></br>
                <h4>
                    <center>Hi, {this.state.currentUser.name}!</center>
                    <center>Below is the result of reservation for {this.state.semesterInfo}!</center>
                    <br></br>
                </h4>
                <Jumbotron><center><h5>Successfully Reserved!</h5></center>{progressInstance}<br></br>
                    <Card><Card.Body>
                        <center><p id="p">{this.state.tutorName} will instruct
                        you {this.state.sessionCourse} from {this.state.from} to {this.state.to}</p></center></Card.Body>
                    </Card>
                    <br></br>
                    <div className="row">
                        <span className="col"><center><Button className="btn btn-outline-secondary"
                            href={`/Home/${this.state.currentUser.id}`}>Go Back to Main Page</Button></center></span>
                        <span className="col"><center><Button className="btn btn-outline-info"
                            href={`/ViewScheduleHistory/${this.state.currentUser.id}`}>Check schedule</Button></center></span>
                        <span className="col"><center><Button className="btn btn-outline-success"
                            href={`/MeetingReminder/${this.state.currentUser.id}`}>Set Reminder</Button></center></span>
                    </div>
                    <br></br>
                </Jumbotron>
                <footer className="footer">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-md-4">
                                <span className="copyright">Copyright &copy; Your Website 2020</span>
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
        );
    }
}

export default Reservation_Success;