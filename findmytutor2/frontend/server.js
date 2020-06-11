require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
//const jwt = require('./src/_helpers/jwt');
const errorHandler = require('./src/_helpers/error-handler');
const nodemailer = require('nodemailer');
require('dotenv').config()
const mongoClient = require("mongodb").MongoClient;
const mongoServer = "mongodb://localhost:27017";
const moment = require('moment');
const schedule = require('node-schedule');

//Heroku
const path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/'));

// use JWT auth to secure the api
//app.use(jwt());

// api routes
//app.use('/controllers', require('./controllers/PersonController'));

// global error handler
app.use(errorHandler);

// nodemailer
app.get('/', (req, res) => {
    res.send('welcome to 4000 server');
});

app.post('/email/updateEmailServer', (req, res) => {
    res.send('I received your POST request.');
    database();
})

app.post('/email/contactUs', (req, res) => {
    res.send('POST request received');
    let emailParam = req.body;
    // Step 1
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });
    // Step 2
    let mailOptions = {
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: emailParam.subject,
        html: emailParam.html
    };
    // Step 3
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            res.send(err);
        }
        res.send('Email Sent!');
    });
})

database();
//scheduleDemoReminder();
// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
// Heroku deployment
if(process.env.NODE_ENV === 'production') {
    // Set staticc folder;
    app.use(express.static('frontend/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});

// send reminders on schedule
function database() {
    const semester = getSemester();
    var infoList = new Array();
    mongoClient.connect(mongoServer, function (error, client) {
        if (error)
            console.log("Error while connecting to database: ", error);
        else
            console.log("Connection established successfully");
        //perform operations here
        var db = client.db('KFCFindMyTutor');
        db.collection('reservations').find({}).toArray(function (err, result) {//, function (err, result) {
            if (err)
                console.log("Error: ", err);
            var items = result;
            for (let i = 0; i < items.length; i++) {
                var mailObject = {}
                if (items[i].semester == semester) {

                    if (items[i].tutorReminder || items[i].tuteeReminder){
                        mailObject['to'] = items[i].tutee.email + ', ' + items[i].tutor.email;
                        mailObject['day'] = setDayOfWeek(items[i].daysOfWeek);
                        mailObject['hour'] = items[i].from - 1;
                        mailObject['names'] = items[i].tutor.fName + ' and ' + items[i].tutee.name;
                        mailObject['course'] = items[i].course;
                        infoList.push(mailObject);
                    }
                }
            }
            for (let i = 0; i < infoList.length; i++) {
                console.log(`set ${i}`);
                //var j = schedule.scheduleJob('5 * * * * *', function() { //sec min, hour, day, month, day of week
                var j = schedule.scheduleJob(`0 0 ${infoList[i]['hour']} * * ${infoList[i]['day']}`, function () {
                    let mailOptions = {
                        from: process.env.EMAIL,
                        to: infoList[i]['to'],
                        subject: 'Tutoring Reminder',
                        html: `
                        <div>
                            <h1>Hi ${infoList[i]['names']}!</h1>
                            <dt></dt>
                            <p>Just a quick reminder!</p>
                            <p>You have a tutoring session for ${infoList[i]['course']} coming up soon. </p>
                            <p>The tutoring session starts at ${infoList[i]['hour']}:00. </p>
                        </div>`,
                    };
                    //console.log("it's me again!")
                    //console.log(`hour: ${infoList[i]['hour']} and day: ${infoList[i]['day']}`);
                    mailSender.sendGmail(mailOptions);
                });
            }
            //console.log(infoList);
        });
    });
}

function getSemester() {
    // var today = String(moment().format('YYYY'));
    // if (moment().format('MM')>'07') today += 'Fall';
    // else today += 'Spring';
    // return today;
    var year = '';
    if (moment().format('MM') > '07') {
        year += 'Fall ';
    } else {
        year += 'Spring ';
    }
    year += String(moment().format('YYYY'));
    return year;
}

var mailSender = {
    sendGmail: function (mailOptions) {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 465,
            secure: true,
            //pool: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });
        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                console.log(err)
            }
            console.log('Email sent!!!');
        });
    }
}

function setDayOfWeek(day) {
    switch (day) {
        case 'MONDAY':
            return 1;
        case 'TUESDAY':
            return 2;
        case 'WEDNESDAY':
            return 3;
        case 'THURSDAY':
            return 4;
        case 'FRIDAY':
            return 5;
        case 'SATURDAY':
            return 6;
        case 'SUNDAY':
            return 7;
    }
}

