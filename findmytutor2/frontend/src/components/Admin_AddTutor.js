/////////////////////////////////////////////////////////////////////////////
//Contains a form that enables admins to add the information of the tutors. This links to the Admin_ShowTutor.js
/////////////////////////////////////////////////////////////////////////////

import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import axios from 'axios';
import {Nav, Navbar} from "react-bootstrap";

class Admin_AddTutor extends Component {

    constructor() {
        super();
        this.state = {
            fName: '',
            lName: '',
            courseName: '',
            daysOfWeek: '',
            currentUser:{},
            from: '',
            to: '',
            payment: '',
        };
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

    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    // The tutor data will be stored when the admin clicks on the submit button
    onSubmit = (e) => {
        e.preventDefault();
        const {fName, lName, courseName, daysOfWeek, from, to, payment} = this.state;

        axios.post('/tutors', {fName, lName, courseName, daysOfWeek, from, to, payment})
            .then((result) => {
                console.log("After Posting new Tutor: " + result.data);
                const tutorID = result.data.id;
                this.props.history.push("/Admin_ShowTutor");
            });
    }

    // Get the tutor's data
    componentDidMount() {
        axios.get('/tutors')
            .then(({data}) => this.setState({tutor: data}))
            .catch(e => console.log(e))
        this.handleLogin();
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
        const {fName, lName, courseName, daysOfWeek, from, to, payment} = this.state;
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
                <br></br>
                <h2><center>Add Tutor</center></h2>

                {/*Form for the new tutor data input*/}
                <center><form onSubmit={this.onSubmit}>
                    <div className = "col-lg-12 text-center">
                        <label htmlFor="firstName">First Name:</label>
                        <input type="text" className="form-control" name="fName" value={fName} onChange={this.onChange} placeholder="Enter tutor's first name" />
                    </div>
                    <div className = "col-lg-12 text-center">
                        <label htmlFor="lastName">Last Name:</label>
                        <input type="text" className="form-control" name="lName" value={lName} onChange={this.onChange} placeholder="Enter tutor's last name" />
                    </div>
                    <div className = "col-lg-12 text-center">
                        <label htmlFor="course Name">Course ID:</label>
                        <input type="text" className="form-control" name="courseName" value={courseName} onChange={this.onChange} placeholder="ID of the Course" />
                    </div>
                    <div className = "col-lg-12 text-center">
                        <label htmlFor="daysOfWeek">Days Of Week:</label>
                        <input type="text" className="form-control" name="daysOfWeek" value={daysOfWeek} onChange={this.onChange} placeholder="daysOfWeek" />
                    </div>
                    <div className = "col-lg-12 text-center">
                        <label htmlFor="from">From:</label>
                        <input type="text" className="form-control" name="from" value={from} onChange={this.onChange} placeholder="from" />
                    </div>
                    <div className = "col-lg-12 text-center">
                        <label htmlFor="to">To:</label>
                        <input type="text" className="form-control" name="to" value={to} onChange={this.onChange} placeholder="to" />
                    </div>
                    <div className = "col-lg-12 text-center">
                        <label htmlFor="payment">Payment:</label>
                        <input type="text" className="form-control" name="payment" value={payment} onChange={this.onChange} placeholder="payment" />
                    </div>
                    <br></br><button type="submit" className="btn btn-outline-secondary">Save</button>
                </form></center>
            </div>
        );
    }
}
export default withRouter(Admin_AddTutor);
