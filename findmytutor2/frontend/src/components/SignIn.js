/////////////////////////////////////////////////////////////////////////////
//Contains a form that enables users to fill in the username and the password. This links to Signup.js if the user has not signed up yet.
/////////////////////////////////////////////////////////////////////////////

import React, {Component, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import '../bootstrap.min.css'
import {withRouter} from "react-router-dom";
import {useHistory} from "react-router-dom";
import GoogleLogin from "react-google-login";
import {Nav, Navbar, Jumbotron} from "react-bootstrap";

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pid: "",
            email: "",
            password: "",
            errors: "",
            setErrors: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        // get all the users data from the db
        axios.get('/users')
            .then(res => {
                this.setState({users: res.data});
                console.log(this.state.users);
            });
        alert("Sign In First")
    }

    handleChange(e) {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    handleSubmit(event) {
        event.preventDefault();
        const {email, password} = this.state;
        axios.get('/users')
            .then(res => {
                var result = JSON.stringify(res);
                var emailString = JSON.stringify(email);
                var passwordString = JSON.stringify(password);
                console.log(result);
                if (result.length > 0 && result.includes(email) && result.includes(password)) {
                    console.log("Login successed");
                    this.props.history.push('/');
                } else {
                    console.log("Wrong!");
                    this.props.history.push('/SignIn');
                    alert('You put wrong information! Please try again.');
                }
            })
            .catch(err => {
                console.error(err);
                alert('Error logging in please try again');
            });
    }

    handleGoogleResponse(res) {
        console.log(res.profileObj);
        const userData = {
            id: res.profileObj.googleId,
            name: res.profileObj.name,
            email: res.profileObj.email,
            token: `Bearer ${res.tokenId}`
        };
        axios.post('/signup', userData)
            .then(response => {
                console.log(response);
                console.log(response.data);
                localStorage.setItem('loggedin', true);
                if (response.data.id == 101350824810139811868) {
                    this.props.history.push(`/Admin_Home/${response.data.id}`)
                } else {
                    this.props.history.push(`/Home/${response.data.id}`)
                }
                ;
                window.location.reload(false);
                localStorage.setItem("username", response.data.name);
                localStorage.setItem("email", response.data.email);
                localStorage.setItem("id", response.data.id);
            })
    }

    getContent() {
        return (<><Nav.Link href="/SignIn">
            <center><h4><a className="btn btn-primary btn-md text-uppercase js-scroll-trigger">Sign In</a></h4></center>
        </Nav.Link>
        </>)
    }

    render() {
        const googleResponse = (response) => {
            console.log(response);
            var res = response.profileObj;
            console.log(res);
            debugger;
            this.handleGoogleResponse(response);
        };
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
                        {this.getContent()}
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
                                <h1>SIGN IN WITH GOOGLE ACCOUNT</h1>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="panel-default">
                    <div className="panel-body">
                        <div id="page-wrapper">
                            <center>
                                <body>
                                <center>
                                    {/*<form onSubmit={this.handleSubmit}>*/}
                                    {/*    <label htmlFor="email">Email: </label><input*/}
                                    {/*    type="email"*/}
                                    {/*    name="email"*/}
                                    {/*    placeholder="Email"*/}
                                    {/*    value={this.state.email}*/}
                                    {/*    onChange={this.handleChange}*/}
                                    {/*    required*/}
                                    {/*/><br></br><br></br>*/}
                                    {/*    <label htmlFor="password">Password: </label><input*/}
                                    {/*    type="password"*/}
                                    {/*    name="password"*/}
                                    {/*    placeholder="Password"*/}
                                    {/*    // value={this.state.password}*/}
                                    {/*    value={this.state.handleChange}*/}
                                    {/*    onChange={this.handleChange}*/}
                                    {/*    required*/}
                                    {/*/><br></br><br></br>*/}
                                    {/*    <button type="submit" className="btn btn-outline-success">Login*/}
                                    {/*    </button>*/}
                                    {/*</form>*/}
                                </center>
                                <br></br>
                                <Jumbotron>
                                    <center>
                                        <div id = "imgdiv"></div>
                                    </center>
                                    <br></br>
                                    <br></br>
                                        <div className="card align-items-center cad-n">
                                        <form>
                                            <center><h4>Sign In Here!</h4></center>
                                            <center><GoogleLogin
                                                clientId="1000210708528-afho0dc7tbqir529u34j0r1a16rfhhfu.apps.googleusercontent.com"
                                                buttonText="Sign In with Google"
                                                scope='profile email'
                                                width='240'
                                                height='50'
                                                longtitle='true'
                                                theme='dark'
                                                onSuccess={googleResponse}
                                                onFailure={googleResponse}
                                                cookiePolicy={"single_host_origin"}
                                            /></center>
                                        </form>
                                    </div>
                                </Jumbotron>
                                <br></br>
                                </body>
                            </center>
                        </div>
                    </div>
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
        );
    }
}

export default SignIn;