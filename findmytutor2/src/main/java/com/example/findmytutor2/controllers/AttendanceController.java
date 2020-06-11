//Contains checking attendance logic and passes the user input data such as dateOfSession and placeOfSession.
//The AttendanceController contains the method that handles requests and
//responses regarding the data of the Attendance object from the Attendance.js to the Attendance model.

package com.example.findmytutor2.controllers;

import com.example.findmytutor2.models.Attendance;
import com.example.findmytutor2.repositories.AttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import java.util.Optional;


@RestController
public class AttendanceController {
    @Autowired
    AttendanceRepository attendanceRepository;

    @RequestMapping(method=RequestMethod.GET, value="/attendance")
    public Iterable<Attendance> attendance() {
        return attendanceRepository.findAll();
    }

    @RequestMapping(method=RequestMethod.POST, value="/attendance")
    public Attendance save(@RequestBody Attendance attendance) {
        attendanceRepository.save(attendance);
        return attendance;
    }

    @RequestMapping(method=RequestMethod.GET, value="/attendance/{id}")
    public Optional<Attendance> show(@PathVariable String id) {
        return attendanceRepository.findById(id);
    }

    @RequestMapping(method=RequestMethod.DELETE, value="/attendance/{id}")
    public String delete(@PathVariable String id) {
        Optional<Attendance> optattendance = attendanceRepository.findById(id);
        Attendance attendance = optattendance.get();
        attendanceRepository.delete(attendance);
        return "";
    }

    @RequestMapping(method=RequestMethod.PUT, value="/attendance/{id}")
    public Attendance update(@PathVariable String id, @RequestBody Attendance attendance) {
        Optional<Attendance> optattendance = attendanceRepository.findById(id);
        Attendance a = optattendance.get();
        if(attendance.getReservation() != null)
            a.setReservation(attendance.getReservation());
        if(attendance.getPlaceOfSession() != null)
            a.setPlaceOfSession(attendance.getPlaceOfSession());
        if(attendance.getDateOfSession() != null)
            a.setDateOfSession(attendance.getDateOfSession());
        if(attendance.getTutorTime() != null)
            a.setTutorTime(attendance.getTutorTime());
        if(attendance.getTuteeTime() != null)
            a.setTuteeTime(attendance.getTuteeTime());
        if(attendance.getAttended() != null)
            a.setAttended(attendance.getAttended());
        attendanceRepository.save(a);
        return a;
    }
}
