/////////////////////////////////////////////////////////////////////////////
//Contains tables that enable users to click the table of the slot. The table varies upon the users since it is based on the user input from the previous use case. Each cell should contain all the relevant information of the tutor and the time information. This links to the Reservation_Confirm.js to proceed to the next step of the reservation.
/////////////////////////////////////////////////////////////////////////////

import React, {Component, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Button, Form, Jumbotron, Nav, Navbar, ProgressBar, ListGroup, Card} from "react-bootstrap";
import Alert from 'react-bootstrap/Alert';
import moment from "moment";
import Timetable from "react-timetable-events";
import $ from "jquery";
import Footer from '../components/common/Footer';
// import AppointmentPicker from 'appointment-picker';
import '../timetable.css'

class Reservation_Reserve extends Component {

    constructor(props) {
        super(props);
        this.state = {
            events: [],
            tutors: [],
            avail_tutors: [],
            schedule: [],
            currentUser: {},
            days: '',
            days2: '',
            tutor: '',
            semester: '',
            course: '',
            from: '',
            to: '',
            isTutor: false,
            courseReserve: '',
            timetableProps: [],
        }
    }

    componentDidMount = () => {
        console.log(localStorage.getItem("courseResponse"));
        this.setState({courseReserve: localStorage.getItem("courseResponse")});
        this.setState({days: localStorage.getItem("daysOfWeekResponse")});
        this.setState({days2: localStorage.getItem("daysOfWeekResponse2")});
        this.setState({from: localStorage.getItem("startingTimeResponse")});
        this.setState({to: localStorage.getItem("endingTimeResponse")});
        console.log("-----------------------course state--------------------------");
        console.log(this.state.courseReserve);
        console.log("-----------------------days of week2--------------------------");
        console.log(this.state.days2);
        // get the tutors list
        axios.get('/tutors')
            .then(res => {
                this.setState({tutors: res.data});
                // console.log(this.state.tutors);
                const availables = [];
                for (let i = 0; i < res.data.length; i++) {
                    // console.log(res.data[i]);
                    if (res.data[i].isReserved == false && res.data[i].courseName == this.state.courseReserve && res.data[i].sessionInfo.from >= this.state.from && res.data[i].sessionInfo.to <= this.state.to &&
                        (res.data[i].sessionInfo.daysOfWeek == this.state.days || res.data[i].sessionInfo.daysOfWeek == this.state.days2)) {
                        console.log('----course found!---');
                        availables.push(res.data[i]);
                    }
                }
                console.log(availables);
                this.setState({avail_tutors: availables});
                if (availables.length == 0) {
                    alert("Oops, there's no session available!");
                } else {
                    this.setEvents(this.state.avail_tutors);
                }
                // this.displayTutorOptions(this.state.avail_tutors);
                console.log(this.state.avail_tutors);
            });
        this.handleLogin();
        this.checkIfTutor();

    };

    handleLogin() {
        axios
            .get('/signup/' + this.props.match.params.id)
            .then(response => {
                this.setState({currentUser: response.data, loggedin: true});
                console.log(this.state.currentUser);
                localStorage.setItem("currentUser", this.state.currentUser.id);
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
                        this.setState({isTutor: true});
                    }
                }
                if (this.state.isTutor == true) {
                }
            });
    }

    // submit handler
    onSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem("courseResponse", this.state.courseReserve);
        localStorage.setItem("days", this.state.days);
        this.props.history.push("/Reservation_Confirm");
    };

    //render button on each cell
    // renderEvent(event, defaultAttributes, styles) {
    //     var colors = ["#0080FF"];
    //     const availables = [];
    //     axios.get('/tutors')
    //         .then(res => {
    //             for (let i = 0; i < res.data.length; i++) {
    //                 if (res.data[i].isReserved === false && res.data[i].courseName === localStorage.getItem("courseResponse") &&
    //                     res.data[i].sessionInfo.from >= localStorage.getItem("startingTimeResponse") && res.data[i].sessionInfo.to <= localStorage.getItem("endingTimeResponse") &&
    //                     (res.data[i].sessionInfo.daysOfWeek === localStorage.getItem("daysOfWeekResponse") || res.data[i].sessionInfo.daysOfWeek === localStorage.getItem("daysOfWeekResponse2"))) {
    //                     console.log('----course found!---');
    //                     availables.push(res.data[i]);
    //                 }
    //             }
    //         });
    //     // save response data of the time slot on local storage
    //     $('#slotButton').click(function () {
    //         console.log("--------------------");
    //         console.log("--------------------");
    //         console.log(event);
    //         console.log(defaultAttributes);
    //         console.log(($('#eventInfo').val()));
    //         alert("Button Clicked");
    //         //console.log(event.startTime);
    //         var parent_id = $(this).parent().parent().parent().attr('id');
    //         // console.log($(this));
    //         // console.log($(this).parent().parent().parent());
    //         console.log($(this).parent().parent().parent().attr('id'));
    //         console.log(parent_id);
    //         console.log($(parent_id).title);
    //         debugger;
    //         localStorage.setItem("tutor", event.name);
    //         localStorage.setItem("startingTime", event.startTime);
    //         localStorage.setItem("endingTime", event.endTime);
    //
    //         console.log(localStorage.getItem("tutor"));
    //         console.log(localStorage.getItem("startingTime"));
    //         console.log(localStorage.getItem("endingTime"));
    //         console.log(localStorage.getItem("currentUser"));
    //         // window.location = '/Reservation_Confirm?id=" + this.id';
    //         window.location = `/Reservation_Confirm/${localStorage.getItem("currentUser")}`;
    //     });
    //
    //     $('#eventName').click(function () {
    //         axios.get('/tutors')
    //             .then(res => {
    //                 // alert("get");
    //                 for (let i = 0; i < res.data.length; i++) {
    //                     if (event.name === (res.data[i].fName + " " + res.data[i].lName)) {
    //                         console.log(event.name);
    //                         console.log(res.data[i].fName + " " + res.data[i].lName);
    //                         alert(event.name);
    //                         localStorage.setItem("tutorLink", res.data[i].id);
    //                         alert(localStorage.getItem("tutorLink"));
    //                         console.log(localStorage.getItem("tutorLink"));
    //                         debugger;
    //                         this.props.history.push(`/Rate_DetailTutor/${localStorage.getItem("currentUser")}/${localStorage.getItem("tutorLink")}`)
    //                     }
    //                 }
    //             });
    //     });
    //
    //     return (<Form onSubmit={this.onSubmit2}>
    //             <div id="eventblock" {...defaultAttributes}
    //                  title={event.name}
    //                  key={event.id}
    //                  style={{
    //                      ...defaultAttributes.style,
    //                      background: colors[event.colorIndex],
    //                  }}>
    //                 <span id='eventName' className={styles.event_info}><a style={{fontWeight: 'bold', color: '#faf8ec'}}
    //                                                                       href={`/Rate_DetailTutor/${localStorage.getItem("currentUser")}/${localStorage.getItem("tutorLink")}`}>{event.name}</a></span>
    //                 <span id='eventInfo' className={styles.event_info}>
    //       {event.startTime.format('HH:mm')} - {event.endTime.format('HH:mm')}
    //             </span>
    //                 <span id='slotButton' className={styles.event_info}><Button>{event.button}</Button>
    //             </span>
    //             </div>
    //         </Form>
    //     )
    // };

    // Dropdown: selecting tutor
    tutorChange = (e) => {
        let fieldName = e.target.name;
        let fieldVal = e.target.value;
        this.state.tutor = fieldVal;
        console.log('---changeTutor----');
        console.log(this.state.tutor);
        //localStorage.setItem("tutor", e.target.value);
        localStorage.setItem("tutor", this.state.tutor);
        // axios.get('/tutors/'+this.props.match.params.id)
        //     .then(res => {
        //         this.setState({ tutor: res.data });
        //         console.log(this.state.tutor);
        //     });
        this.setState({form: {...this.state.form, [fieldName]: fieldVal}})
    };

    // Dropdown: selecting starting time
    startingTimeChange = (e) => {
        let fieldName = e.target.name;
        let fieldVal = e.target.value;
        this.state.from = fieldVal;
        console.log('---changeTutor----');
        console.log(this.state.from);
        localStorage.setItem("startTime", e.target.value);
        this.setState({form: {...this.state.form, [fieldName]: fieldVal}})
    };

    // Dropdown: selecting ending time
    endingTimeChange = (e) => {
        let fieldName = e.target.name;
        let fieldVal = e.target.value;
        this.state.to = fieldVal;
        console.log('---changeTutor----');
        console.log(this.state.to);
        localStorage.setItem("endTime", e.target.value);
        this.setState({form: {...this.state.form, [fieldName]: fieldVal}})
    };

    // Dropdown: display options of available tutors
    displayTutorOptions = (avail_tutors) => {
        console.log('---available tutors---');
        return this.state.avail_tutors.map((avail_tutors, index) => (
            <option value={avail_tutors[index]}>{avail_tutors.fName} {avail_tutors.lName}</option>
        ));
    };


    setEvents = (avail_tutors) => {
        var colors = ["#0080FF"];
        const daysOfWeek = {
            MONDAY: [],
            TUESDAY: [],
            WEDNESDAY: [],
            THURSDAY: [],
            FRIDAY: []
        };
        const time = '2020-01-01T';
        for (let i = 0; i < avail_tutors.length; i++) {
            const event = {
                // Need to edit here after retrieve certain data
                id: avail_tutors[i].id,
                name: avail_tutors[i].fName + " " + avail_tutors[i].lName,
                colorIndex: i % 1,
                buttonIndex: i,
                type: 'custom',
                startTime: moment(time + String(avail_tutors[i].sessionInfo.from) + ':00:00'),
                endTime: moment(time + String(avail_tutors[i].sessionInfo.to) + ':00:00'),
                button: "Reserve",
            };
            daysOfWeek[avail_tutors[i].sessionInfo.daysOfWeek].push(event);
        }
        let timetableProps = {
            events: daysOfWeek,
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
                // Time slot: Store data of time table event block when button clicked
                $('#slotButton').click(function () {
                    console.log(event);
                    console.log(defaultAttributes);
                    alert("Button Clicked");
                    var parent_id = $(this).parent().parent().attr('id');
                    console.log($(this).parent().parent().attr('id'));
                    console.log(parent_id);
                    debugger;
                    localStorage.setItem("tutor", event.name);
                    localStorage.setItem("startingTime", event.startTime);
                    localStorage.setItem("endingTime", event.endTime);
                    localStorage.setItem("buttonClick", 1);

                    console.log(localStorage.getItem("tutor"));
                    console.log(localStorage.getItem("startingTime"));
                    console.log(localStorage.getItem("endingTime"));
                    console.log(localStorage.getItem("currentUser"));
                    debugger;
                    // window.location = '/Reservation_Confirm?id=" + this.id';
                    window.location = `/Reservation_Confirm/${localStorage.getItem("currentUser")}`;
                });
                $('#eventName').click(function () {
                    axios.get('/tutors')
                        .then(res => {
                            // alert("get");
                            for (let i = 0; i < res.data.length; i++) {
                                if (event.name === (res.data[i].fName + " " + res.data[i].lName)) {
                                    console.log(event.name);
                                    console.log(res.data[i].fName + " " + res.data[i].lName);
                                    alert(event.name);
                                    localStorage.setItem("tutorLink", res.data[i].id);
                                    alert(localStorage.getItem("tutorLink"));
                                    console.log(localStorage.getItem("tutorLink"));
                                    debugger;
                                    this.props.history.push(`/Rate_DetailTutor/${localStorage.getItem("currentUser")}/${localStorage.getItem("tutorLink")}`)
                                }
                            }
                        });
                });
                return (
                    <div
                        {...defaultAttributes}
                        title={event.name}
                        key={event.id}
                        style={{
                            ...defaultAttributes.style,
                            background: colors[event.colorIndex],
                        }}
                    >
                        <span className={styles.event_info} id="font-large"><a id='eventName'
                                                                               style={{
                                                                                   fontWeight: 'bold',
                                                                                   color: '#faf8ec'
                                                                               }}
                                                                               href={`/Rate_DetailTutor/${localStorage.getItem("currentUser")}/${localStorage.getItem("tutorLink")}`}>{event.name}</a></span>
                        <span className={styles.event_info} id="font-medium">
                            {event.startTime.format("HH:mm")} -{" "}
                            {event.endTime.format("HH:mm")}
                        </span>
                        {/*<span className={styles.event_info}><Button id="slotButton" className="btn-outline-success" >{event.button}</Button></span>*/}
                        <span id="slotButton" className={styles.event_info}><Button className="btn-outline-success"><a
                            id='eventName'
                            style={{fontWeight: 'bold', color: '#007bff'}}
                            href={`/Reservation_Confirm/${localStorage.getItem("currentUser")}`}>{event.button}</a></Button></span>
                        {/*<span id = 'slotButton' className={styles.event_info} href={`/Reservation_Confirm/${localStorage.getItem("currentUser")}`}><Button className="btn-outline-success" >{event.button}</Button></span>*/}
                    </div>
                );
            }
        };
        this.setState({timetableProps: timetableProps});
    };

    // Dropdown: display options of Starting Time
    displayStartingTimeOptions = () => {
        return (<>
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
            </>
        );
    };

    // Dropdown: display options of Ending Time
    displayEndingTimeOptions = () => {
        return (<>
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
            </>
        );
    };

    // List: store data of tutoring session when button clicked in the list view
    cardButtonOnClick(id){
        axios.get('/tutors/' + id)
            .then((result) => {
                localStorage.setItem("tutor", result.data.fName+ " " + result.data.lName);
                localStorage.setItem("startTime", result.data.sessionInfo.from);
                localStorage.setItem("endTime", result.data.sessionInfo.to);
                console.log(localStorage.getItem("tutor"));
                console.log(localStorage.getItem("startTime"));
                console.log(localStorage.getItem("endTime"));
                debugger;
                this.props.history.push(`/Reservation_Confirm/${this.state.currentUser.id}`)
            });
    }

    // for cancel button
    handleCancel() {
        alert("Your reservation process is canceled")
    };

    // Return the ViewProfile, View Schedule History only if the user is logged in & check if tutor/tutee
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

    handleAvailability(availables) {
        if (availables.length == 0) {
            return <div>
                <h4>
                    <center> Oops, there's no result! Please try another option.
                    </center>
                </h4>
            </div>
        } else {
            return <div>
                <h4>
                    <center>To proceed reserving tutoring session for {this.state.courseReserve},
                        on {this.state.days}, {this.state.days2} between {this.state.from}:00 and {this.state.to}:00,
                    </center>
                </h4>
                <h4>
                    <center> Please select the preferred time slot with the preferred tutor!</center>
                </h4>
            </div>
        }
    }

    render() {
        const now = 50;
        const progressInstance = <ProgressBar animated now={now} label={`${now}%`}/>;
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
                                <h1>SELECT TIMESLOT</h1>
                            </div>
                        </div>
                    </div>
                </section>
                <br></br>
                <h4>
                    <center>To proceed reserving tutoring session for {this.state.courseReserve},
                        on {this.state.days}, {this.state.days2} between {this.state.from}:00 and {this.state.to}:00,
                    </center>
                </h4>
                <h4>
                    <center> Please select the preferred time slot with the preferred tutor!</center>
                </h4>
                <br></br>
                <div>
                    {/*<Jumbotron>{<Timetable*/}
                    {/*    events={this.state.events}*/}
                    {/*    renderHour={this.renderHour}*/}
                    {/*    renderEvent={this.renderEvent}*/}
                    {/*    hoursInterval={[12, 24]}*/}
                    {/*    timeLabel="Time"*/}
                    {/*/>}</Jumbotron>*/}
                    <Jumbotron>
                        <center><h5>Progress: 50%</h5></center>
                        {progressInstance}<br></br>
                        <h4>Method A: Timeslot</h4>
                        <Timetable {...this.state.timetableProps} /></Jumbotron>
                    <br></br>
                    <div>
                        <div className="row">
                            <div className="col-lg">
                                <Form onSubmit={this.onSubmit}>
                                    <Jumbotron><h4>Method B: Dropdown</h4><br></br>
                                        <div className="row">
                                            <Form.Group className="col" controlId="selectTutor">
                                                <center><Form.Label style={{fontWeight: 'bold'}}>Select
                                                    Tutor</Form.Label>
                                                </center>
                                                <Form.Control
                                                    required
                                                    as="select"
                                                    name="tutor"
                                                    placeholder="test"
                                                    value={this.state.tutor}
                                                    onChange={this.tutorChange}
                                                >
                                                    <option disabled value={-1}>Click here to select the tutor!</option>
                                                    <option value="default">Tutor</option>
                                                    {this.displayTutorOptions()}
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group className="col" controlId="selectStartingTime">
                                                <center><Form.Label style={{fontWeight: 'bold'}}>Select Starting
                                                    Time</Form.Label></center>
                                                <Form.Control
                                                    required
                                                    as="select"
                                                    name="startingTime"
                                                    placeholder="test"
                                                    value={this.state.from}
                                                    onChange={this.startingTimeChange}
                                                >
                                                    <option disabled value={-1}>Click here to select the starting time!
                                                    </option>
                                                    <option value="default">Starting Time</option>
                                                    {this.displayStartingTimeOptions()}
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group className="col" controlId="selectEndingTime">
                                                <center><Form.Label style={{fontWeight: 'bold'}}>Select Ending
                                                    Time</Form.Label></center>
                                                <Form.Control
                                                    required
                                                    as="select"
                                                    name="endingTime"
                                                    placeholder="test"
                                                    value={this.state.to}
                                                    onChange={this.endingTimeChange}
                                                >
                                                    <option disabled value={-1}>Click here to select the ending time!
                                                    </option>
                                                    <option value="default">Ending Time</option>
                                                    {this.displayEndingTimeOptions()}
                                                </Form.Control>
                                            </Form.Group></div>
                                    <br></br>
                                    <center><Button className="btn btn-outline-secondary" type="submit"
                                                    href={`/Reservation_Confirm/${this.state.currentUser.id}`}>Submit</Button>
                                    </center>   </Jumbotron>
                                </Form><br></br>
                                <Card><h4>Method C: List</h4>
                                    <table className="table table-stripe">
                                        <thead>
                                        <tr>
                                            <th>
                                                <center>Available Slots</center>
                                            </th>
                                            <th>
                                                <center>Reserve</center>
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.avail_tutors.map(t =>
                                            <tr id="trow" key={t.id}>
                                                <td>
                                                    <center>{t.fName + "  " + t.lName}<br></br>{t.sessionInfo.from}:00 pm
                                                        to {t.sessionInfo.to}:00 pm
                                                    </center>
                                                </td>
                                                <td>
                                                    <center>
                                                        <button className="btn btn-outline-primary" onClick={this.cardButtonOnClick.bind(this, t.id)}>Reserve</button>
                                                    </center>
                                                </td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </table>
                                </Card><br></br>
                                <div className="row">
                                    <span className="col"><center><Button className="btn btn-outline-secondary"
                                                                          href={`/Reservation_Search/${this.state.currentUser.id}`}>Go Back</Button></center></span>
                                    <span className="col"><center><Button className="btn btn-outline-danger"
                                                                          onClick={this.handleCancel}
                                                                          href={`/Home/${this.state.currentUser.id}`}>Cancel</Button></center></span>
                                </div>
                                <br></br>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Reservation_Reserve;