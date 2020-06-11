package com.example.findmytutor2.models;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "tutoringsessions")

public class TutoringSession {
    @Id
    private String id;
    private String firstName;
    private String lastName;
    private String courseName;      //The administrator’s input of the courseName from the Add Tutor use case
    private SessionInfo sessionInfo;
    private Boolean isReserved;


    public TutoringSession(String firstName, String lastName, String courseName, SessionInfo sessionInfo, Boolean isReserved) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.courseName = courseName;
        this.sessionInfo = sessionInfo;
        this.isReserved = isReserved;
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public SessionInfo getSessionInfo() {
        return sessionInfo;
    }

    public void setSessionInfo(SessionInfo sessionInfo) {
        this.sessionInfo = sessionInfo;
    }

    public Boolean getReserved() {
        return isReserved;
    }

    public void setReserved(Boolean reserved) {
        isReserved = reserved;
    }

}
