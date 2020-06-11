/////////////////////////////////////////////////////////////////////////////
//Contains a list of the tutoring session schedule and the reservation history.
/////////////////////////////////////////////////////////////////////////////

import React, { Component } from 'react';
import axios from 'axios';
import { Navbar, Nav } from 'react-bootstrap';
import '../App.css';

class About_Us extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: {},
            txtSubject: "",
            txtMsg: "",
        }
    }

    componentDidMount = () => {
        this.handleLogin();
        this.checkIfTutor();
    };

    handleLogin() {
        axios.get('/signup/' + this.props.match.params.id)
            .then(response => {
                this.setState({ currentUser: response.data, loggedin: true });
                console.log(this.state.currentUser);
            })
            .catch(error => {
                console.log("check login error", error);
            });
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    // nodemailer onclick
    sendEmail = (e) => {
        e.preventDefault();
        console.log('test')
        let emailParam = {
            subject: this.state.txtSubject,
            html: `<div>
                <h4>Message from ${this.state.currentUser.name} </h4>
                <p>Email: ${this.state.currentUser.email} </p>
                <p> Message: ${this.state.txtMsg} </p>
            </div>`
        };

        axios.post('/email/contactUs', emailParam)
            .then(response => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error);
            })
        alert("Thank you for reaching us! We will contact you in few days.");
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
        const txtStyle = {
            width: "100%",
            height: "150px"
        };
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
                </Navbar></div>
                <div>
                    {/* here */}
                    <div className="container contact-form">
                        {/* <div className="contact-image">
                            <img src="https://image.ibb.co/kUagtU/rocket_contact.png" alt="rocket_contact"/>
                        </div> */}
                        <form method="post" onSubmit={this.sendEmail}>
                            <h3>Drop Us a Message</h3>
                            <center>
                                <p>Any questions, suggestions, problems using our website?</p>
                                <p>Feel free to contact us!</p>
                                <dt></dt>
                            </center>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <p className="form-control">Your Name: {this.state.currentUser.name}</p>
                                    </div>
                                    <div className="form-group">
                                        <p className="form-control">{this.state.currentUser.email}</p>
                                    </div>
                                    <div className="form-group">
                                        <input required onChange={this.onChange} type="text" name="txtSubject" className="form-control" placeholder="Message Subject *" value={this.state.txtSubject} />
                                    </div>
                                    <div className="form-group">
                                        <input href={`/Home/${this.state.currentUser.id}`} type="submit" name="btnSubmit" className="btnContact" value="Send Message" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <textarea required onChange={this.onChange} name="txtMsg" className="form-control" style={txtStyle} placeholder="Your Message *" value={this.state.txtMsg} ></textarea>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <footer className="footer">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-md-4">
                                <span className="copyright">Copyright &copy; Find My Tutor 2020</span>
                            </div>
                            <div className="col-md-4">
                                <ul className="list-inline social-buttons">
                                    <li className="list-inline-item">
                                        <a href="#something">
                                            <i className="fa fa-twitter"></i>
                                        </a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href="#something">
                                            <i className="fa fa-facebook-f"></i>
                                        </a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href="#something">
                                            <i className="fa fa-linkedin-in"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-4">
                                <ul className="list-inline quicklinks">
                                    <li className="list-inline-item">
                                        <a href="#something">Privacy Policy</a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href="#something">Terms of Use</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </footer>

            </div>
        )
    }
}

export default About_Us;