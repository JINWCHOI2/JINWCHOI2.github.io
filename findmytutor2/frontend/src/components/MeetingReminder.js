// /////////////////////////////////////////////////////////////////////////////
// //Contains a form that enables users to fill in/select the course/days of week. This links to Reservation_Reserve.js to proceed to the next step of the reservation.
// /////////////////////////////////////////////////////////////////////////////

import React, { Component } from 'react';
import axios from 'axios';
import { Nav, Navbar, Table, Button } from "react-bootstrap";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

class MeetingReminder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sent: false,
            currentUser: {},
            reservations: [],
            isTutor: false,
        }
    };

    componentDidMount = () => {
        this.handleLogin();
        this.getReservations();
        this.checkIfTutor();
        //alert(localStorage.getItem("currentUserEmail"));
    };

    handleLogin() {
        axios.get('/signup/' + this.props.match.params.id)
            .then(response => {
                this.setState({ currentUser: response.data, loggedin: true });
                //console.log(this.state.currentUser);
                console.log(response);
            })
            .catch(error => {
                console.log("check login error", error);
            });
    }

    getReservations = () => {
        var log = [];
        axios.get('/reservations')
            .then(response => {
                const data = response.data;
                for (let i = 0; i < data.length; i++) {
                    if (data[i].tutor.email == localStorage.getItem("currentUserEmail") || data[i].tutee.id == this.props.match.params.id) {
                        log.push(data[i]);
                    }
                }
                this.setState({ reservations: log });
                console.log(log)
            })
            .catch(error => {
                console.log(error);
            });
    }

    displayReservationList = (reservations) => {
        if (!reservations.length) {
            return (
                <tr>
                    <td>No reservations yet!</td>
                </tr>
            );
        }
        var isChecked = [];
        var isTutor = [];
        for (let i = 0; i < reservations.length; i++) {
            if (reservations[i].tutor.id == this.props.match.params.id) {
                isChecked.push(reservations[i].tutorReminder);
                isTutor.push(true);
            }
            else {
                isChecked.push(reservations[i].tuteeReminder);
                isTutor.push(false);
            }
        }

        return reservations.map((value, index) => (
            <tr key={index}>
                <td>{value.tutor.fullName}</td>
                <td>{value.tutee.name}</td>
                <td>{value.course}</td>
                <td>{value.from}:00 on {value.daysOfWeek}</td>
                <td>
                    <BootstrapSwitchButton
                        checked={isChecked[index]}
                        onstyle="warning"
                        onChange={this.switchOnChange(value.id, isTutor[index])}
                    />
                </td>
            </tr>
        ));
    };

    switchOnChange = (id, isTutor) => (event) => {
        // console.log(event)
        // console.log(id)
        // console.log(isTutor)
        if (isTutor) {
            axios.post('/reservations/' + id, { tutorReminder: event })
                .then(response => {
                    console.log(response);
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                })
        }
        else {
            axios.put('/reservations/' + id, { tuteeReminder: event })
                .then(response => {
                    console.log(response);
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                })
        }
    };

    handleClick = (event) => {
        axios.post('/email/updateEmailServer')
            .then(response => {
                console.log(response)
                alert("Thank you! Your reminder settings are updated.")
            })
            .catch((error) => {
                console.log(error);
            })
    }

    // //nodemailer onclick
    // mailSender = (e)=>{
    //     e.preventDefault();
    //     console.log('test')
    //     let emailParam = {
    //         toEmail : 'suin.cho@stonybrook.edu',
    //         subject : 'test',
    //         text: '<div><h3>Testing nodemaier</h3><p>hi~~!</p></div>'//'testing nodemailer'
    //     };
    //
    //     axios.post('/updateEmailServer', emailParam)
    //         .then(response=>{
    //             this.setState({
    //                 sent: true
    //             })
    //             console.log(response)
    //         })
    //         .catch((error)=>{
    //             console.log(error);
    //     })
    // }
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
                </Navbar>
                </div>
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
                                <h1>MEETING REMINDER</h1>
                            </div>
                        </div>
                    </div>
                </section>
                <br></br><br></br>
                <h1>
                    <center>Reminder Page</center>
                </h1>
                <br></br>

                {/* Button to send a email */}
                {/* <button type="submit" onClick={this.mailSender} className="btn btn-outline-success">Send an email</button> */}

                <div>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>Tutor</th>
                                <th>Tutee</th>
                                <th>Course</th>
                                <th>Starts at</th>
                                <th>Reminder Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.displayReservationList(this.state.reservations)}
                        </tbody>
                    </Table>
                </div>

                <center>
                    <Button onClick={this.handleClick} variant="warning">Save</Button>
                </center>

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
export default MeetingReminder;