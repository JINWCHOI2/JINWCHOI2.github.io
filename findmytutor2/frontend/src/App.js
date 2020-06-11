import React, {Component} from 'react';
import {Link, Route, withRouter, Switch} from 'react-router-dom';
import axios from 'axios';
import {useHistory} from "react-router-dom";
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import GoogleLogin from "react-google-login";
import {GoogleLogout} from "react-google-login";
import './App.css'
import './agency.min.css'
import {Navbar, Nav, CardDeck, Card, Carousel} from 'react-bootstrap';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedin: false,
            loading: false,
            currentUser: null,
        };
    }


    render() {
        return (
            <div className="container">
                <div><Navbar bg="light" variant="light">
                    <Navbar.Brand href={`/`}>
                        <center><h4><a
                            className="btn btn-primary btn-md text-uppercase js-scroll-trigger"><b>FindMyTutor</b></a>
                        </h4></center>
                    </Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/SignIn">
                            <center><h4><a className="btn btn-primary btn-md text-uppercase js-scroll-trigger">MAKE A
                                NEW RESERVATION</a></h4></center>
                        </Nav.Link>
                        <Nav.Link href="/SignIn">
                            <center><h4><a className="btn btn-primary btn-md text-uppercase js-scroll-trigger">CHECK
                                ATTENDANCE</a></h4></center>
                        </Nav.Link>
                        <Nav.Link href="/SignIn">
                            <center><h4><a className="btn btn-primary btn-md text-uppercase js-scroll-trigger">SEND A
                                REMINDER</a></h4></center>
                        </Nav.Link>
                        <Nav.Link href="/SignIn">
                            <center><h4><a className="btn btn-primary btn-md text-uppercase js-scroll-trigger">RATE
                                TUTOR</a></h4></center>
                        </Nav.Link>
                        <Nav.Link href="/SignIn">
                            <center><h4><a className="btn btn-primary btn-md text-uppercase js-scroll-trigger">Sign
                                In</a></h4></center>
                        </Nav.Link>
                    </Nav>
                </Navbar></div>
                <header className="masthead">
                <div className="container">
                    <div className="intro-text">
                        <div className="intro-lead-in">Find My Tutor</div><br></br>
                        <div className="intro-heading text-uppercase"></div>
                        <Link to="/Reservation_Search"><a
                            className="btn btn-primary btn-xl text-uppercase js-scroll-trigger" id="blink">Get Started</a></Link>
                    </div>
                </div>
            </header>
                <section className="bg-light page-section" id="portfolio">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                <h3>Find my Tutor is a tutoring arrangement system for SUNY Korea</h3> <br></br>
                            </div>
                        </div>
                    </div>
                </section>
                {/*<Carousel>*/}
                {/*    <Carousel.Item>*/}
                {/*        <img*/}
                {/*            className="d-block w-100"*/}
                {/*            src="/headerBackground.jpg"*/}
                {/*            alt="First slide"*/}
                {/*        />*/}
                {/*        <Carousel.Caption>*/}
                {/*            <h3>First slide label</h3>*/}
                {/*            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>*/}
                {/*        </Carousel.Caption>*/}
                {/*    </Carousel.Item>*/}
                {/*    <Carousel.Item>*/}
                {/*        <img*/}
                {/*            className="d-block w-100"*/}
                {/*            src="/hello3.png"*/}
                {/*            alt="Third slide"*/}
                {/*        />*/}

                {/*        <Carousel.Caption>*/}
                {/*            <h3>Second slide label</h3>*/}
                {/*            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>*/}
                {/*        </Carousel.Caption>*/}
                {/*    </Carousel.Item>*/}
                {/*    <Carousel.Item>*/}
                {/*        <img*/}
                {/*            className="d-block w-100"*/}
                {/*            src="holder.js"*/}
                {/*            alt="Third slide"*/}
                {/*        />*/}

                {/*        <Carousel.Caption>*/}
                {/*            <h3>Third slide label</h3>*/}
                {/*            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>*/}
                {/*        </Carousel.Caption>*/}
                {/*    </Carousel.Item>*/}
                {/*</Carousel>*/}
                <div className="panel panel-default">
                    <div className="panel-body">
                        <body className="is-preload">
                        <div id="page-wrapper">
                            <img class="img-responsive" src="/help.png" id="pic" alt=""></img>
                            <img class="img-responsive" src="/hello3.png" id="pic2" alt=""></img>
                        </div>
                        </body>
                    </div>
                </div>
                <div>
                    <div className="jumbotron">
                        <center>
                            <h3>What you can do with FindMyTutor</h3>
                        </center>
                        <br></br>
                        <br></br>
                        <h5>
                            <center>
                                This website is designed to help students who want to achieve their academic success
                                during the semester.<br></br>
                                We would love to help you out with reserving, checking attendance, reminding and rating,
                                all in one!
                            </center>
                        </h5>
                        <br></br><br></br><br></br>
                        <CardDeck>
                            <Card>
                                <Card.Img variant="top" src="/reservation.png"/>
                                <Card.Body>
                                    <Card.Title>Reservation</Card.Title>
                                    <Card.Text>
                                        This is the session where you can reserve your tutoring service!
                                        You can check your tutor time and date to select your available tutor!
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <small className="text-muted"></small>
                                </Card.Footer>
                            </Card>
                            <Card>
                                <Card.Img variant="top" src="/attendance.png"/>
                                <Card.Body>
                                    <Card.Title>Attendance</Card.Title>
                                    <Card.Text>
                                        This is the session where you can check your attendance!
                                        Simply scan your QR code and take your attendance!
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <small className="text-muted"></small>
                                </Card.Footer>
                            </Card>
                            <Card>
                                <Card.Img variant="top" src="/reminder.png"/>
                                <Card.Body>
                                    <Card.Title>Meeting Reminder</Card.Title>
                                    <Card.Text>
                                        This is the session where you can set your meeting reminder!
                                        Simply customize your alarm and get your reminder!
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <small className="text-muted"></small>
                                </Card.Footer>
                            </Card>
                            <Card>
                                <Card.Img variant="top" src="/rating.png"/>
                                <Card.Body>
                                    <Card.Title>Rate Tutors</Card.Title>
                                    <Card.Text>
                                        This is the session where you can rate your tutors!
                                        You can star your tutor and get to know who they are!
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <small className="text-muted"></small>
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


export default App;
