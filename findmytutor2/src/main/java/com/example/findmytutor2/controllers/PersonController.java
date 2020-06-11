//For the controllers, basically we are going to utilize RESTful API. The PersonController contains the method that handles requests and 
//responses regarding the data of the person object from the frontend to the backend. 

package com.example.findmytutor2.controllers;

import com.example.findmytutor2.models.Person;
import com.example.findmytutor2.repositories.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import java.util.Optional;

@RestController
public class PersonController {
    @Autowired
    PersonRepository personRepository;

    @RequestMapping(method=RequestMethod.GET, value="/signup")
    public Iterable<Person> person() {
        return personRepository.findAll();
    }

    @RequestMapping(method=RequestMethod.POST, value="/users")
    public Person save(@RequestBody Person person) {
        personRepository.save(person);
        return person;
    }

    @RequestMapping(method=RequestMethod.POST, value="/signup")
    public Person signup(@RequestBody Person person){

        if(personRepository.existsByEmail(person.getEmail())){
            Person personID = personRepository.findByEmail(person.getEmail());
            return personID;
        }
        personRepository.save(person);
        return person;
    }


    @RequestMapping(method=RequestMethod.GET, value="/signup/{id}")
    public Optional<Person> show(@PathVariable String id) {
        return personRepository.findById(id);
    }

    @RequestMapping(method=RequestMethod.PUT, value="/signup/{id}")
    public Person update(@PathVariable String id, @RequestBody Person person) {
        Optional<Person> optperson = personRepository.findById(id);
        Person p = optperson.get();
        if(person.getuserName()!= null)
            p.setuserName(person.getuserName());
        if(person.getName() != null)
            p.setName(person.getName());
        if(person.getFamilyName() != null)
            p.setFamilyName(person.getFamilyName());
        if(person.getEmail() != null)
            p.setEmail(person.getEmail());
        if(person.getSBUID() != null)
            p.setSBUID(person.getSBUID());
        if(person.getAcademicStanding() != null)
            p.setAcademicStanding(person.getAcademicStanding());
        if(person.getPassword() != null)
            p.setPassword(person.getPassword());
        if(person.getUserType() != 0)
            p.setUserType(person.getUserType());
        personRepository.save(p);
        return p;
    }

    @RequestMapping(method=RequestMethod.DELETE, value="/users/{id}")
    public String delete(@PathVariable String id) {
        Optional<Person> optperson = personRepository.findById(id);
        Person person = optperson.get();
        personRepository.delete(person);
        return "";
    }
}
