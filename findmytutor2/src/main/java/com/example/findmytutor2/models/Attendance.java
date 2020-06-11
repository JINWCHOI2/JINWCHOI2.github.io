//The model class of the attendance object that will be stored in DB. The attendance class contains the attendance information that will be stored from the Scan QRcode use case.
package com.example.findmytutor2.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

//import java.time.DayOfWeek;

@Document(collection = "attendance")
public class Attendance {

    @Id
    private String aid;                     //The aid value will be the key that defines the single reservation object
    private Reservation reservation;           //ID of corresponding reservation Object of the tutoring session 
    private String placeOfSession;          //The tutor’s input of the place where the tutoring session takes place from the Generate QR code use case
    private String dateOfSession;           //Date value recorded by the system. Date when the attendance was recorded.
    private String tutor_time;              //Time value recorded by the system. Time when the tutor generated the QR code in Generate QR code use case
    private String tutee_time;              //Time value recorded by the system. Time when the tutee scanned the QR code in Scan QR code use case
    private Boolean attended;               //Whether the session took place or not    
    /*
    private String aid;                 //The aid value will be the key that defines the single reservation object
    private String course;              //Course Object that the tutee reserved
    private Person tutor;               //Person Object who is responsible for the certain course
    private Person tutee;               //Person Object who is assigned to the tour
    private DayOfWeek dateOfSession;    //The tutor’s input of the day and time when the tutoring session takes place from the Generate QR code use case
    private String placeOfSession;      //The tutor’s input of the place where the tutoring session takes place from the Generate QR code use case
    private Boolean attended;           //Whether the session took place or not*/

    public Attendance(Reservation reservation, String placeOfSession, String dateOfSession, String tutor_time, String tutee_time, Boolean attended) {
        this.reservation = reservation;
        this.placeOfSession = placeOfSession;
        this.dateOfSession = dateOfSession;
        this.tutor_time = tutor_time;
        this.tutee_time = tutee_time;
        this.attended = attended;
    }

    public String getAid() {
        return aid;
    }

    public void setAid(String aid) {
        this.aid = aid;
    }

    public Reservation getReservation() {
        return reservation;
    }

    public void setReservation(Reservation reservation) {
        this.reservation = reservation;
    }

    public String getPlaceOfSession() {
        return placeOfSession;
    }

    public void setPlaceOfSession(String placeOfSession) {
        this.placeOfSession = placeOfSession;
    }

    public String getDateOfSession() {
        return dateOfSession;
    }

    public void setDateOfSession(String dateOfSession) {
        this.dateOfSession = dateOfSession;
    }

    public String getTutorTime() {
        return tutor_time;
    }

    public void setTutorTime(String tutor_time) {
        this.tutor_time = tutor_time;
    }

    public String getTuteeTime() {
        return tutee_time;
    }

    public void setTuteeTime(String tutee_time) {
        this.tutee_time = tutee_time;
    }

    public Boolean getAttended() {
        return attended;
    }

    public void setAttended(Boolean attended) {
        this.attended = attended;
    }

    //Get the tutor and tutee pairs
    /*public String getStudents(){
        String dataToReturn ="";
        tutor = this.getTutor();
        tutee = this.getTutee();
        dataToReturn = tutor.toString()+" "+tutee.toString();


        return dataToReturn;
    }*/




}