//Contains reservation logic and passes the user input data such as course and tutoring session time.
//The ReservationController contains the method that handles requests and responses regarding 
//the data of the Reservation object from the Reservation.js to the Reservation model.

package com.example.findmytutor2.controllers;


import com.example.findmytutor2.models.Reservation;
import com.example.findmytutor2.repositories.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import java.util.Optional;

@RestController
public class ReservationController {
    @Autowired
    ReservationRepository reservationRepository;

    @RequestMapping(method=RequestMethod.GET, value="/reservations")
    public Iterable<Reservation> reservation() {
        return reservationRepository.findAll();
    }

    @RequestMapping(method=RequestMethod.POST, value="/reservations")
    public Reservation save(@RequestBody Reservation reservation) {
        reservationRepository.save(reservation);
        return reservation;
    }

    @RequestMapping(method=RequestMethod.GET, value="/reservations/{id}")
    public Optional<Reservation> show(@PathVariable String id) {
        return reservationRepository.findById(id);
    }

    @RequestMapping(method=RequestMethod.PUT, value="/reservations/{id}")
    public Reservation update(@PathVariable String id, @RequestBody Reservation reservation) {
        Optional<Reservation> optreservation = reservationRepository.findById(id);
        Reservation r = optreservation.get();
        if(reservation.getCourse() != null)
            r.setCourse(reservation.getCourse());
        if(reservation.getDaysOfWeek() != null)
            r.setDaysOfWeek(reservation.getDaysOfWeek());
        if(reservation.getTutee() != null)
            r.setTutee(reservation.getTutee());
        if(reservation.getTutor() != null)
            r.setTutor(reservation.getTutor());
        if(reservation.getFrom() != 0)
            r.setFrom(reservation.getFrom());
        if(reservation.getSemester() != null)
            r.setSemester(reservation.getSemester());
        if(reservation.getTo() != 0)
            r.setTo(reservation.getTo());
        if(reservation.getRated() != null)
            r.setRated(reservation.getRated());
        if(reservation.getTutorReminder() != null)
            r.setTutorReminder(reservation.getTutorReminder());
        if(reservation.getTuteeReminder() != null)
            r.setTuteeReminder(reservation.getTuteeReminder());
        reservationRepository.save(r);
        return r;
    }

    @RequestMapping(method=RequestMethod.DELETE, value="/reservations/{id}")
    public String delete(@PathVariable String id) {
        Optional<Reservation> optreservation = reservationRepository.findById(id);
        Reservation reservation = optreservation.get();
        reservationRepository.delete(reservation);
        return "";
    }
}
