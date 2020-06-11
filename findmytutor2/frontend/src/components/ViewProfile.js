// Contains a list of the users’ information. This links to EditProfile.js 
// if the users clicks the button to edit the profile. 
import React, {Component} from 'react';
import {
    withRouter,
    Link
} from "react-router-dom";
import axios from "axios";
import '../App.css'
import Footer from '../components/common/Footer';
import {Nav, Navbar, Jumbotron, Table, Card} from "react-bootstrap";

class ViewProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            department: '',
            academicStanding: '',
            visible: false,
            currentUser: {},
            seen: false,
        };
    }

    componentDidMount = () => {
        this.getProfile();
        this.checkIfTutor();
    };

    getProfile = () => {
        axios.get('/signup/' + this.props.match.params.id)
            .then(response => {
                this.setState({currentUser: response.data, loggedin: true});
                console.log(this.state.currentUser);
            })
            .catch(error => {
                console.log("check login error", error);
            });
    };

    displayProfile = (currentUser) => {
        return (
            <div className="jumbotron">
                {/*<div className="panel-body">*/}
                {/*    <div id="page-wrapper">*/}
                <table className="table table-stripe">
                    <thead>
                    <tr>
                        <th>
                            <center>Criteria</center>
                        </th>
                        <th>
                            <center>User Info</center>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>name</td>
                        <td>{currentUser.name}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>{currentUser.email}</td>
                    </tr>
                    <tr>
                        <td>User Name</td>
                        <td>{currentUser.userName}</td>
                    </tr>
                    <tr>
                        <td>SBU Student ID</td>
                        <td>{currentUser.sbuid}</td>
                    </tr>
                    <tr>
                        <td>Academic Standing</td>
                        <td>{currentUser.academicStanding}</td>
                    </tr>
                    </tbody>
                </table>
                <div className="col-lg-12 text-center">
                    <Link to={`/EditProfile/${this.state.currentUser.id}`}
                          className="btn btn-outline-secondary">Edit</Link>
                </div>
            </div>
        );
    };

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
                                <h1>VIEW PROFILE</h1>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="container">
                    <div className="panel-default">
                        <div id="page-wrapper">
                            <center>
                                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                                    <section id="one" className="main">
                                        <div className="inner spotlight style1">
                                            <body>
                                            <div>
                                                <div className="col-lg-12 text-center">
                                                    <h4>Profile Information</h4> <br></br>
                                                    <div>{this.displayProfile(this.state.currentUser)}</div>
                                                </div>
                                            </div>
                                            </body>
                                        </div>
                                    </section>
                                </div>
                            </center>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default withRouter(ViewProfile);
