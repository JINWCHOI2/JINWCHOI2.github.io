//Contains a form that enables users to edit their information.

import React, { Component } from 'react';
import {
    withRouter,
    Link
} from "react-router-dom";
import axios from "axios";
import '../App.css'
import { Nav, Navbar, Jumbotron, } from "react-bootstrap";

// import { Button, ButtonGroup } from 'react-bootstrap';
// import { Avatar } from 'antd';
// import 'antd/dist/antd.css';
// import  profilePicChanger  from './components/profilePicChanger'
// import profilePic from './assets/img.png';

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            academicStanding: '',
            SBUID: '',
            placeHolder: {},
            seen: false,
            currentUser: {},
        };
    }

    // After making DBseeder for course / add course from the admin page
    componentDidMount() {
        this.handleLogin();
        this.checkIfTutor();
    }

    handleLogin() {
        axios
            .get('/signup/' + this.props.match.params.id)
            .then(response => {
                this.setState({ currentUser: response.data, loggedin: true });
                console.log(this.state.currentUser);
                this.setPlaceHolders(response.data);
            })
            .catch(error => {
                console.log("check login error", error);
            });
    }

    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    };

    onSubmit = (e) => {
        e.preventDefault();
        var { userName, SBUID, academicStanding } = this.state;
        if (isNaN(SBUID)){
            alert('Invalid SBU ID!');
            return;
        }
        if (!userName.length)
            userName = this.state.currentUser.userName;
        if (!SBUID.length)
            SBUID = this.state.currentUser.SBUID;
        if (!academicStanding.length)
            academicStanding = this.state.currentUser.academicStanding;
        axios.put('/signup/' + this.props.match.params.id, { userName, sbuid: SBUID, academicStanding })
            .then((result) => {
                this.props.history.push("/ViewProfile/" + this.props.match.params.id);
            });
        alert("Your profile information is Saved!");
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

    setPlaceHolders = (currentUser) => {
        var placeHolder = {};
        if (currentUser.userName)
            placeHolder['userName'] = currentUser.userName;
        else
            placeHolder['userName'] = 'Set your user name.';

        if (currentUser.sbuid)
            placeHolder['SBUID'] = currentUser.sbuid;
        else
            placeHolder['SBUID'] = 'Enter your SBU ID.';

        if (currentUser.academicStanding)
            placeHolder['academicStanding'] = currentUser.academicStanding;
        else
            placeHolder['academicStanding'] = 'Not selected';
        this.setState({ placeHolder: placeHolder });
    };

    editForm = () => {
        return (
            <div>
                <Jumbotron>
                    <form onSubmit={this.onSubmit}>
                        <br></br>
                        <table className="table table-stripe">
                            <thead>
                                <tr>
                                    <th>
                                        <center></center>
                                    </th>
                                    <th>
                                        <center></center>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><p>Name</p></td>
                                    <td><p>{this.state.currentUser.name}</p></td>
                                </tr>
                                <tr>
                                    <td><p>Email</p></td>
                                    <td><p>{this.state.currentUser.email}</p></td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="userName">User Name:</label></td>
                                    <td><input value={this.state.userName} type="text" name="userName"
                                        placeholder={this.state.placeHolder['userName']}
                                        onChange={this.onChange} autoFocus /></td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="SBUID">SBUID:</label></td>
                                    <td><input value={this.state.SBUID} type="text" name="SBUID"
                                        placeholder={this.state.placeHolder['SBUID']}
                                        onChange={this.onChange} autoFocus /></td>
                                </tr>
                                {/* <tr>
                                <td><label htmlFor="academicStanding">Academic Standing:</label></td>
                                <td><input value={this.state.academicStanding} type="text" name="academicStanding"
                                           placeholder="Enter your academic standing" onChange={this.onChange} autoFocus
                                           /></td>
                            </tr> */}
                                <tr>
                                    <td><label htmlFor="academicStanding">Academic Standing:</label></td>
                                    <td><select id="academicStanding" name="academicStanding" onChange={this.onChange}>
                                        <option value="">Current: {this.state.placeHolder['academicStanding']}</option>
                                        <option value="Outstanding">Outstading</option>
                                        <option value="Good">Good</option>
                                        <option value="Average">Average</option>
                                        <option value="Needs Improvement">Needs Improvement</option>
                                        <option value="Rather Not Say">Rather Not Say</option>
                                    </select></td>
                                </tr>
                            </tbody>
                        </table>
                        {/*/!* userName *!/*/}
                        {/*<div className="col-lg-12 text-center">*/}
                        {/*    <div>*/}
                        {/*        <div>*/}
                        {/*            <label htmlFor="userName">User Name: </label>*/}
                        {/*            <input value={this.state.userName} type="text" name="userName" placeholder="Enter your username"*/}
                        {/*                   onChange={this.onChange} autoFocus required/>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div><br></br>*/}
                        {/*/!* academicStanding *!/*/}
                        {/*<div className="col-lg-12 text-center">*/}
                        {/*    <div>*/}
                        {/*        <div>*/}
                        {/*            <label htmlFor="academicStanding">Academic Standing: </label>*/}
                        {/*            <input value={this.state.academicStanding} type="text" name="academicStanding"*/}
                        {/*                   placeholder="Enter your academic standing" onChange={this.onChange} autoFocus required/>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div><br></br><br></br>*/}
                        <div className="col-lg-12 text-center">
                            <button type="submit" className="btn btn-outline-primary">Save</button>
                        </div>
                    </form>
                </Jumbotron>
            </div>)
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
                    <center><h4><a className="btn btn-primary btn-md text-uppercase js-scroll-trigger">CONTACT US</a></h4></center>
                </Nav.Link><Nav.Link href="/">
                    <button className="btn btn-primary btn-sm text-uppercase js-scroll-trigger">
                        <center><h4>Log Out</h4></center>
                    </button>
                </Nav.Link>
            </>))
        }
    }

    render() {
        const { userName, academicStanding } = this.state;
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
                </Navbar>
                </div>
                <br></br><br></br><br></br>
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <section id="one" className="main">
                        <div className="inner spotlight style1">
                            <div className="card-body">
                                <center><h1>EDIT PROFILE</h1></center>
                            </div>
                            <body>
                                <div>
                                    <div className="col-lg-12 text-center">
                                        <h4>Edit Profile Information</h4> <br></br>
                                        <div>{this.editForm()}</div>
                                    </div>
                                </div>
                            </body>
                        </div>
                    </section>
                </div>
            </div>

        )
    }
}

export default withRouter(EditProfile);