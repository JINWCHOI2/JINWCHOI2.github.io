/////////////////////////////////////////////////////////////////////////////
//Contains a list of tutors. This links to the Admin_AddTutor.js
/////////////////////////////////////////////////////////////////////////////

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {Nav, Navbar} from "react-bootstrap";


class Admin_ShowTutor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tutors:[],
            currentUser: {},

        };
    }

    // Get the tutors' data from the DB
    componentDidMount() {
        axios.get('/tutors')
            .then(res => {
                this.setState({ tutors: res.data });
                console.log(this.state.tutors);
            });
        this.handleLogin();
    }

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
    getContent() {
        return (<><Nav.Link href="/">
            <button className="btn btn-outline-secondary">
                <center>Log Out</center>
            </button>
        </Nav.Link>
        </>)
    }

    render() {
        return (
            <div className="container">
                <div><Navbar bg="light" variant="light">
                    <Navbar.Brand href={`/Admin_Home/${this.state.currentUser.id}`}><center>Admin Home</center></Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href={`/Admin_ShowTutor/${this.state.currentUser.id}`}><center>Tutor List</center></Nav.Link>
                        <Nav.Link href={`/Admin_ReservationLog/${this.state.currentUser.id}`}><center>Reservation Log</center></Nav.Link>
                        <Nav.Link href={`/Admin_AttendanceLog/${this.state.currentUser.id}`}><center>Attendance Log</center></Nav.Link>
                        <Nav.Link href={`/Admin_ReminderLog/${this.state.currentUser.id}`}><center>Meeting Reminder Log</center></Nav.Link>
                        <Nav.Link href={`/Home/${this.state.currentUser.id}`}><center>Find My Tutor Home</center></Nav.Link>
                        {this.getContent()}
                    </Nav></Navbar></div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            <br></br>
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
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.tutors.map(t =>
                                <tr key={t.id}>
                                    <td><Link to={`/Admin_ViewTutorDetail/${t.id}`}><center>{t.fName + t.lName}</center></Link></td>
                                    <td><center>{t.courseName}</center></td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                        <center><h4><Link to={`/Admin_AddTutor/${this.state.currentUser.id}`}>Add Tutor</Link></h4></center>
                    </div>
                </div>
            </div>
        );
    }
}

export default Admin_ShowTutor;
