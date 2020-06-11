/////////////////////////////////////////////////////////////////////////////
//Contains a form that enables users to fill in/select the course/days of week. This links to Reservation_Reserve.js to proceed to the next step of the reservation.
/////////////////////////////////////////////////////////////////////////////

import React, {Component} from 'react';
import axios from 'axios';
import {Nav, Navbar, Form, Button, Card, ProgressBar} from "react-bootstrap";
import $ from "jquery";
import {Link} from "react-router-dom";
import Footer from '../components/common/Footer';

class Reservation_Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listOpen: false,
            courseList: [],
            courseResponse: '',
            daysOfWeekResponse: '',
            daysOfWeekResponse_2: '',
            startingTimeResponse: '',
            endingTimeResponse: '',
            currentUser: {},
            show: false,
            isNotTutor: true,
            responsed: false,
            isTutor: false,
        };
    };

    handleLogin() {
        axios
            .get('/signup/' + this.props.match.params.id)
            .then(response => {
                this.setState({currentUser: response.data, loggedin: true});
                console.log(this.state.currentUser);
            })
            .catch(error => {
                console.log("check login error", error);
            });
    }

    // After making DBseeder for course / add course from the admin page
    componentDidMount() {
        this.handleLogin();
        this.checkIfLoggedInAsTutor();
        console.log(this.state.currentUser.name);
        $('#option2').hide();
        this.ifNotSelected();
    }

    // onChange event for course
    courseChange = (e) => {
        let fieldName = e.target.name;
        let fieldVal = e.target.value;
        this.state.courseResponse = fieldVal;
        console.log('---changeCourse----');
        console.log(this.state.courseResponse);
        this.checkIfTutor();
        localStorage.setItem("courseResponse", e.target.value);
        this.setState({form: {...this.state.form, [fieldName]: fieldVal}})
    };

    // onChange event for starting time
    startingTimeChange = (e) => {
        let fieldName = e.target.name;
        let fieldVal = e.target.value;
        this.state.startingTimeResponse = fieldVal;
        console.log('---changeStartingTime----');
        console.log(this.state.startingTimeResponse);
        localStorage.setItem("startingTimeResponse", e.target.value);
        this.setState({form: {...this.state.form, [fieldName]: fieldVal}})
    };

    // onChange event for ending time
    endingTimeChange = (e) => {
        let fieldName = e.target.name;
        let fieldVal = e.target.value;
        if (fieldVal < this.state.startingTimeResponse) {
            alert("Ending time must be later than the Starting time!");
        } else {
            this.state.endingTimeResponse = fieldVal;
            console.log('---changeEndTime----');
            console.log(this.state.endingTimeResponse);
            localStorage.setItem("endingTimeResponse", e.target.value);
            this.setState({form: {...this.state.form, [fieldName]: fieldVal}})
        }
    };

    // onChange event for days of week
    daysOfWeekChange = (e) => {
        let fieldName = e.target.name;
        let fieldVal = e.target.value;
        this.state.daysOfWeekResponse = fieldVal;
        console.log('---changeDaysOfWeek----');
        console.log(this.state.daysOfWeekResponse);
        localStorage.setItem("daysOfWeekResponse", e.target.value);
        this.setState({form: {...this.state.form, [fieldName]: fieldVal}})
    };

    // onChange event for days of week
    daysOfWeekChange2 = (e) => {
        let fieldName = e.target.name;
        let fieldVal = e.target.value;
        this.state.daysOfWeekResponse_2 = fieldVal;
        console.log('---changeDaysOfWeek----');
        console.log(this.state.daysOfWeekResponse_2);
        console.log(e.target.value);
        console.log((e.target.value == null));
        console.log((e.target.value != "default"));
        console.log(typeof e.target.value);
        if ((e.target.value == null) || (e.target.value == "default")) {
            console.log("I am here");
            localStorage.setItem("daysOfWeekResponse2", "");
        } else {
            localStorage.setItem("daysOfWeekResponse2", this.state.daysOfWeekResponse_2);
        }
        this.setState({form: {...this.state.form, [fieldName]: fieldVal}})
    };

    // handle if dropdownlist 2 is not selected
    ifNotSelected() {
        console.log($('#selectDaysOfWeek2').val() == "default");
        console.log($('#selectDaysOfWeek2').val());
        if ($('#selectDaysOfWeek2').val() == "default") {
            console.log("aaa")
            localStorage.setItem("daysOfWeekResponse2", "");
        }
    }

    //check the information of the current user and tutor data
    checkIfTutor = () => {
        axios
            .get('/tutors')
            .then(response => {
                for (let i = 0; i < response.data.length; i++) {
                    if (this.state.currentUser.name == (response.data[i].fName + " " + response.data[i].lName)) {
                        if (this.state.courseResponse == response.data[i].courseName) {
                            alert("You are not allowed to reserve course that you are tutoring!");
                            this.setState({isNotTutor: false});
                        } else {
                            this.setState({isNotTutor: true});
                        }
                    }
                }
            })
            .catch(error => {
                console.log("Something went wrong", error);
            });
        return this.state.isNotTutor;
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

    onSubmit = (e) => {
        e.preventDefault();
        //this.checkIfTutor();
        this.props.history.push("/Reservation_Reserve");
    };

    // return additional dropdown list
    onClickPlus = (e) => {
        alert("Wanna add another day?");
        $('#option2').show();
        $('#additional').hide();
    };

    checkIfLoggedInAsTutor() {
        axios.get('/tutors')
            .then(res => {
                console.log("checking");
                console.log(this.state.currentUser.name);
                for (let i = 0; i < res.data.length; i++) {
                    if (this.state.currentUser.email == res.data[i].email) {
                        console.log("found");
                        this.setState({isTutor: true});
                    }
                }
            });
    }

    // return alert message if any of the dropdown list is not selected
    onClick = (e) => {
        this.checkIfTutor();
        if ($('#selectCourse').val() === "default" || $('#selectDaysOfWeek').val() === "default" || $('#selectStartingTime').val() === "default" || $('#selectEndingTime').val() === "default") {
            this.state.responsed = false;
            window.location.reload(true);
            //window.location.href='/Reservation_Search';
            if ($('#selectCourse').val() === "default") {
                window.location.reload(true);
                alert("Please select course!");
            }
            if ($('#selectDaysOfWeek').val() === "default") {
                if ($('#selectDaysOfWeek').val() === "default" && $('#selectDaysOfWeek2').val() === "default") {
                    window.location.reload(true);
                    alert("Please select at least one day of week!")
                }
            }
            if ($('#selectStartingTime').val() === "default") {
                window.location.reload(true);
                alert("Please select starting time!")
            }
            if ($('#selectEndingTime').val() === "default") {
                window.location.reload(true);
                alert("Please select ending time!")
            }
        } else {
            this.setState({responsed: true});
        }
    };

    render() {
        const {courseResponse, daysOfWeekResponse, startingTimeResponse, endingTimeResponse, responsed, isNotTutor} = this.state;
        let button;
        if (responsed && isNotTutor) {
            button = <Button className="btn btn-outline-info" type="submit" onClick={this.onClick}
                             href={`/Reservation_Reserve/${this.state.currentUser.id}`}>Next</Button>
        } else {
            button = <Button className="btn btn-outline-info" type="submit" onClick={this.onClick}
                             href={`/Reservation_Search/${this.state.currentUser.id}`}>Next</Button>
        }
        const now = 25;
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
                                <h1>START RESERVATION</h1>
                            </div>
                        </div>
                    </div>
                </section>
                {/*<h1>*/}
                {/*    <center>START RESERVATION</center>*/}
                {/*</h1>*/}
                <br></br>
                <div>
                    <h4>
                        <center>Please select the preferred days of week and the course you will take below!</center>
                        <br></br>
                    </h4>
                </div>
                <div class="jumbotron">
                    <center><h5>Progress: 25%</h5></center>
                    {progressInstance}<br></br>
                    <Card> <br></br>
                        <div class="row">
                            <div class="col">
                                <span id="additional"><button id="plus" className="btn btn-outline-secondary"
                                                              onClick={this.onClickPlus}>+</button> Click this button to add additional day you want to search for!</span>
                                {/*{this.dropDownList()}*/}<br></br><br></br>
                                <Form onSubmit={this.onSubmit}>
                                    <div className="row">
                                        <Form.Group className="col" controlId="selectCourse">
                                            <center><Form.Label style={{fontWeight: 'bold'}}>Select Course</Form.Label>
                                            </center>
                                            <Form.Control
                                                required
                                                as="select"
                                                name="course"
                                                placeholder="test"
                                                value={this.state.courseResponse}
                                                onChange={this.courseChange.bind(this)}
                                                feedback="You must select the course"
                                            >
                                                <option disabled value={-1}>Click here to select the course!</option>
                                                <option value="default">Course</option>
                                                <option value="CSE114">CSE114</option>
                                                <option value="CSE101">CSE101</option>
                                                <option value="AMS151">AMS151</option>
                                                <option value="AMS161">AMS161</option>
                                                <option value="AMS261">AMS261</option>
                                                <option value="AMS310">AMS310</option>
                                                <option value="PHY131">PHY131</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group className="col" controlId="selectDaysOfWeek">
                                            <center><Form.Label style={{fontWeight: 'bold'}}>Select Days of
                                                Week</Form.Label></center>
                                            <Form.Control
                                                required
                                                as="select"
                                                name="daysOfWeek"
                                                placeholder="test"
                                                value={this.state.daysOfWeekResponse}
                                                onChange={this.daysOfWeekChange}
                                                feedback="You must select the days of week."
                                            >
                                                <option disabled value={-1}>Click here to select the Days of Week!
                                                </option>
                                                <option value="default">Days Of Week</option>
                                                <option value="MONDAY">Monday</option>
                                                <option value="TUESDAY">Tuesday</option>
                                                <option value="WEDNESDAY">Wednesday</option>
                                                <option value="THURSDAY">Thursday</option>
                                                <option value="FRIDAY">Friday</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group id="option2" className="col" controlId="selectDaysOfWeek2">
                                            {/*<Form.Group id = "option2" className = "col" hidden="true" controlId="selectDaysOfWeek2">*/}
                                            <center><Form.Label style={{fontWeight: 'bold'}}>Select Days of
                                                Week</Form.Label></center>
                                            <Form.Control
                                                required
                                                as="select"
                                                name="daysOfWeek"
                                                placeholder="test"
                                                value={this.state.daysOfWeekResponse_2}
                                                onChange={this.daysOfWeekChange2}
                                                feedback="You must select the days of week."
                                            >
                                                <option disabled value={-1}>Click here to select the Days of Week!
                                                </option>
                                                <option value="default">Days Of Week</option>
                                                <option value="MONDAY">Monday</option>
                                                <option value="TUESDAY">Tuesday</option>
                                                <option value="WEDNESDAY">Wednesday</option>
                                                <option value="THURSDAY">Thursday</option>
                                                <option value="FRIDAY">Friday</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group className="col" controlId="selectStartingTime">
                                            <center><Form.Label style={{fontWeight: 'bold'}}>Select Starting
                                                Time</Form.Label></center>
                                            <Form.Control
                                                required
                                                as="select"
                                                name="from"
                                                placeholder="test"
                                                value={this.state.startingTimeResponse}
                                                onChange={this.startingTimeChange}
                                                feedback="You must select the starting time."
                                            >
                                                <option disabled value={-1}>Click here to select the starting time!
                                                </option>
                                                <option value="default">From</option>
                                                <option value="13">13:00</option>
                                                <option value="14">14:00</option>
                                                <option value="15">15:00</option>
                                                <option value="16">16:00</option>
                                                <option value="17">17:00</option>
                                                <option value="18">18:00</option>
                                                <option value="19">19:00</option>
                                                <option value="20">20:00</option>
                                                <option value="21">21:00</option>
                                                <option value="22">22:00</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group className="col" controlId="selectEndingTime">
                                            <center><Form.Label style={{fontWeight: 'bold'}}>Select Ending
                                                Time</Form.Label></center>
                                            <Form.Control
                                                required
                                                as="select"
                                                name="to"
                                                placeholder="test"
                                                value={this.state.endingTimeResponse}
                                                onChange={this.endingTimeChange}
                                                feedback="You must select the starting time."
                                            >
                                                <option disabled value={-1}>Click here to select the ending time!
                                                </option>
                                                <option value="default">To</option>
                                                <option value="13">13:00</option>
                                                <option value="14">14:00</option>
                                                <option value="15">15:00</option>
                                                <option value="16">16:00</option>
                                                <option value="17">17:00</option>
                                                <option value="18">18:00</option>
                                                <option value="19">19:00</option>
                                                <option value="20">20:00</option>
                                                <option value="21">21:00</option>
                                                <option value="22">22:00</option>
                                                <option value="23">23:00</option>
                                            </Form.Control>
                                        </Form.Group></div>
                                    <br></br>
                                    <center>{button}
                                    </center>
                                </Form>
                            </div>
                        </div>
                        <br></br>
                    </Card>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Reservation_Search;
