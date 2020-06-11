/////////////////////////////////////////////////////////////////////////////
//Contain a summary of an user input so far, and a button that enables the user clicks to complete the reservation. This links to the Login.js if the user has not signed in yet.
/////////////////////////////////////////////////////////////////////////////

import React, { Component } from 'react';
import axios from 'axios';
import { Nav, Navbar, Jumbotron, Form, Button, ProgressBar } from "react-bootstrap";
import moment from "moment";
import { Link } from "react-router-dom";
import Rater from "react-rater";

class Reservation_Confirm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tutors: [],
            appropriate_tutor: {},
            reservation: {},
            currentUser: {},
            daysOfWeekResponse: '',
            tutor: '',
            semesterInfo: '',
            course: '',
            from: '',
            to: '',
            rid: '',
            // from2:'',
            // to2:'',
        }
    }

    componentDidMount = () => {
        this.handleLogin();
        console.log(localStorage.getItem("courseResponse"));
        console.log(localStorage.getItem("daysOfWeekResponse"));
        console.log(localStorage.getItem("tutor"));
        console.log(localStorage.getItem("startingTime"));
        console.log(localStorage.getItem("endingTime"));
        console.log(localStorage.getItem("startTime"));
        console.log(localStorage.getItem("endTime"));
        console.log(parseInt(localStorage.getItem("startingTime")[16] + localStorage.getItem("startingTime")[17], 10));
        console.log(typeof parseInt(localStorage.getItem("startingTime")[16] + localStorage.getItem("startingTime")[17], 10));
        let startingTime = parseInt(localStorage.getItem("startingTime")[16] + localStorage.getItem("startingTime")[17], 10);
        let endingTime = parseInt(localStorage.getItem("endingTime")[16] + localStorage.getItem("endingTime")[17], 10);
        axios.get('/tutors')
            .then(res => {
                this.setState({ tutors: res.data });
                //console.log(this.state.tutors);
                // const appropriate = [];
                for (let i = 0; i < res.data.length; i++) {
                    //console.log(res.data[i]);
                    if ((res.data[i].fName + " " + res.data[i].lName) == localStorage.getItem("tutor")) {
                        console.log('----tutor found!---');
                        // appropriate.push(res.data[i]);
                        this.setState({ appropriate_tutor: res.data[i] });
                        this.setState({ daysOfWeekResponse: res.data[i].sessionInfo.daysOfWeek});
                        localStorage.setItem("idToReturn", res.data[i].id);
                        console.log("------idToReturn--------");
                        console.log(localStorage.getItem("idToReturn"))
                    }
                }
                console.log(this.state.appropriate_tutor);
            });
        this.setState({ course: localStorage.getItem("courseResponse") });
        this.setState({ tutor: localStorage.getItem("tutor") });
        console.log(localStorage.getItem("buttonClick")==1);
        if(localStorage.getItem("buttonClick")==1) {
            this.setState({from: startingTime});
            this.setState({ to: endingTime });
        }
        else {
            this.setState({ from: localStorage.getItem("startTime") });
            this.setState({ to: localStorage.getItem("endTime") });
        }
        localStorage.setItem("buttonClick", 0);
        this.getSemesterInfo();
        console.log("----------------------------------");
        console.log(this.state.from);
        console.log(this.state.daysOfWeekResponse);
        console.log(this.state.tutor);
        this.checkIfTutor();
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

    getSemesterInfo = () => {
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

    onSubmit = (appropriate_tutor) => {
        appropriate_tutor.preventDefault();
        axios.put('/tutors/' + this.state.appropriate_tutor.id, { isReserved: true })
            .then(response => {
                console.log(response.data);
                this.setState({ appropriate_tutor: response.data });
            })
            .catch((err) => {
                console.log(err);
            });
        axios.post('/reservations', {
            course: this.state.course,
            semester: this.state.semesterInfo,
            daysOfWeek: this.state.daysOfWeekResponse,
            tutor: this.state.appropriate_tutor,
            tutee: this.state.currentUser,
            from: this.state.from,
            to: this.state.to,
            tutorReminder: false,
            tuteeReminder: false,
        })
            .then((response) => {
                console.log(response.data);
                this.setState({ reservation: response.data, rid: response.data.rid });
                localStorage.setItem("rid", this.state.rid);
                alert("Successfully Reserved");
                //this.props.history.push(`/Reservation_Success/${this.state.currentUser.id}/${localStorage.getItem("idToReturn")}`);
                this.props.history.push(`/Reservation_Success/${this.state.currentUser.id}`);
            })
            .catch((err) => {
                alert("someting wrong");
                console.log(err);
            });
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
                    <center><h4><a className="btn btn-primary btn-md text-uppercase js-scroll-trigger">
                        CONTACT US
                    </a></h4></center>
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
                    <center><h4><a className="btn btn-primary btn-md text-uppercase js-scroll-trigger">
                        CONTACT US
                    </a></h4></center>
                </Nav.Link>
                <Nav.Link href="/">
                    <button className="btn btn-primary btn-sm text-uppercase js-scroll-trigger">
                        <center><h4>Log Out</h4></center>
                    </button>
                </Nav.Link>
            </>))
        }
    }

    // for cancel button
    handleCancel() {
        alert("Your reservation process is canceled")
    };

    render() {
        const now = 75;
        const progressInstance = <ProgressBar animated now={now} label={`${now}%`} />;
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
                                <h1>CHECK RESPONSE</h1>
                            </div>
                        </div>
                    </div>
                </section>
                <br></br>
                <h4>
                    <center>Hi, {this.state.currentUser.name}!</center>
                    <center>Below is the list for your response so far</center>
                    <br></br>
                </h4>
                <Jumbotron>
                    <center><h5>Progress: 75%</h5></center>
                    {progressInstance}<br></br>
                    <Form onSubmit={this.onSubmit}>
                        <table className="table table-stripe">
                            <thead>
                            <tr>
                                <th><center>Course</center></th>
                                <th><center>Tutor</center></th>
                                <th><center>Days of Week</center></th>
                                <th><center>Starting Time</center></th>
                                <th><center>Ending Time</center></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr><td><center>{this.state.course}</center></td>
                                <td><center>{this.state.tutor}</center></td>
                                <td><center>{this.state.daysOfWeekResponse}</center></td>
                                <td><center>{this.state.from}:00 pm</center></td>
                                <td><center>{this.state.to}:00 pm</center></td></tr>
                            </tbody>
                        </table>
                        <br></br>
                        <center><Form.Group>
                            <Form.Check
                                required
                                label=" "
                                feedback="You must agree before submitting."
                            />
                            <Form.Text className="text-muted">
                                I confirmed all the information above, and I am willing to reserve tutoring session as
                                above
                                for {this.state.semesterInfo}
                            </Form.Text>
                        </Form.Group></center>
                        <br></br>
                        <center>
                            {/*<a href={`/Home/${this.state.currentUser.id}`}><Button className="btn btn-outline-primary" type="submit"*/}
                            {/*>Confirm</Button></a>*/}
                            <Button className="btn btn-outline-primary" type="submit"
                            >Confirm</Button>
                        </center>
                    </Form><br></br>
                    <div className="row">
                        <span className="col"><center><Button className="btn btn-outline-secondary" href={`/Reservation_Reserve/${this.state.currentUser.id}`}>Go Back</Button></center></span><br></br>
                        <span className="col"><center><Button className="btn btn-outline-danger" onClick={this.handleCancel} href={`/Home/${this.state.currentUser.id}`}>Cancel</Button></center></span><br></br></div>
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

export default Reservation_Confirm;