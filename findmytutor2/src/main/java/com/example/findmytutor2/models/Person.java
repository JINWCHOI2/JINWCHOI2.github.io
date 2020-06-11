//The model class of the person object that will be stored in DB. This class contains most of the user information saved from the SignUp use case.
package com.example.findmytutor2.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class Person {
    @Id
    String id;                  //The pid value will be the key that defines the single person object
    String userName;            //The user input of the username from the SignUp use case
    String name;           //The user input of the first name from the SignUp use case
    String familyName;            //The user input of the last name from the SignUp use case
    String email;               //The user input of the email from the SignUp use case
    String password;            //The user input the password from the SignUp use case and then generate a salt and hash the password using bcrypt.genSalt and bcrypt.hash function.
    String instructCourse;
    String SBUID;                 //The user input of the SBUID from the SignUp use case
    String academicStanding;    //The user input of the academic standing from the SignUp use case or the Edit Profile use case
    int userType;               //The integer value to distinguish the role of the user. For examples, 0 - Tutee, 1 - Tutor, 2 - Admin, 3 - Guest

    public Person() {
    }

    public Person(String userName, String name, String familyName, String instructCourse, String password, String email, String SBUID, String academicStanding, int userType) {
        this.userName= userName;
        this.name = name;
        this.familyName = familyName;
        this.email = email;
        this.instructCourse = instructCourse;
        this.password = password;
        this.SBUID = SBUID;
        this.academicStanding = academicStanding;
        this.userType = userType;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getuserName() {
        return userName;
    }

    public void setuserName(String userName) {
        this.userName = userName;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFamilyName() {
        return familyName;
    }

    public void setFamilyName(String familyName) {
        this.familyName = familyName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getInstructCourse() {
        return instructCourse;
    }

    public void setInstructCourse(String instructCourse) {
        this.instructCourse = instructCourse;
    }

    public String getSBUID() {
        return SBUID;
    }

    public void setSBUID(String SBUID) {
        this.SBUID = SBUID;
    }

    public String getAcademicStanding() {
        return academicStanding;
    }

    public void setAcademicStanding(String academicStanding) {
        this.academicStanding = academicStanding;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getUserType() {
        return userType;
    }

    public void setUserType(int userType) {
        this.userType = userType;
    }

    // Hash function for the password
    public int hashCode() {
        int hash = 0;
        hash += (password != null ? password.hashCode() : 0);
        return hash;
    }

    //Get the string value of first name and the last name of person
    public String getFullName() {
        return "Name: " + name + " " + familyName;
    }
}