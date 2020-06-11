//The model class of the tutor object that will be stored in DB. This class inherits from the Person class. The tutor is responsible for only one subject per one semester.
package com.example.findmytutor2.models;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.websocket.Session;

@Document(collection = "tutors")

public class Tutor{
    @Id
    private String id;
    private String fName;
    private String lName;
    private String courseName;      //The administrator’s input of the courseName from the Add Tutor use case
    private SessionInfo sessionInfo;
    private String email;
    private double payment;         //The administrator’s input of the payment from the Add Tutor use case
    private double sumOfHlepfulness;
    private double sumOfPuncuality;
    private double sumOfPreparation;
    private double sumOfGrade;
    private int divideFactor;
    private Boolean isReserved;


    public Tutor(String fName, String lName, String courseName, SessionInfo sessionInfo, String email,
                 double payment, Boolean isReserved) {
        this.fName = fName;
        this.lName = lName;
        this.courseName = courseName;
        this.sessionInfo = sessionInfo;
        this.payment = payment;
        this.email = email;
        this.sumOfHlepfulness = sumOfHlepfulness;
        this.sumOfPuncuality = sumOfPuncuality;
        this.sumOfPreparation = sumOfPreparation;
        this.sumOfGrade = sumOfGrade;
        this.divideFactor = divideFactor;
        this.isReserved = isReserved;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getlName() {return lName;}

    public void setlName(String lName) {
        this.lName = lName;
    }

    public String getfName() {return fName;}

    public void setfName(String fName) {
        this.fName = fName;
    }

//    public String getDepartment() {
//        return department;
//    }
//
//    public void setDepartment(String department) {
//        this.department = department;
//    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getFullName() {
        return this.fName + " " + this.lName;
    }

    public SessionInfo getSessionInfo() {
        return sessionInfo;
    }

    public void setSessionInfo(SessionInfo sessionInfo) {
        this.sessionInfo = sessionInfo;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public double getPayment() {
        return payment;
    }

    public void setPayment(double payment) {
        this.payment = payment;
    }

    public double getSumOfHlepfulness() {
        return sumOfHlepfulness;
    }

    public void setSumOfHlepfulness(double sumOfHlepfulness) {
        this.sumOfHlepfulness = sumOfHlepfulness;
    }

    public double getSumOfPuncuality() {
        return sumOfPuncuality;
    }

    public void setSumOfPuncuality(double sumOfPuncuality) {
        this.sumOfPuncuality = sumOfPuncuality;
    }

    public double getSumOfPreparation() {
        return sumOfPreparation;
    }

    public void setSumOfPreparation(double sumOfPreparation) {
        this.sumOfPreparation = sumOfPreparation;
    }

    public double getSumOfGrade() {
        return sumOfGrade;
    }

    public void setSumOfGrade(double sumOfGrade) {
        this.sumOfGrade = sumOfGrade;
    }

    public int getDivideFactor() {
        return divideFactor;
    }

    public void setDivideFactor(int divideFactor) {
        this.divideFactor = divideFactor;
    }

    public Boolean getIsReserved() {
        return isReserved;
    }

    public void setIsReserved(Boolean isReserved) {
        this.isReserved = isReserved;
    }
}
