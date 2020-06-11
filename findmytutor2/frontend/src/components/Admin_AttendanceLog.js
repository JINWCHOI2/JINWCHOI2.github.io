/////////////////////////////////////////////////////////////////////////////
//Contains a list that enables admins to review the attendance log. The admin can delete the attendance record by clicking the delete button.
/////////////////////////////////////////////////////////////////////////////

import React, { Component, useState } from 'react';
import axios from 'axios';
import { Button, Nav, Navbar, Table, Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { DateRange  } from 'react-date-range';
import moment from 'moment';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import '../App.css'

class Admin_AttendanceLog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            test: 'this is a test',
            attendance: {},
            timePeriod: [],
        };
        this.getDataFromDateRangePicker = this.getDataFromDateRangePicker.bind(this);  
    };

    componentDidMount = () => {
        this.handleLogin();
        this.getAttendanceLog();
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

    getAttendanceLog = () => {
        axios.get('/attendance')
            .then((response) => {
                this.setState({attendance: response.data});
                console.log('attendace data received');
                console.log(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    getDataFromDateRangePicker = (value) => {
        var list = [];
        list.push(moment(value.startDate).format('YYYY-MM-DD'))
        list.push(moment(value.endDate).format('YYYY-MM-DD'))
        console.log(list);
        this.setState({timePeriod: list});
    }

    sortAttendanceLog = (attendance, timePeriod) => {
        //console.log(attendance);
        var sortedLog = [];
        for(let i = 0; i < attendance.length; i++){
            var dateToCompare = moment(attendance[i].dateOfSession);
            //moment('2010-10-20').isSameOrAfter('2010-10-20', 'day');
            if(dateToCompare.isSameOrAfter(timePeriod[0]) && dateToCompare.isSameOrBefore(timePeriod[1])){
                sortedLog.push(attendance[i]);
            }
        }
        return sortedLog;
    };

    displayRecords = (attendance, timePeriod) => {
        var sortedLog = this.sortAttendanceLog(attendance, timePeriod);
        if (!sortedLog.length){
            return (
                <tr>
                    <td>No records during the selected period!</td>
                </tr>
            );
        }
        return sortedLog.map((value, index) => (
            <tr key={index}>
                <td>{value.reservation.tutor.fName} {value.reservation.tutor.lName}</td>
                <td>{value.reservation.tutee.name} {value.reservation.tutee.familyName}</td>
                <td>{value.reservation.course}</td>
                <td>{value.dateOfSession} at {value.reservation.from}:00</td>
                <td>{this.yesOrNo(value.attended, value.tuteeTime)}</td>
            </tr>
        ));
    }

    yesOrNo = (attended, tuteeTime) => {
        if(attended) {
            return (
                <><OverlayTrigger 
                    placement='right'
                    overlay={<Tooltip id="tooltip-disabled">Attendance confirmed at {tuteeTime}</Tooltip>}>
                    <span className="d-inline-block">
                        <Button variant="light" disabled style={{ pointerEvents: 'none' }}>
                            Yes!
                        </Button>
                    </span>
                </OverlayTrigger></>
            );
        }//'Yes!';
        else {
            return (
                <><OverlayTrigger
                    placement='right'
                    overlay={<Tooltip id="tooltip-disabled">Attendance not confirmed</Tooltip>}>
                    <span className="d-inline-block">
                        <Button variant="light" disabled style={{ pointerEvents: 'none' }}>
                            No...
                        </Button>
                    </span>
                </OverlayTrigger></>
            );
        }//return 'No..';
    }

    checkEmpty = (attendance, timePeriod) => {
        if (!timePeriod.length){
            return (
                <tr>
                    <td>Please select the time period.</td>
                </tr>
            );
        }
        return this.displayRecords(attendance, timePeriod);
    };
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
            <div>
                <Navbar bg="light" variant="light">
                    <Navbar.Brand href={`/Admin_Home/${localStorage.getItem("userID")}`}>
                        <center>Admin Home</center>
                    </Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href={`/Admin_ShowTutor/${localStorage.getItem("userID")}`}>
                            <center>Tutor List</center>
                        </Nav.Link>
                        <Nav.Link href={`/Admin_ReservationLog/${localStorage.getItem("userID")}`}>
                            <center>Reservation Log</center>
                        </Nav.Link>
                        <Nav.Link href={`/Admin_AttendanceLog/${localStorage.getItem("userID")}`}>
                            <center>Attendance Log</center>
                        </Nav.Link>
                        <Nav.Link href={`/Home/${localStorage.getItem("userID")}`}>
                            <center>Find My Tutor Home</center>
                        </Nav.Link>
                        {this.getContent()}
                    </Nav>
                </Navbar>
            </div>
            <dt></dt><dt></dt>
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        <br></br>
                        <center>ATTENDANCE LOG</center>
                    </h3>
                </div>
                <div id = "main">
                    <DateRangePicker sendData={this.getDataFromDateRangePicker}/>
                    <div id = "middle"></div>
                    <div id = "right">
                        <div>
                            <br></br>
                            <center><Table responsive>
                                <thead>
                                    <tr>
                                    <th>Tutor</th>
                                    <th>Tutee</th>
                                    <th>Course</th>
                                    <th>Session</th>
                                    <th>Did the session happen?</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.checkEmpty(this.state.attendance, this.state.timePeriod)}
                                </tbody>
                            </Table></center>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    };
};

function DateRangePicker (props) {
    const [range, setRange] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
    ]);
    
    function handleClick(e) {
        console.log('The button is clicked.');
        props.sendData(range[0]);
        
    }
    
    return (
        <div id = "left" className="panel-body">
            <center>
            <Card>
                <Card.Body>Select the date period and click the Show Record button!</Card.Body>
            </Card>
            {/* <p>Select the date period and click the Show Record button!</p> */}
            <DateRange
                editableDateInputs={true}
                onChange={item => setRange([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={range}
            />
            <div>
                <Button variant="outline-primary" onClick={handleClick}>Show Records</Button>
            </div>
            </center>
        </div>
    );
};

export default Admin_AttendanceLog;