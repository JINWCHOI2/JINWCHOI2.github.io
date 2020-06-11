/////////////////////////////////////////////////////////////////////////////
//Contains a list of specific tutor. This links to the Admin_EditTutor.js when the admin clicks on the “edit” button. Admin can delete the tutor data by clicking on the “delete” button.
/////////////////////////////////////////////////////////////////////////////

import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {Button, Nav, Navbar, Jumbotron} from "react-bootstrap";
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'
import $ from "jquery";
import Footer from '../components/common/Footer';

class Rate_DetailTutor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tutor: {},
            currentUser:{},
        };
    }

    // Get the particular tutor's data by id from the DB
    componentDidMount() {
        this.handleLogin();
        axios.get('/tutors/'+this.props.match.params.id)
            .then(res => {
                this.setState({ tutor: res.data });

                console.log(this.state.tutor);
            });
        this.checkIfTutor()
    }

    handleLogin() {
        axios
            .get('/signup/' + localStorage.getItem("userID"))
            .then(response => {
                this.setState({currentUser: response.data, loggedin: true});
                console.log(this.state.currentUser);
                localStorage.setItem("userID", this.state.currentUser.id);
            })
            .catch(error => {
                console.log("check login error", error);
            });
    }

    // Delete the particular tutor's data from the DB
    delete(id){
        console.log(id);
        axios.delete('/tutors/'+id)
            .then((result) => {
                this.props.history.push("/Rate_ViewTutor")
            });
    }

    //convert grade to letter grade
    gradeToLetter(grade){
        if(grade>=3.5){
            return "A";
        }
        else if(grade>=3){
            return "B"
        }
        else if(grade>=2){
            return "c"
        }
        else if(grade>=1){
            return "D"
        }
        else if(grade>=0.1){
            return "F"
        }
        else{
            return "N/A"
        }
    }

    onClick = () => {
        axios
            .get('/reservations')
            .then(response => {
                console.log(localStorage.getItem("userID"));
                for (let i = 0; i < response.data.length; i++){
                    if(localStorage.getItem("userID") == response.data[i].tutee.id){
                        console.log("found");
                        console.log(localStorage.getItem("userID"));
                        console.log(response.data[i].tutee.id);
                        if(this.state.tutor.id ==response.data[i].tutor.id){
                            if(!response.data[i].rated){
                                // window.location.href = `/Rate_RateTutor/${this.state.tutor.id}`;
                                localStorage.setItem("tutorID", this.state.tutor.id);
                                console.log("tutorID");
                                this.props.history.push(`/Rate_RateTutor/${localStorage.getItem("userID")}/${localStorage.getItem("tutorID")}`);
                            }
                            else{
                                alert("you already rated this tutor")
                            }
                        }
                        else{
                            console.log("you cannot rate this tutor");
                            //alert("you cannot rate this tutor")
                        }
                    }else{
                        //alert("you cannot rate this tutor");
                    }
                    console.log("not found")
                }
            })
        localStorage.setItem("tutorToSend", this.state.tutor.id);
    };
  //  Return the ViewProfile, View Schedule & History only if the user is logged in
  //   getContent() {
  //       return (<><Nav.Link href={`/ViewProfile/${localStorage.getItem("userID")}`}>
  //           <center>Profile</center>
  //       </Nav.Link><Nav.Link href={`/ViewScheduleHistory/${localStorage.getItem("userID")}`}>
  //           <center>Schedule and History</center>
  //       </Nav.Link><Nav.Link href="/">
  //           <button className="btn btn-outline-secondary">
  //               <center>Log Out</center>
  //           </button>
  //       </Nav.Link>
  //       </>)
  //   }

    checkIfTutor() {
        axios.get('/tutors')
            .then(res => {
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
    getNavContent() {
        if (this.state.isTutor == true) {
            return (<><Nav.Link href={`/Attendance_Generate/${localStorage.getItem("userID")}`}>
                <center><h4><a className="btn btn-primary btn-md text-uppercase js-scroll-trigger">CHECK ATTENDANCE</a>
                </h4></center>
            </Nav.Link>
                <Nav.Link href={`/ViewProfile/${localStorage.getItem("userID")}`}>
                    <center><h4><a className="btn btn-primary btn-md text-uppercase js-scroll-trigger">VIEW PROFILE</a>
                    </h4></center>
                </Nav.Link><Nav.Link href={`/ViewScheduleHistory/${localStorage.getItem("userID")}`}>
                    <center><h4><a className="btn btn-primary btn-md text-uppercase js-scroll-trigger">SCEHDULE,
                        HISTORY</a></h4></center>
                </Nav.Link><Nav.Link href="/">
                    <button className="btn btn-primary btn-sm text-uppercase js-scroll-trigger">
                        <center><h4>Log Out</h4></center>
                    </button>
                </Nav.Link>
            </>)
        } else {
            return ((<>
                <Nav.Link href={`/ViewProfile/${localStorage.getItem("userID")}`}>
                    <center><h4><a className="btn btn-primary btn-md text-uppercase js-scroll-trigger">VIEW PROFILE</a>
                    </h4></center>
                </Nav.Link><Nav.Link href={`/ViewScheduleHistory/${localStorage.getItem("userID")}`}>
                <center><h4><a className="btn btn-primary btn-md text-uppercase js-scroll-trigger">SCEHDULE, HISTORY</a>
                </h4></center>
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
                        <Nav.Link href={`/About_Us/${this.state.currentUser.id}`}>
                            <center><h4><a className="btn btn-primary btn-md text-uppercase js-scroll-trigger">
                                CONTACT US
                            </a></h4></center>
                        </Nav.Link>
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
                                <h1>TUTOR DETAIL</h1>
                            </div>
                        </div>
                    </div>
                </section>
                <br></br>
                <br></br>
                <div className="panel panel-default">
                    <Jumbotron><div className="panel-heading">
                        <h2 className="panel-title">
                            <br></br>
                            <center>TUTOR INFO</center>
                        </h2>
                            <br></br>
                            <br></br>
                        <h3 className="panel-title">
                            <center>{this.state.tutor.fName+" "+this.state.tutor.lName}</center>
                        </h3>
                            <br></br>
                    </div>
                    <div className="panel-body">
                        {/*Table for the tutor's detail*/}
                        <table className="table table-stripe">
                            <thead>
                            <tr>
                                <th><center>Course Name</center></th>
                                <th><center>{this.state.tutor.courseName}</center></th>
                            </tr>
                            <tr>
                                <th><center>Helpfulness</center></th>
                                <th><center><Rater rating={this.state.tutor.sumOfHlepfulness/this.state.tutor.divideFactor} total={5} interactive={false} /></center></th>
                            </tr>
                            <tr>
                                <th><center>Punctuality</center></th>
                                <th><center><Rater rating={this.state.tutor.sumOfPuncuality/this.state.tutor.divideFactor} total={5} interactive={false} /></center></th>
                            </tr>
                            <tr>
                                <th><center>Preparation</center></th>
                                <th><center><Rater rating={this.state.tutor.sumOfPreparation/this.state.tutor.divideFactor} total={5} interactive={false} /></center></th>
                            </tr>
                            <tr>
                                <th><center>Average Grade</center></th>
                                <th><center>{this.gradeToLetter(this.state.tutor.sumOfGrade/this.state.tutor.divideFactor)}</center></th>
                            </tr>
                            </thead>
                        </table>
                        <center>
                            <Button className="btn btn-outline-secondary" type="submit" onClick={this.onClick}>Rate this Tutor</Button>
                        </center>
                        <br></br>
                        <br></br>
                    </div></Jumbotron>
                </div>
                <Footer/>
            </div>

        );
    }
}

export default Rate_DetailTutor;
