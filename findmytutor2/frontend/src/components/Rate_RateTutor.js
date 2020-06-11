/////////////////////////////////////////////////////////////////////////////
//Contains a form that allow users to rate the information of the tutors. This links to the Rate_ViewTutor.js
/////////////////////////////////////////////////////////////////////////////

import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Nav, Navbar } from "react-bootstrap";
import 'react-rater/lib/react-rater.css'
import StarRatingComponent from 'react-star-rating-component';
import Footer from '../components/common/Footer';

class Rate_RateTutor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tutor: {},
            previousSumOfHlepfulness: '',
            previousSumOfPuncuality: '',
            previousSumOfPreparation: '',
            previousSumOfGrade: '',
            previousDivideFactor: '',
            hlepfulness: 0,
            puncuality: 0,
            preparation: 0,
            currentUser: {},
            appropriate_reservation: {},
        };
    }

    // Get the particular tutor's data by id from the DB
    componentDidMount() {
        this.handleLogin();
        axios.get('/tutors/' + localStorage.getItem("tutorID"))
            .then(res => {
                this.setState({ tutor: res.data });
                this.setState({ previousSumOfHlepfulness: res.data.sumOfHlepfulness });
                this.setState({ previousSumOfPuncuality: res.data.sumOfPuncuality });
                this.setState({ previousSumOfPreparation: res.data.sumOfPreparation });
                this.setState({ previousSumOfGrade: res.data.sumOfGrade });
                this.setState({ previousDivideFactor: res.data.divideFactor });
                console.log(this.state.tutor);
            });
        axios.get('/reservations')
            .then(res => {
                for (let i = 0; i < res.data.length; i++) {
                    console.log(res.data[i]);
                    console.log(res.data[i].tutor);
                    console.log(this.state.tutor.id);
                    if (res.data[i].tutor.fName == this.state.tutor.fName) {
                        console.log('----reservation found!---');
                        // appropriate.push(res.data[i]);
                        this.setState({ appropriate_reservation: res.data[i] });
                    }
                }
                // console.log(appropriate);
                // this.setState({appropriate_tutor: appropriate});
                console.log(this.state.appropriate_reservation.course);
            });
    }

    handleLogin() {
        axios
            .get('/signup/' + localStorage.getItem("userID"))
            .then(response => {
                this.setState({ currentUser: response.data, loggedin: true });
                console.log(this.state.currentUser);
            })
            .catch(error => {
                console.log("check login error", error);
            });
    }
    onChange = (e) => {
        const state = this.state.tutor;
        state[e.target.name] = e.target.value;
        this.setState({ tutor: state });
    }

    onHlepfulnessClick(nextValue, prevValue, name) {
        this.setState({ hlepfulness: nextValue });
    }
    onPuncualityClick(nextValue, prevValue, name) {
        this.setState({ puncuality: nextValue });
    }
    onPreparationClick(nextValue, prevValue, name) {
        this.setState({ preparation: nextValue });
    }



    // The tutor data will be updated(put) when the user clicks on the submit button
    onSubmit = (e) => {
        e.preventDefault();

        this.state.tutor.sumOfHlepfulness = parseInt(this.state.hlepfulness, 10) + parseInt(this.state.previousSumOfHlepfulness, 10);
        this.state.tutor.sumOfPuncuality = parseInt(this.state.puncuality, 10) + parseInt(this.state.previousSumOfPuncuality, 10);
        this.state.tutor.sumOfPreparation = parseInt(this.state.preparation, 10) + parseInt(this.state.previousSumOfPreparation, 10);
        this.state.tutor.sumOfGrade = parseInt(this.state.tutor.sumOfGrade, 10) + parseInt(this.state.previousSumOfGrade, 10);
        this.state.tutor.divideFactor = parseInt(this.state.tutor.divideFactor, 10) + 1


        const { sumOfHlepfulness, sumOfPuncuality, sumOfPreparation, sumOfGrade, divideFactor } = this.state.tutor;

        axios.put('/tutors/' + localStorage.getItem("tutorID"), { sumOfHlepfulness, sumOfPuncuality, sumOfPreparation, sumOfGrade, divideFactor })
            .then((result) => {
                this.props.history.push(`/Rate_DetailTutor/${localStorage.getItem("userID")}/${localStorage.getItem("tutorID")}`);
            });

        axios.put(`/reservations/` + this.state.appropriate_reservation.id, { rated: true })
            .then(response => {
                console.log(response.data);
                this.setState({ appropriate_reservation: response.data });
            })
            .catch((err) => {
                console.log(err);
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
                <Nav.Link href={`/ViewProfile/${localStorage.getItem("userID")}`}>
                    <center><h4><a className="btn btn-primary btn-md text-uppercase js-scroll-trigger">VIEW PROFILE</a>
                    </h4></center>
                </Nav.Link><Nav.Link href={`/ViewScheduleHistory/${localStorage.getItem("userID")}`}>
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

    render() {
        const { hlepfulness } = this.state;
        const { puncuality } = this.state;
        const { preparation } = this.state;

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
                                <h1>RATE YOUR TUTOR</h1>
                            </div>
                        </div>
                    </div>
                </section>
                <br></br>
                <br></br>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h2 className="panel-title">
                            <br></br>
                            <center>RATE TUTOR</center>
                        </h2>
                    </div>
                    <div className="wrapper">
                        <div className="right">
                            <div className="panel-body">
                                {/*Form for the tutor data input for update*/}
                                <form onSubmit={this.onSubmit}>

                                    <center>

                                        <div className="form-group">
                                            <label htmlFor="sumOfHlepfulness">Helpfulness: </label>
                                            <input type="hidden" className="form-control" name="sumOfHlepfulness"
                                                value={hlepfulness} onChange={this.onChange}
                                                placeholder="0~1" />
                                            <br></br>
                                            <StarRatingComponent
                                                name="hlepfulness"
                                                starCount={5}
                                                value={hlepfulness}
                                                onStarClick={this.onHlepfulnessClick.bind(this)}
                                            />
                                        </div>
                                    </center>
                                    <center>
                                        <div className="form-group">
                                            <label htmlFor="sumOfPuncuality">Punctuality:</label>
                                            <input type="hidden" className="form-control" name="sumOfPuncuality"
                                                value={puncuality} onChange={this.onChange}
                                                placeholder="0~1" />
                                            <br></br>
                                            <StarRatingComponent
                                                name="puncuality"
                                                starCount={5}
                                                value={puncuality}
                                                onStarClick={this.onPuncualityClick.bind(this)}
                                            />
                                        </div>
                                    </center>
                                    <center>
                                        <div className="form-group">
                                            <label htmlFor="sumOfPreparation">Preparation: </label>
                                            <input type="hidden" className="form-control" name="sumOfPreparation"
                                                value={preparation} onChange={this.onChange}
                                                placeholder="0~1" />
                                            <br></br>
                                            <StarRatingComponent
                                                name="preparation"
                                                starCount={5}
                                                value={preparation}
                                                onStarClick={this.onPreparationClick.bind(this)}
                                            />
                                        </div>
                                    </center>
                                    <center>
                                        <div className="form-group">
                                            <label htmlFor="sumOfGrade">Grade you got: </label>
                                            <input type="hidden" className="form-control" name="sumOfGrade"
                                                value={this.state.tutor.sumOfGrade || ''} onChange={this.onChange}
                                                placeholder="A~F" />
                                            <br></br>
                                            <br></br>
                                            <input type="radio" name="sumOfGrade" value="4" onChange={this.onChange} /> A<br></br>
                                            <input type="radio" name="sumOfGrade" value="3" onChange={this.onChange} /> B<br></br>
                                            <input type="radio" name="sumOfGrade" value="2" onChange={this.onChange} /> C<br></br>
                                            <input type="radio" name="sumOfGrade" value="1" onChange={this.onChange} /> D<br></br>
                                            <input type="radio" name="sumOfGrade" value="0" onChange={this.onChange} /> F<br></br>

                                            <input type="hidden" className="form-control" name="divideFactor"
                                                value={this.state.tutor.divideFactor} onChange={this.onChange}
                                                placeholder="0~1" />
                                        </div>
                                    </center>
                                    <center>
                                        <button type="submit" className="btn btn-outline-success">Rate</button>
                                    </center>
                                    <br></br>
                                    <center><h4><Link to={`/Rate_DetailTutor/${this.state.tutor.id}`}><span
                                        className="glyphicon glyphicon-eye-open" aria-hidden="true"></span> Go Back to Tutor
                                        Info </Link></h4></center>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Rate_RateTutor;