//The model class of the reservation object that will be stored in DB. The reservation class contains the reservation information - course, tutor, tutee, and the day and time of the tutoring session, saved from the Confirm Reservation use case.
package com.example.findmytutor2.models;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.DayOfWeek;

@Document(collection = "reservations")
public class Reservation {
    @Id
    private String rid;               //The rid value will be the key that defines the single reservation object
    private String course;           //Course Object that the tutee reserved
    private String semester;         //
    private Tutor tutor;             //Person Object who is responsible for the certain course
    private Person tutee;            //Person Object who reserves for the tutoring session
    private String daysOfWeek;    //The day when the tutoring session will take place. This value is stored as a key in the dictionary.
    private long from;               //The exact time when the tutoring session starts. This information will be stored as a value of the dictionary from the Confirm Reservation use case.
    private long to;                 //The exact time when the tutoring session ends. This information will be stored as a value of the dictionary from the Confirm Reservation use case.
    private Boolean rated;
    private Boolean tutorReminder;
    private Boolean tuteeReminder;

    public Reservation(String course, String semester, Tutor tutor, Person tutee, String daysOfWeek, long from, long to, Boolean rated, Boolean tutorReminder, Boolean tuteeReminder) {
        this.course = course;
        this.tutor = tutor;
        this.tutee = tutee;
        this.semester = semester;
        this.daysOfWeek = daysOfWeek;
        this.from = from;
        this.to = to;
        this.rated = rated;
        this.tutorReminder = tutorReminder;
        this.tuteeReminder = tuteeReminder;
    }

    public String getId() {
        return rid;
    }

    public void setId(String id) {
        this.rid = id;
    }

    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    public String getSemester() {
        return semester;
    }

    public void setSemester(String semester) {
        this.semester = semester;
    }

    public Tutor getTutor() {
        return tutor;
    }

    public void setTutor(Tutor tutor) {
        this.tutor = tutor;
    }

    public Person getTutee() {
        return tutee;
    }

    public void setTutee(Person tutee) {
        this.tutee = tutee;
    }

    public String getDaysOfWeek() {
        return daysOfWeek;
    }

    public void setDaysOfWeek(String daysOfWeek) {
        this.daysOfWeek = daysOfWeek;
    }

    public long getFrom() {
        return from;
    }

    public void setFrom(long from) {
        this.from = from;
    }

    public long getTo() {
        return to;
    }

    public void setTo(long to) {
        this.to = to;
    }

    public Boolean getRated() {
        return rated;
    }

    public void setRated(Boolean rated) {
        this.rated = rated;
    }

    public Boolean getTutorReminder() {
        return tutorReminder;
    }

    public void setTutorReminder(Boolean tutorReminder) {
        this.tutorReminder = tutorReminder;
    }

    public Boolean getTuteeReminder() {
        return tuteeReminder;
    }

    public void setTuteeReminder(Boolean tuteeReminder) {
        this.tuteeReminder = tuteeReminder;
    }

    // Get the key-value pairs of in the dictionary that stores the days of week - the starting time and the ending time of the tutoring session
//    public String getStudents() {
//        return this.getTutor().lName + this.getTutor().fName+ " " + this.getTutor().lName + this.getTutor().fName;
//    }
}

