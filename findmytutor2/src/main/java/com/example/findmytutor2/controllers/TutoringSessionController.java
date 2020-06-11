package com.example.findmytutor2.controllers;

import com.example.findmytutor2.models.TutoringSession;
import com.example.findmytutor2.repositories.TutoringSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import java.util.Optional;

@RestController
public class TutoringSessionController {
    @Autowired
    TutoringSessionRepository tutoringSessionRepository;

    @RequestMapping(method=RequestMethod.GET, value="/tutoringsessions")
    public Iterable<TutoringSession> tutoringSession() {
        return tutoringSessionRepository.findAll();
    }

    @RequestMapping(method=RequestMethod.POST, value="/tutoringsessions")
    public TutoringSession save(@RequestBody TutoringSession tutoringSession) {
        tutoringSessionRepository.save(tutoringSession);
        return tutoringSession;
    }

    @RequestMapping(method=RequestMethod.GET, value="/tutoringsessions/{id}")
    public Optional<TutoringSession> show(@PathVariable String id) {
        return tutoringSessionRepository.findById(id);
    }

    @RequestMapping(method=RequestMethod.PUT, value="/tutoringsessions/{id}")
    public TutoringSession update(@PathVariable String id, @RequestBody TutoringSession tutoringSession) {
        Optional<TutoringSession> opttutoringsession = tutoringSessionRepository.findById(id);
        TutoringSession ts = opttutoringsession.get();
        if(tutoringSession.getLastName()!= null)
            ts.setLastName(tutoringSession.getLastName());
        if(tutoringSession.getFirstName() != null)
            ts.setFirstName(tutoringSession.getFirstName());
        if(tutoringSession.getCourseName()!= null)
            ts.setCourseName(tutoringSession.getCourseName());
        if(tutoringSession.getSessionInfo()!= null)
            ts.setSessionInfo(tutoringSession.getSessionInfo());
        if(tutoringSession.getReserved() != null)
            ts.setReserved(tutoringSession.getReserved());

        tutoringSessionRepository.save(ts);
        return ts;
    }

    @RequestMapping(method=RequestMethod.DELETE, value="/tutoringsessions/{id}")
    public String delete(@PathVariable String id) {
        Optional<TutoringSession> opttutoringsession = tutoringSessionRepository.findById(id);
        TutoringSession tutoringSession = opttutoringsession.get();
        tutoringSessionRepository.delete(tutoringSession);
        return "";
    }
}
