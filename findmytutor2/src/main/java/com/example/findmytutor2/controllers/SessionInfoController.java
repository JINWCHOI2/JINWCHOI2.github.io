package com.example.findmytutor2.controllers;

import com.example.findmytutor2.models.SessionInfo;
import com.example.findmytutor2.repositories.SessionInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import java.util.Optional;

@RestController
public class SessionInfoController {
    @Autowired
    SessionInfoRepository sessionInfoRepository;

    @RequestMapping(method=RequestMethod.GET, value="/sessionInfos")
    public Iterable<SessionInfo> sessionInfos() {
        return sessionInfoRepository.findAll();
    }

    @RequestMapping(method=RequestMethod.POST, value="/sessionInfos")
    public SessionInfo save(@RequestBody SessionInfo sessionInfos) {
        sessionInfoRepository.save(sessionInfos);
        return sessionInfos;
    }

    @RequestMapping(method=RequestMethod.GET, value="/sessionInfos/{id}")
    public Optional<SessionInfo> show(@PathVariable String id) {
        return sessionInfoRepository.findById(id);
    }

    @RequestMapping(method=RequestMethod.PUT, value="/sessionInfos/{id}")
    public SessionInfo update(@PathVariable String id, @RequestBody SessionInfo sessionInfos) {
        Optional<SessionInfo> optsessionInfo = sessionInfoRepository.findById(id);
        SessionInfo s = optsessionInfo.get();
        if(sessionInfos.getDaysOfWeek() != null)
            s.setDaysOfWeek(sessionInfos.getDaysOfWeek());
        if(sessionInfos.getDaysOfWeek() != null)
            s.setDaysOfWeek(sessionInfos.getDaysOfWeek());
        if(sessionInfos.getFrom() != 0)
            s.setFrom(sessionInfos.getFrom());
        if(sessionInfos.getTo() != 0)
            s.setTo(sessionInfos.getTo());
        sessionInfoRepository.save(s);
        return s;
    }

    @RequestMapping(method=RequestMethod.DELETE, value="/sessionInfos/{id}")
    public String delete(@PathVariable String id) {
        Optional<SessionInfo> optsessionInfo = sessionInfoRepository.findById(id);
        SessionInfo sessionInfos = optsessionInfo.get();
        sessionInfoRepository.delete(sessionInfos);
        return "";
    }
}
