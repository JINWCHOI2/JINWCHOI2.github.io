//Contains logic regarding Tutor data, and passes the administrator’s input data such as payment and score. 
//The TutorController contains the method that handles requests and
//responses regarding the data of the tutor object from the frontend to the backend.

package com.example.findmytutor2.controllers;

import com.example.findmytutor2.models.Tutor;
import com.example.findmytutor2.repositories.TutorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import java.util.Optional;

@RestController
public class TutorController {
    @Autowired
    TutorRepository tutorRepository;

    @RequestMapping(method=RequestMethod.GET, value="/tutors")
    public Iterable<Tutor> tutor() {
        return tutorRepository.findAll();
    }

    @RequestMapping(method=RequestMethod.POST, value="/tutors")
    public Tutor save(@RequestBody Tutor tutor) {
        tutorRepository.save(tutor);
        return tutor;
    }

    @RequestMapping(method=RequestMethod.GET, value="/tutors/{id}")
    public Optional<Tutor> show(@PathVariable String id) {
        return tutorRepository.findById(id);
    }

//    @RequestMapping(method=RequestMethod.GET, value="/tutors/{fName}")
//    public Tutor findTutorByName(@RequestBody Tutor tutor) {
//        return tutorRepository.findByFName(tutor.getfName());
//    }

    @RequestMapping(method=RequestMethod.PUT, value="/tutors/{id}")
    public Tutor update(@PathVariable String id, @RequestBody Tutor tutor) {
        Optional<Tutor> opttutor = tutorRepository.findById(id);
        Tutor t = opttutor.get();
        if(tutor.getlName()!= null)
            t.setlName(tutor.getlName());
        if(tutor.getfName() != null)
            t.setfName(tutor.getfName());
        if(tutor.getCourseName()!= null)
            t.setCourseName(tutor.getCourseName());
        if(tutor.getPayment()!= 0)
            t.setPayment(tutor.getPayment());
        if(tutor.getSessionInfo()!= null)
            t.setSessionInfo(tutor.getSessionInfo());
        if(tutor.getEmail()!= null)
            t.setEmail(tutor.getEmail());
        if(tutor.getSumOfHlepfulness()!= 0)
            t.setSumOfHlepfulness(tutor.getSumOfHlepfulness());
        if(tutor.getSumOfPuncuality()!= 0)
            t.setSumOfPuncuality(tutor.getSumOfPuncuality());
        if(tutor.getSumOfPreparation()!= 0)
            t.setSumOfPreparation(tutor.getSumOfPreparation());
        if(tutor.getSumOfGrade()!= 0)
            t.setSumOfGrade(tutor.getSumOfGrade());
        if(tutor.getDivideFactor()!= 0)
            t.setDivideFactor(tutor.getDivideFactor());
        if(tutor.getIsReserved() != null)
            t.setIsReserved(tutor.getIsReserved());

        tutorRepository.save(t);
        return t;
    }

    @RequestMapping(method=RequestMethod.DELETE, value="/tutors/{id}")
    public String delete(@PathVariable String id) {
        Optional<Tutor> opttutor = tutorRepository.findById(id);
        Tutor tutor = opttutor.get();
        tutorRepository.delete(tutor);
        return "";
    }
}
