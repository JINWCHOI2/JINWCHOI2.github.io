/////////////////////////////////////////////////////////////////////////////
//Contains a list of specific tutor. This links to the Admin_EditTutor.js when the admin clicks on the “edit” button. Admin can delete the tutor data by clicking on the “delete” button.
/////////////////////////////////////////////////////////////////////////////

import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {Nav, Navbar} from "react-bootstrap";

class Admin_ViewTutorDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tutor: {},
            daysOfWeek: '',
            from:'',
            to:'',
        };
    }

    // Get the particular tutor's data by id from the DB
    componentDidMount() {
        axios.get('/tutors/'+this.props.match.params.id)
            .then(res => {
                this.setState({tutor: res.data});
                console.log(res.data);
                console.log(res.data.courseName);
                console.log(res.data.sessionInfo);
                console.log(res.data.sessionInfo.daysOfWeek);
                this.setState({daysOfWeek: res.data.sessionInfo.daysOfWeek});
                this.setState({from: res.data.sessionInfo.from});
                this.setState({to: res.data.sessionInfo.to});
            });
        console.log(this.state.tutor);
        console.log(this.state.daysOfWeek);
    }

    // Delete the particular tutor's data from the DB
    delete(id){
        console.log(id);
        axios.delete('/tutors/'+id)
            .then((result) => {
                this.props.history.push("/Admin_ShowTutor")
            });
    }

    render() {
        return (
            <div className="container">
                <div><Navbar bg="light" variant="light">
                    <Navbar.Brand href="/Admin_Home"><center>Admin Home</center></Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/Admin_ShowTutor"><center>Tutor List</center></Nav.Link>
                        <Nav.Link href="/Admin_ReservationLog"><center>Reservation Log</center></Nav.Link>
                        <Nav.Link href="/Admin_AttendanceLog"><center>Attendance Log</center></Nav.Link>
                        <Nav.Link href="/Admin_ReminderLog"><center>Meeting Reminder Log</center></Nav.Link>
                    </Nav></Navbar></div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            <br></br>
                            <center>Tutor Detail</center>
                        </h3>
                    </div>
                    <div className="panel-body">
                        {/*Table for the tutor's detail*/}
                        <table className="table table-stripe">
                            <thead>
                            <tr>
                                <th><center>Course Name</center></th>
                                <th><center>Days Of Week</center></th>
                                <th><center>From</center></th>
                                <th><center>To</center></th>
                                <th><center>Payment</center></th>
                                <th><center>Edit</center></th>
                                <th><center>Delete</center></th>
                            </tr>
                            </thead>
                            <tbody>
                                <td><center>{this.state.tutor.courseName}</center></td>
                                <td><center>{this.state.daysOfWeek}</center></td>
                                <td><center>{this.state.from + ": 00"}</center></td>
                                <td><center>{this.state.to + ": 00"}</center></td>
                                <td><center>{"$" + this.state.tutor.payment}</center></td>
                                <td><center><Link to={`/Admin_EditTutor/${this.state.tutor.id}`} className="btn btn-outline-success">Edit</Link></center></td>
                                <td><center><button onClick={this.delete.bind(this, this.state.tutor.id)} className="btn btn-outline-danger">Delete</button></center></td>
                            </tbody>
                        </table>
                        <center><h4><Link to="/Admin_ShowTutor">Go Back to Tutor List</Link></h4></center>
                    </div>
                </div>
            </div>
        );
    }
}

export default Admin_ViewTutorDetail;
