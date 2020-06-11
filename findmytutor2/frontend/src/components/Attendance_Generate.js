/////////////////////////////////////////////////////////////////////////////
//Contains a form that enables tutors to generate a QR code for the attendance check which will be scanned by a tutee in Attendance_Scan.js. This links to SignIn.js if the user has not signed in.
/////////////////////////////////////////////////////////////////////////////

import React, { Component } from 'react';
import axios from 'axios';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import moment from 'moment';
import QRCode from 'qrcode.react';
import Modal from 'react-awesome-modal';
// import Popup from "reactjs-popup";
import '../App.css'
import Footer from '../components/common/Footer';

class Attendance_Generate extends Component {
    constructor(props) {
        super(props);
        this.findDomeNodeHandler = this.findDomeNodeHandler.bind(this);
        this.state = {
            reservations: [], //reservations of THIS semester ONLY
            a_index: '-1',
            placeOfSession: '',
            visible: false,     //for pop up
            aid: '',
            tid: '',
            currentUser: {},
        }
    }

    componentDidMount = () => {
        this.handleLogin();
        this.getReservation();
        this.checkIfTutor();
    };

    findDomeNodeHandler = (tid, aid) => {
        var myHref = document.getElementById('linkToScanQRcode');
        var url = '';
        if (myHref === null) {
        } else {
            url = myHref.href + tid + '/' + aid;
            //console.log(url);
        }
        return url;
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
    };

    /*get reservation record of current semester only*/
    getReservation = () => {
        const today = this.getSemester();
        var log = [];
        axios.get('/reservations')
            .then((response) => {
                const data = response.data;
                console.log("data received");
                for (let i = 0; i < data.length; i++)
                    if (data[i].semester === today && data[i].tutor.email === localStorage.getItem("currentUserEmail")) log.push(data[i]);
                //&& data[i].tutor.id === this.props.match.params.id
                this.setState({ reservations: log });
                localStorage.setItem("resInfo", this.state.reservations);
                //console.log(log);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    /*display select options*/
    displayOptions = (reservations) => {
        console.log(reservations);
        if (!reservations.length) return null;
        return reservations.map((reservations, index) => (
            <option
                value={index}>{reservations.course} with {reservations.tutee.name} {reservations.tutee.familyName}</option>
        ));
    };

    /*get info of this semester*/
    getSemester = () => {
        // var today = String(moment().format('YYYY'));
        // if (moment().format('MM')>'07') today += 'Fall';
        // else today += 'Spring';
        // return today;
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

    changeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    submitHandler = (event) => {
        event.preventDefault();
        if (this.state.a_index == -1) {
            alert('Please select the appointment!');
            return;
        }
        const { placeOfSession } = this.state;
        //console.log(attended)
        const rese = this.state.reservations[this.state.a_index];
        //console.log(rese.tutee.id);
        axios.post('/attendance', {
            reservation: rese,
            placeOfSession,
            dateOfSession: moment().format("YYYY-MM-DD"),
            tutorTime: moment().format("HH:mm:ss"),
            attended: false
        })
            .then((response) => {
                console.log(response.data);
                this.setState({ aid: response.data.aid });
                this.setState({ tid: rese.tutee.id });
                // open pop up
                this.openModal(true);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    /* pop up control functions */
    openModal = (display) => {
        if (display) this.setState({ visible: true });
    };

    closeModal() {
        this.setState({ visible: false });
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
                    <center><h4><a className="btn btn-primary btn-md text-uppercase js-scroll-trigger">CONTACT US</a></h4></center>
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
        return (
            <div className="container">
                <div><Navbar bg="light" variant="light">
                    <Nav className="mr-auto">
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
                <br></br><br></br>
                <h1>
                    <center>Check your attendance</center>
                </h1>
                <br></br>

                <h4>
                    <center>Please fill out the form below to generate QR code!</center>
                    <br></br>
                </h4>

                <div class="jumbotron">
                    <div class="row">
                        <div class="col-lg">
                            <Form onSubmit={this.submitHandler}>

                                {/* ======== select appointment ========== */}
                                <Form.Group controlId="selectAppointment">
                                    <Form.Label>Select your appointment!</Form.Label>
                                    <Form.Control
                                        required
                                        as="select"
                                        name="a_index"
                                        placeholder="test"
                                        value={this.state.a_index}
                                        onChange={this.changeHandler}
                                    >
                                        <option disabled value={-1}>Click here to select your appointment!</option>
                                        {this.displayOptions(this.state.reservations)}
                                    </Form.Control>
                                </Form.Group>

                                {/* ======== input place info ========== */}
                                <Form.Group controlId="inputPlace">
                                    <Form.Label>Where are you holding your tutoring session at?</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        name="placeOfSession"
                                        placeholder="Enter the place"
                                        value={this.state.placeOfSession}
                                        onChange={this.changeHandler}
                                    />
                                </Form.Group>

                                {/* ======== term agreement ========== */}
                                <Form.Group>
                                    <Form.Check
                                        required
                                        label="Agree to terms"
                                        feedback="You must agree before submitting."
                                    />
                                    <Form.Text className="text-muted">
                                        By submitting this form, you are authorizing that the information above are true
                                        and accurate. If any information turns out to be false, SUNYK tutoring center
                                        has the authority to use this information when evaluating the tutor and
                                        renegotiate tutor's contract.
                                    </Form.Text>
                                </Form.Group>

                                <center>
                                    <Button id ="unit-test" type="submit" variant="outline-primary">Submit</Button>
                                    {/* <input className="btn btn-outline-success" type="submit" value="Submit"/> */}
                                    <Modal visible={this.state.visible} width="400" height="300" effect="fadeInUp"
                                        onClickAway={() => this.closeModal()}>
                                        <div>
                                            <p></p>
                                            <dt></dt>
                                            <dt></dt>
                                            <p>Tutee needs to scan the following QR code to confirm the attendance!</p>
                                            <p><QRCode
                                                value={this.findDomeNodeHandler(this.state.tid, this.state.aid)} /></p>
                                            <a id='linkToScanQRcode' href='/Attendance_Scan/'></a>
                                            <p></p>
                                            <a href={`/Home/${this.state.currentUser.id}`}
                                                onClick={() => this.closeModal()}>Close</a>
                                        </div>
                                    </Modal>
                                </center>

                            </Form>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Attendance_Generate;