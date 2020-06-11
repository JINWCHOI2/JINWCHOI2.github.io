import React, {Component} from 'react';
import {Link, Route, withRouter, Switch} from 'react-router-dom';
import axios from 'axios';
import '../App.css'
import {Navbar, Nav, CardDeck, Card, Carousel} from 'react-bootstrap';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedin: false,
            currentUser: {},
            isTutor: false,
            course: '',
            daysOfWeek: '',
            tuteeName: '',
            tutorName: '',
            sessionMade: false,
        };
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin() {
        axios
            .get('/signup/' + this.props.match.params.id)
            .then(response => {
                this.setState({currentUser: response.data, loggedin: true});
                console.log(this.state.currentUser.id);
                localStorage.setItem("currentUserEmail", this.state.currentUser.email);
                //alert(this.state.currentUser.email);
            })
            .catch(error => {
                console.log("check login error", error);
            });
    }

    componentDidMount() {
        this.handleLogin();
        this.checkIfTutor();
    }


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
                    alert("Signed in as Tutor");
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
                </Nav.Link>
                <Nav.Link href="/">
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
                </Nav.Link>
                <Nav.Link href="/">
                    <button className="btn btn-primary btn-sm text-uppercase js-scroll-trigger">
                        <center><h4>Log Out</h4></center>
                    </button>
                </Nav.Link>
            </>))
        }
    }

    getHeaderLogContent() {
        axios.get('/reservations')
            .then(res => {
                for (let i = 0; i < res.data.length; i++) {
                    if (this.state.isTutor === true && this.state.currentUser.email === res.data[i].tutor.email) {
                        this.setState({
                            sessionMade: true,
                            course: res.data[i].course,
                            tutorName: res.data[i].tutor.fName + " " + res.data[i].tutor.lName,
                            daysOfWeek: res.data[i].daysOfWeek,
                            tuteeName: res.data[i].tutee.name
                        });
                        return (<><h5> Your upcoming Tutoring session for {this.state.course} happens
                            on {this.state.daysOfWeek}.
                            Don't forget to check {this.state.tuteeName}'s attendance!</h5></>);
                    } else if (this.state.isTutor === true && this.state.currentUser.email === res.data[i].tutee.email) {
                        this.setState({
                            sessionMade: true,
                            course: res.data[i].course,
                            tutorName: res.data[i].tutor.fName + " " + res.data[i].tutor.lName,
                            daysOfWeek: res.data[i].daysOfWeek,
                            tuteeName: res.data[i].tutee.name
                        });
                        return (<><h5> Your upcoming Tutoring session for {this.state.course} happens
                            on {this.state.daysOfWeek}.
                            Don't forget to check {this.state.tuteeName}'s attendance!</h5></>);
                    } else if (this.state.isTutor === false && this.state.currentUser.email === res.data[i].tutee.email) {
                        this.setState({
                            sessionMade: true,
                            course: res.data[i].course,
                            tutorName: res.data[i].tutor.fName + " " + res.data[i].tutor.lName,
                            daysOfWeek: res.data[i].daysOfWeek,
                            tuteeName: res.data[i].tutee.name
                        });
                        return (<><h5> Your upcoming Tutoring session for {this.state.course} happens
                            on {this.state.daysOfWeek}.
                            Please check your attendance to {this.state.tutorName}!</h5></>);
                    }
                }
            });
        if ((this.state.isTutor === true && this.state.sessionMade === false) || (this.state.isTutor === false && this.state.sessionMade === false)) {
            return (<><h5> Please make reservation!</h5></>);
        }
    }

    getMainContent() {
        if (this.state.isTutor === true) {
            return (<>
                <Card>
                    <Card.Img variant="top" src="/attendance.png"/>
                    <Card.Body>
                        <center><Card.Title><h5>Attedance</h5></Card.Title></center>
                        <Card.Text>
                            This is the session where you can check your attendance!
                            Simply scan your QR code and take your attendance!
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <center><Link to={`/Attendance_Generate/${this.state.currentUser.id}`}><a
                            className="btn btn-outline-dark">Get Started</a></Link></center>
                    </Card.Footer>
                </Card>
            </>)
        } else {
            return;
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
                                RATE TUTOR
                            </a></h4></center>
                        </Nav.Link>
                        {this.getNavContent()}
                    </Nav>
                </Navbar></div>
                <header className="masthead">
                    {/*<div className="container">*/}
                    {/*    <div className="intro-text">*/}
                    {/*        <div className="intro-lead-in">*/}
                    {/*            Find My Tutor*/}
                    {/*        </div>*/}
                    {/*        <div className="intro-heading text-uppercase"></div>*/}
                    {/*        <Link to="/Reservation_Search"><a*/}
                    {/*            className="btn btn-primary btn-xl text-uppercase js-scroll-trigger" id="blink">About*/}
                    {/*            Us</a></Link>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <Carousel>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="/findMyTutor.jpg"
                                alt="First slide"
                            />
                            <Carousel.Caption>
                                <h3></h3>
                                <p>We offer you the best service.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="/sunyKorea.jpg"
                                alt="Third slide"
                            />

                            <Carousel.Caption>
                                <h3></h3>
                                <p></p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="help.png"
                                alt="Third slide"
                            />

                            <Carousel.Caption>
                                <h3><span style={{color: "#34495e", backgroundColor: "rgba( 218, 237, 249, 0.7 )"}}> Acheive Academic Success with Find My Tutor </span>
                                </h3>
                                <p><span style={{color: "#34495e", backgroundColor: "rgba( 218, 237, 249, 0.7 )"}}><b> We are here for you! </b></span>
                                </p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </header>
                <section className="bg-light page-section" id="portfolio">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                <h4>Hello {this.state.currentUser.name}!</h4>
                                {/*{this.getHeaderLogContent()}<br></br>*/}
                            </div>
                        </div>
                    </div>
                </section>
                <div>
                    <div className="jumbotron">
                        <br></br>
                        <br></br>
                        <CardDeck>
                            <Card>
                                <Card.Img variant="top" src="/reservation.png"/>
                                <Card.Body>
                                    <center><Card.Title><h5>Reservation</h5></Card.Title></center>
                                    <Card.Text>
                                        This is the session where you can reserve your tutoring service!
                                        You can check your tutor time and date to select your available tutor!
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <center><Link to={`/Reservation_Search/${this.state.currentUser.id}`}><a
                                        className="btn btn-outline-dark">Get Started</a></Link></center>
                                </Card.Footer>
                            </Card>
                            {this.getMainContent()}
                            <Card>
                                <Card.Img variant="top" src="/reminder.png"/>
                                <Card.Body>
                                    <center><Card.Title><h5>Meeting Reminder</h5></Card.Title></center>
                                    <Card.Text>
                                        This is the session where you can set your meeting reminder!
                                        Simply customize your alarm and get your reminder!
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <center><Link to={`/MeetingReminder/${this.state.currentUser.id}`}><a
                                        className="btn btn-outline-dark">Get Started</a></Link></center>
                                </Card.Footer>
                            </Card>
                            <Card>
                                <Card.Img variant="top" src="/rating.png"/>
                                <Card.Body>
                                    <center><Card.Title><h5>Rate Tutors</h5></Card.Title></center>
                                    <Card.Text>
                                        This is the session where you can rate your tutors!
                                        You can star your tutor and get to know who they are!
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <center><Link to={`/Rate_ViewTutor/${this.state.currentUser.id}`}><a
                                        className="btn btn-outline-dark">Get Started</a></Link></center>
                                </Card.Footer>
                            </Card>
                        </CardDeck>
                    </div>
                </div>
                {/* footer */}
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
        );
    }
}


export default Home;
