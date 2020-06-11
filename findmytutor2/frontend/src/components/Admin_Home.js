/////////////////////////////////////////////////////////////////////////////
//Contains a links/buttons to link to the Admin features
/////////////////////////////////////////////////////////////////////////////

import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {Navbar, Nav, Button, Jumbotron, Card, CardDeck} from 'react-bootstrap';

class Admin_Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentUser: {},
        }
    }

    componentDidMount = () => {
        this.handleLogin();
    };

    handleLogin() {
        axios
            .get('/signup/' + this.props.match.params.id)
            .then(response => {
                this.setState({currentUser: response.data, loggedin: true});
                console.log(this.state.currentUser);
                localStorage.setItem("userID", response.data.id);
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
                        <Nav.Link href={`/Home/${this.state.currentUser.id}`}><center>Find My Tutor Home</center></Nav.Link>
                        {this.getContent()}
                    </Nav>
                </Navbar></div>
                <div className="panel panel-default">
                    <div className="panel-body">
                        <body className="is-preload">
                        <div id="page-wrapper">
                            <center><div className="inner"><br></br><br></br>
                                <header>
                                    <h1>Admin Dashboard</h1>
                                </header>
                            </div></center>
                            {/*<center><div id="wrapper">*/}
                            {/*    <section id="one" className="main">*/}
                            {/*        <div className="inner spotlight style1">*/}
                            {/*            <div className="content">*/}
                            {/*                <header>*/}
                            {/*                    <center><h2>Tutor List</h2></center>*/}
                            {/*                </header>*/}
                            {/*                <ul className="actions special">*/}
                            {/*                    <center><Button className="btn btn-outline-dark" href={`/Admin_ShowTutor/${this.state.currentUser.id}`}>View Tutor List</Button></center>*/}
                            {/*                </ul>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    </section>*/}
                            {/*    <section id="one" className="main">*/}
                            {/*        <div className="inner spotlight style1">*/}
                            {/*            <div className="content">*/}
                            {/*                <header>*/}
                            {/*                    <h2>Reservation Log</h2>*/}
                            {/*                </header>*/}
                            {/*                <ul className="actions special">*/}
                            {/*                    <center><Button className="btn btn-outline-dark" href={`/Admin_ReservationLog/${this.state.currentUser.id}`}>View Tutor List</Button></center>*/}
                            {/*                </ul>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    </section>*/}
                            {/*    <section id="one" className="main">*/}
                            {/*        <div className="inner spotlight style1">*/}
                            {/*            <div className="content">*/}
                            {/*                <header>*/}
                            {/*                    <h2>Attendance Log</h2>*/}
                            {/*                </header>*/}
                            {/*                <ul className="actions special">*/}
                            {/*                    <center><Button className="btn btn-outline-dark" href={`/Admin_AttendanceLog/${this.state.currentUser.id}`}>View Tutor List</Button></center>*/}
                            {/*                </ul>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    </section>*/}
                            {/*</div></center>*/}
                            <div className="jumbotron">
                                <br></br>
                                <br></br>
                                <CardDeck>
                                    <Card>
                                        <Card.Img variant="top" src="/rating.png"/>
                                        <Card.Body>
                                            <center><Card.Title><h2>Tutor List</h2></Card.Title></center>
                                            <Card.Text>
                                                This is the session where you can reserve your tutoring service!
                                                You can check your tutor time and date to select your available tutor!
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Footer>
                                            <center><Link to={`/Admin_ShowTutor/${this.state.currentUser.id}`}><a
                                                className="btn btn-outline-dark">Get Started</a></Link></center>
                                        </Card.Footer>
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="/reservation.png"/>
                                        <Card.Body>
                                            <center><Card.Title><h2>Reservation Log</h2></Card.Title></center>
                                            <Card.Text>
                                                This is the session where you can set your meeting reminder!
                                                Simply customize your alarm and get your reminder!
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Footer>
                                            <center><Link to={`/Admin_ReservationLog/${this.state.currentUser.id}`}><a
                                                className="btn btn-outline-dark">Get Started</a></Link></center>
                                        </Card.Footer>
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="/reminder.png"/>
                                        <Card.Body>
                                            <center><Card.Title><h2>Attendance Log</h2></Card.Title></center>
                                            <Card.Text>
                                                This is the session where you can rate your tutors!
                                                You can star your tutor and get to know who they are!
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Footer>
                                            <center><Link to={`/Admin_AttendanceLog/${this.state.currentUser.id}`}><a
                                                className="btn btn-outline-dark">Get Started</a></Link></center>
                                        </Card.Footer>
                                    </Card>
                                </CardDeck>
                            </div>
                            <footer className="footer">
                                <div className="container">
                                    <div className="row align-items-center">
                                        <div className="col-md-4">
                                            <span className="copyright">Copyright &copy; Your Website 2020</span>
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
                        <script src="assets/js/jquery.min.js"></script>
                        <script src="assets/js/jquery.scrolly.min.js"></script>
                        <script src="assets/js/jquery.scrollex.min.js"></script>
                        <script src="assets/js/browser.min.js"></script>
                        <script src="assets/js/breakpoints.min.js"></script>
                        <script src="assets/js/util.js"></script>
                        <script src="assets/js/main.js"></script>
                        </body>
                    </div>
                </div>
            </div>
        );
    }
}
export default Admin_Home;
