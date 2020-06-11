/////////////////////////////////////////////////////////////////////////////
//Contains a list of tutors. This links to the Rate_DetailTutor.js
/////////////////////////////////////////////////////////////////////////////


import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {Nav, Navbar} from "react-bootstrap";
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'


class Rate_ViewTutor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tutors: [],
            currentUser: {},
        };
    }

    // Get the tutors' data from the DB
    componentDidMount() {
        this.handleLogin();
        axios.get('/tutors')
            .then(res => {
                this.setState({ tutors: res.data });
                console.log(this.state.tutors);
            });
        this.checkIfTutor();
    }

    handleLogin() {
        axios
            .get('/signup/' + this.props.match.params.id)
            .then(response => {
                this.setState({currentUser: response.data, loggedin: true});
                console.log(this.state.currentUser);
                localStorage.setItem("userID", this.state.currentUser.id)
                console.log(localStorage.getItem("userID"))
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
                if(this.state.isTutor == true) {
                }
            });
    }

    //Return the ViewProfile, View Schedule & History only if the user is logged in
    // getContent() {
    //     return (<><Nav.Link href={`/ViewProfile/${this.state.currentUser.id}`}>
    //         <center>Profile</center>
    //     </Nav.Link><Nav.Link href={`/ViewScheduleHistory/${this.state.currentUser.id}`}>
    //         <center>Schedule and History</center>
    //     </Nav.Link><Nav.Link href="/">
    //         <button className="btn btn-outline-secondary">
    //             <center>Log Out</center>
    //         </button>
    //     </Nav.Link>
    //     </>)
    // }

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
                                <h1>TUTOR LISTS</h1>
                            </div>
                        </div>
                    </div>
                </section>
                <br></br>
                <br></br>
                <br></br>
                <h2><center>SELECT TUTOR FOR MORE DETAILS</center></h2>
                <br></br>
                <br></br>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            <center>TUTORS LIST</center>
                        </h3>
                    </div>
                    <div className="panel-body">
                        {/*Table for the tutors list*/}
                        <table className="table table-stripe">
                            <thead>
                                <tr>
                                    <th><center>Tutor Name</center></th>
                                    <th><center>Course Name</center></th>
                                    <th><center>Overall Rating</center></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.tutors.map(t =>
                                    <tr key={t.id}>
                                        <td><Link to={`/Rate_DetailTutor/${localStorage.getItem("userID")}/${t.id}`}><center>{t.fName +"  "+t.lName}</center></Link></td>
                                        <td><center>{t.courseName}</center></td>
                                        <td><center><Rater rating={(t.sumOfHlepfulness+t.sumOfPuncuality+t.sumOfPreparation)/(3*t.divideFactor)} total={5} interactive={false} /></center></td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Rate_ViewTutor;
