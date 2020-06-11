/////////////////////////////////////////////////////////////////////////////
//Contains a list of tutors. This links to the Admin_AddTutor.js
/////////////////////////////////////////////////////////////////////////////

import React, {Component} from 'react';
import axios from 'axios';
import {Nav, Navbar, Jumbotron, Card} from "react-bootstrap";
import MaterialTable from "material-table";
import $ from "jquery";


class Admin_ReservationLog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            reservations: [],
            reservation: {},
            currentUser: {},
        };
    }

    // Get the reservation data from the DB
    componentDidMount() {
        axios.get('/reservations')
            .then(res => {
                this.setState({reservations: res.data});
                console.log(this.state.reservations);
            });
        this.handleLogin();
    }

    // Delete reservation record from the database, hide row
    delete(id) {
        console.log(id);
        axios.delete('/reservations/' + id)
            .then((result) => {
                this.props.history.push(`/Admin_ReservationLog/${this.state.currentUser.id}`)
            });
        $('#trow').hide();
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
                    <Navbar.Brand href={`/Admin_Home/${this.state.currentUser.id}`}>
                        <center>Admin Home</center>
                    </Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href={`/Admin_ShowTutor/${this.state.currentUser.id}`}>
                            <center>Tutor List</center>
                        </Nav.Link>
                        <Nav.Link href={`/Admin_ReservationLog/${this.state.currentUser.id}`}>
                            <center>Reservation Log</center>
                        </Nav.Link>
                        <Nav.Link href={`/Admin_AttendanceLog/${this.state.currentUser.id}`}>
                            <center>Attendance Log</center>
                        </Nav.Link>
                        <Nav.Link href={`/Home/${this.state.currentUser.id}`}>
                            <center>Find My Tutor Home</center>
                        </Nav.Link>
                        {this.getContent()}
                    </Nav>
                </Navbar></div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            <br></br>
                            <center>RESERVATION LOG</center>
                            <br></br>
                        </h3>
                    </div>
                    <div className="panel-body">
                        {/*Table for the tutors list*/}
                        <Jumbotron>
                            <Card>
                                <table className="table table-stripe">
                                    <thead>
                                    <tr>
                                        <th>
                                            <center>Reservation ID</center>
                                        </th>
                                        <th>
                                            <center>Course Name</center>
                                        </th>
                                        <th>
                                            <center>Tutor Name</center>
                                        </th>
                                        <th>
                                            <center>Tutee Name</center>
                                        </th>
                                        <th>
                                            <center>Delete</center>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.reservations.map(r =>
                                        <tr id = "trow" key={r.id}>
                                            <td>
                                                <center>{r.id}</center>
                                            </td>
                                            <td>
                                                <center>{r.course}</center>
                                            </td>
                                            <td>
                                                <center>{r.tutor.fName + " " + r.tutor.lName}</center>
                                            </td>
                                            <td>
                                                <center>{r.tutee.name}</center>
                                            </td>
                                            <td>
                                                <center>
                                                    <button onClick={this.delete.bind(this, r.id)}
                                                            className="btn btn-outline-danger">Delete
                                                    </button>
                                                </center>
                                            </td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                                {/*<div style={{ maxWidth: "100%" }}>*/}
                                {/*    <MaterialTable*/}
                                {/*        columns={[*/}
                                {/*            { title: "Reservation ID", field: "rid" },*/}
                                {/*            { title: "Course Name", field: "course" },*/}
                                {/*            { title: "Tutor Name", field: "tutor"},*/}
                                {/*            { title: "Tutee Name", field: "tutee"},*/}
                                {/*            { title: "Delete", field: "delete"},*/}
                                {/*        ]}*/}
                                {/*        data={[*/}
                                {/*            { rid: "", course: "", tutee: "", delete: <button onClick={this.delete.bind(this)} className="btn btn-outline-danger">Delete</button> }*/}
                                {/*        ]}*/}
                                {/*        title="Reservation Log"*/}
                                {/*    />*/}
                                {/*</div>*/}</Card>
                        </Jumbotron>
                    </div>
                </div>
            </div>
        );
    }
}

export default Admin_ReservationLog;
