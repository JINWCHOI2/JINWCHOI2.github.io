/////////////////////////////////////////////////////////////////////////////
//Contains a form that enables admins to edit the information of the tutors. This links to the Admin_ViewTutorDetail.js
/////////////////////////////////////////////////////////////////////////////

import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Nav, Navbar} from "react-bootstrap";

class Admin_EditTutor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tutor: {},
        };
    }

    // Get the particular tutor's data by id from the DB
    componentDidMount() {
        axios.get('/tutors/' + this.props.match.params.id)
            .then(res => {
                this.setState({tutor: res.data});
                console.log(this.state.tutor);
            });
    }

    onChange = (e) => {
        const state = this.state.tutor;
        state[e.target.name] = e.target.value;
        debugger;
        this.setState({tutor: state});
    }

    // The tutor data will be updated(put) when the admin clicks on the submit button
    onSubmit = (e) => {
        e.preventDefault();
        const {fName, lName, courseName, daysOfWeek, from, to, payment} = this.state.tutor;
        axios.put('/tutors/' + this.props.match.params.id, {fName, lName, courseName, daysOfWeek, from, to, payment})
            .then((result) => {
                this.props.history.push("/Admin_ViewTutorDetail/" + this.props.match.params.id);
            });
    }

    render() {
        return (
            <div className="container">
                <div><Navbar bg="light" variant="light">
                    <Navbar.Brand href="/Admin_Home">
                        <center>Admin Home</center>
                    </Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/Admin_ShowTutor">
                            <center>Tutor List</center>
                        </Nav.Link>
                        <Nav.Link href="/Admin_ReservationLog">
                            <center>Reservation Log</center>
                        </Nav.Link>
                        <Nav.Link href="/Admin_AttendanceLog">
                            <center>Attendance Log</center>
                        </Nav.Link>
                        <Nav.Link href="/Admin_ReminderLog">
                            <center>Meeting Reminder Log</center>
                        </Nav.Link>
                    </Nav></Navbar></div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            <br></br>
                            <center>EDIT TUTOR INFO</center>
                        </h3>
                    </div>
                    <div className="panel-body">
                        {/*Form for the tutor data input for update*/}
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="fName">First Name:</label>
                                <input type="text" className="form-control" name="fName"
                                       value={this.state.tutor.fName || ''} onChange={this.onChange}
                                       placeholder="Enter tutor's first name"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="lName">Last Name:</label>
                                <input type="text" className="form-control" name="lName"
                                       value={this.state.tutor.lName || ''} onChange={this.onChange}
                                       placeholder="Enter tutor's last name"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="courseName">Course ID:</label>
                                <input type="text" className="form-control" name="courseName"
                                       value={this.state.tutor.courseName || ''} onChange={this.onChange}
                                       placeholder="ID of the Course"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="daysOfWeek">daysOfWeek:</label>
                                <input type="text" className="form-control" name="daysOfWeek"
                                       value={this.state.tutor.daysOfWeek || ''} onChange={this.onChange}
                                       placeholder="daysOfWeek"/>
                            </div>
                            <div className="col-lg-12 text-center">
                                <label htmlFor="from">From:</label>
                                <input type="text" className="form-control" name="from"
                                       value={this.state.tutor.from || ''} onChange={this.onChange} placeholder="from"/>
                            </div>
                            <div className="col-lg-12 text-center">
                                <label htmlFor="to">To:</label>
                                <input type="text" className="form-control" name="to" value={this.state.tutor.to || ''}
                                       onChange={this.onChange} placeholder="to"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="payment">payment:</label>
                                <input type="text" className="form-control" name="payment"
                                       value={this.state.tutor.payment || ''} onChange={this.onChange}
                                       placeholder="payment"/>
                            </div>
                            <center>
                                <button type="submit" className="btn btn-outline-success">Update</button>
                            </center>
                            <br></br>
                            <center><h4><Link to={`/Admin_ViewTutorDetail/${this.state.tutor.id}`}><span
                                className="glyphicon glyphicon-eye-open" aria-hidden="true"></span> Go Back to Tutor
                                Info </Link></h4></center>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Admin_EditTutor;