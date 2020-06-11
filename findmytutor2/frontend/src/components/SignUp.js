/////////////////////////////////////////////////////////////////////////////
//Contains a form that enables users to fill in their information. This links to Login.js if the user has already signed up
/////////////////////////////////////////////////////////////////////////////

import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import axios from 'axios';
import GoogleLogin from 'react-google-login';
import '../App.css'


import {Link} from 'react-router-dom';
import {Nav, Navbar} from "react-bootstrap";


class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            name: '',
            familyName: '',
            email: '',
            password: '',
            errors: '',
            setErrors: '',
        };
    }


    componentDidMount() {
        axios.get('/users')
            .then(({data}) => this.setState({users: data}))
            .catch(e => console.log(e))

    }
    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {userName, name, familyName, email, password} = this.state;
        axios.post('/users', {userName, name, familyName, email, password})
            .then((result) => {
                this.props.history.push("/")
            });
    }

    handleGoogleResponse(res) {
        console.log('----waiting for signup response-----');
        console.log(res.profileObj);
        const userData = {
            name: res.profileObj.name,
            familyName: res.profileObj.familyName,
            email: res.profileObj.email,
            token: res.googleId
        };
        const tokenId = `Bearer ${res.tokenId}`;
        console.log('----Printing tokenId-----');
        console.log(tokenId);
        localStorage.setItem('tokenId', tokenId);
        axios.post('/signup', userData)
            .then(response => {
                console.log('======response======');
                console.log(response);
                console.log('======response.data======');
                console.log(response.data);
                localStorage.setItem('loggedin', true);
                console.log('======response.data======');
                console.log('loggedin');
                localStorage.setItem('userCredentials', response.data);
                this.props.history.push('/');
                window.location.reload(false);
            })
            .catch((err) => {
                this.setState({setErrors:err.response.data});
                console.log(this.state.errors);
                console.log(this.state.setErrors);
            });
    }

    render() {
        const googleResponse = (response) => {
            console.log(response);
            var res = response.profileObj;
            console.log(res);
            debugger;
            this.handleGoogleResponse(response);
        };
        const {userName, name, familyName, email, password} = this.state;
        return (
            <div className="container">
                <div><Navbar bg="light" variant="light">
                    <Navbar.Brand href="/">
                        <center>FindMyTutor</center>
                    </Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/Reservation_Search">
                            <center>Make a new reservation</center>
                        </Nav.Link>
                        <Nav.Link href="/Attendance_Generate">
                            <center>Check Attendance</center>
                        </Nav.Link>
                        <Nav.Link href="/MeetingReminder">
                            <center>Send a reminder</center>
                        </Nav.Link>
                        <Nav.Link href="/Rate_ViewTutor">
                            <center>Rate your tutor</center>
                        </Nav.Link>
                        <Nav.Link href="/SignUp">
                            <center>Create Account</center>
                        </Nav.Link>
                        <Nav.Link href="/SignIn">
                            <center>Sign In</center>
                        </Nav.Link>
                    </Nav>
                </Navbar></div>
                <div className="panel-default">
                    <div className="panel-body">
                        <div id="page-wrapper">
                            <center>
                                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                                    <section id="one" className="main">
                                        <div className="inner spotlight style1">
                                            <div className="card-body">
                                                <header>
                                                    <h1>Registration Form</h1>
                                                </header>
                                            </div>
                                            <body>
                                            <form onSubmit={this.onSubmit}>
                                                <div>
                                                    <div className="col-lg-12 text-center">
                                                        <h1>CREATE ACCOUNT</h1><br></br>
                                                    </div>
                                                </div>
                                                <div style={{display: this.state.alert ? "block" : "none"}}>
                                                    <span onClick={this.alertOffHandler}>&times;</span>
                                                    {this.state.alertMessage}
                                                </div>
                                                {/* userName */}
                                                <div className="col-lg-12 text-center">
                                                    <div>
                                                        <div>
                                                            <label htmlFor="userName">User Name: </label>
                                                            <input value={userName} type="text" name="userName"
                                                                   placeholder="Enter your username"
                                                                   onChange={this.onChange} autoFocus required/>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* firstName */}
                                                <div className="col-lg-12 text-center">
                                                    <div>
                                                        <div>
                                                            <label htmlFor="firstName">First Name: </label>
                                                            <input value={name} type="text" name="name"
                                                                   placeholder="Enter your first name"
                                                                   onChange={this.onChange} autoFocus required/>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* lastName */}
                                                <div className="col-lg-12 text-center">
                                                    <div>
                                                        <div>
                                                            <label htmlFor="lastName">Last Name: </label>
                                                            <input value={familyName} type="text" name="familyName"
                                                                   placeholder="Enter your last name"
                                                                   onChange={this.onChange} autoFocus required/>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Email */}
                                                <div className="col-lg-12 text-center">
                                                    <div>
                                                        <label htmlFor="email">Email: </label>
                                                        <input value={email} type="email" name="email"
                                                               placeholder="Firstname.Lastname@stonybrook.edu"
                                                               onChange={this.onChange}
                                                               required/>

                                                    </div>
                                                </div>
                                                {/* Password */}
                                                <div className="col-lg-12 text-center">
                                                    <div>
                                                        <div>
                                                            <label htmlFor="password">Password: </label>
                                                            <input value={password} type="password" name="password"
                                                                   pattern=".{6,}" title="Six or more characters"
                                                                   placeholder="Enter password" onChange={this.onChange}
                                                                   required/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br></br>
                                                <center>
                                                    <button type="submit" className="btn btn-outline-success">Register
                                                    </button>
                                                </center>
                                                <br></br>
                                            </form>
                                            <div className="card align-items-center cad-n">
                                                <form>
                                                    <center><p>Sign up with your social media account </p></center>
                                                    <center><GoogleLogin
                                                        clientId="1000210708528-afho0dc7tbqir529u34j0r1a16rfhhfu.apps.googleusercontent.com"
                                                        buttonText="Sign up with Google"
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
                                            </div><br></br>
                                            <center><p>Already have Account?</p></center>
                                            <center><h4><Link to="/SignIn"><span
                                                className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>Sign
                                                In Here!</Link></h4></center>
                                            </body>
                                        </div>
                                    </section>
                                </div>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(SignUp);
