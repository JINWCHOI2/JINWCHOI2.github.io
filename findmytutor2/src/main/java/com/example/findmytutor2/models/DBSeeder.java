package com.example.findmytutor2.models;

import com.example.findmytutor2.repositories.TutoringSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import com.example.findmytutor2.repositories.TutorRepository;
import com.example.findmytutor2.repositories.SessionInfoRepository;
import org.springframework.stereotype.Component;

@Component
public class DBSeeder implements CommandLineRunner {
    TutorRepository tutorRepository;
    SessionInfoRepository sessionInfoRepository;
//    TutoringSessionRepository tutoringSessionRepository;

    @Autowired
    public DBSeeder(TutorRepository tutorRepository) {
        this.tutorRepository = tutorRepository;
    }
    public DBSeeder(SessionInfoRepository sessionInfoRepository) {
        this.sessionInfoRepository = sessionInfoRepository;
    }
//    public DBSeeder(TutoringSessionRepository tutoringSessionRepository) {
//        this.tutoringSessionRepository = tutoringSessionRepository;
//    }

    public void run(String... strings) throws Exception {
//        this.tutorRepository.save(new Tutor("Hojung", "Lim", "CSE101", 0));
//        this.tutorRepository.save(new Tutor("Hojin", "Jeong", "hojin.jeong@stonybrook.edu", 0));
//        this.tutorRepository.save(new Tutor("Htet Naing", "Phyo",  "htetnaing.phyo@stonybrook.edu", 0));
//        this.tutorRepository.save(new Tutor("Sudara", "Ranasinghe", "sudara.ranasinghe@stonybrook.edu", 0));
//        this.tutorRepository.save(new Tutor("Su In", "Cho", "suin.cho@stonybrook.edu", 0));
//        this.tutorRepository.save(new Tutor("Youngchan", "Kim", "youngchan.kim@stonybrook.edu",0));
//        this.tutorRepository.save(new Tutor("Junhyeong", "Park", "junhyeong.park@stonybrook.edu", 0));
//        this.tutorRepository.save(new Tutor("Merry", "Mekonnen", "merry.mekonnen@stonybrook.edu", 0));
//        this.tutorRepository.save(new Tutor("Jina", "Yang", "jina.yang@stonybrook.edu",0));
//        this.tutorRepository.save(new Tutor("Seungwon", "Byun", "seungwon.byun@stonybrook.edu", 0));
//        this.tutorRepository.save(new Tutor("Heejae", "Chang", "heejae.chang@stonybrook.edu", 0));
//        this.tutorRepository.save(new Tutor("Norak", "Rin",  "norak.rin@stonybrook.edu", 0));
//        this.tutorRepository.save(new Tutor("Jungha", "Cho", "jungha.cho@stonybrook.edu", 0));
//        this.tutorRepository.save(new Tutor("Roshan", "Poudel", "roshan.poudel@stonybrook.edu", 0));
//        this.tutorRepository.save(new Tutor("Hyejee", "Chang", "hyejee.chang@stonybrook.edu",0));
//        this.tutorRepository.save(new Tutor("Helena", "Zena", "helena.zena@stonybrook.edu", 0));

        this.tutorRepository.save(new Tutor("Hojung", "Lim", "CSE101", new SessionInfo("MONDAY", 15, 17), "hojung.lim@stonybrook.edu", 0, false));
        this.tutorRepository.save(new Tutor("Hojin", "Jeong", "CSE101", new SessionInfo("THURSDAY", 19, 21), "hojin.jeong@stonybrook.edu", 0, false));
        this.tutorRepository.save(new Tutor("Htet Naing", "Phyo", "CSE101", new SessionInfo("FRIDAY", 17, 19), "htetnaing.phyo@stonybrook.edu", 0, false));
        this.tutorRepository.save(new Tutor("Sudara", "Ranasinghe", "CSE114", new SessionInfo("TUESDAY", 18, 20), "sudara.ranasinghe@stonybrook.edu", 0, false));
        this.tutorRepository.save(new Tutor("Su In", "Cho", "CSE114", new SessionInfo("WEDNESDAY", 21, 23), "suin.cho@stonybrook.edu", 0, false));
        this.tutorRepository.save(new Tutor("Youngchan", "Kim", "CSE114", new SessionInfo("MONDAY", 19, 21), "youngchan.kim@stonybrook.edu", 0, false));
        this.tutorRepository.save(new Tutor("Junhyeong", "Park", "CSE114", new SessionInfo("THURSDAY", 16, 18), "junhyeong.park@stonybrook.edu", 0, false));
        this.tutorRepository.save(new Tutor("Merry", "Mekonnen", "CSE114", new SessionInfo("FRIDAY", 20, 22), "merry.mekonnen@stonybrook.edu", 0, false));
        this.tutorRepository.save(new Tutor("Jina", "Yang", "AMS151", new SessionInfo("MONDAY", 13, 15), "jina.yang@stonybrook.edu", 0, false));
        this.tutorRepository.save(new Tutor("Seungwon", "Byun", "AMS161", new SessionInfo("TUESDAY", 18, 20), "seungwon.byun@stonybrook.edu", 0, false));
        this.tutorRepository.save(new Tutor("Heejae", "Chang", "AMS161", new SessionInfo("THURSDAY", 19, 22), "heejae.chang@stonybrook.edu", 0, false));
        this.tutorRepository.save(new Tutor("Norak", "Rin", "PHY131", new SessionInfo("THURSDAY", 17, 20), "norak.rin@stonybrook.edu", 0, false));
        this.tutorRepository.save(new Tutor("Jungha", "Cho", "PHY131", new SessionInfo("WEDNESDAY", 13, 16), "jungha.cho@stonybrook.edu", 0, false));
        this.tutorRepository.save(new Tutor("Roshan", "Poudel", "AMS151", new SessionInfo("FRIDAY", 16, 18), "roshan.poudel@stonybrook.edu", 0, false));
        this.tutorRepository.save(new Tutor("Hyejee", "Chang", "AMS261", new SessionInfo("TUESDAY", 20, 22), "hyejee.chang@stonybrook.edu", 0, false));
        this.tutorRepository.save(new Tutor("Helena", "Zena", "AMS310", new SessionInfo("THURSDAY", 20, 22), "helena.zena@stonybrook.edu", 0, false));

//        this.tutoringSessionRepository.save(new TutoringSession("Hojung", "Lim", "CSE101", new SessionInfo("MONDAY", 15, 17), false));
//        this.tutoringSessionRepository.save(new TutoringSession("Hojin", "Jung", "CSE101", new SessionInfo("THURSDAY", 19, 21), false));
//        this.tutoringSessionRepository.save(new TutoringSession("Htet Naing", "Phyo", "CSE101", new SessionInfo("FRIDAY", 17, 19), false));
//        this.tutoringSessionRepository.save(new TutoringSession("Sudara", "Ranasinghe", "CSE114", new SessionInfo("TUESDAY", 18, 20), false));
//        this.tutoringSessionRepository.save(new TutoringSession("Su In", "Cho", "CSE114", new SessionInfo("WEDNESDAY", 21, 23), false));
//        this.tutoringSessionRepository.save(new TutoringSession("Youngchan", "Kim", "CSE114", new SessionInfo("MONDAY", 19, 21), false));
//        this.tutoringSessionRepository.save(new TutoringSession("Junhyeong", "Park", "CSE114", new SessionInfo("THURSDAY", 16, 18), false));
//        this.tutoringSessionRepository.save(new TutoringSession("Merry", "Mekonnen", "CSE114", new SessionInfo("FRIDAY", 20, 22), false));
//        this.tutoringSessionRepository.save(new TutoringSession("Jina", "Yang", "AMS151", new SessionInfo("MONDAY", 13, 15), false));
//        this.tutoringSessionRepository.save(new TutoringSession("Seungwon", "Byun", "AMS161", new SessionInfo("TUESDAY", 18, 20), false));
//        this.tutoringSessionRepository.save(new TutoringSession("Heejae", "Chang", "AMS161", new SessionInfo("THURSDAY", 19, 22), false));
//        this.tutoringSessionRepository.save(new TutoringSession("Norak", "Rin", "PHY131", new SessionInfo("THURSDAY", 17, 20), false));
//        this.tutoringSessionRepository.save(new TutoringSession("Jungha", "Cho", "PHY131", new SessionInfo("WEDNESDAY", 13, 16), false));
//        this.tutoringSessionRepository.save(new TutoringSession("Roshan", "Poudel", "AMS151", new SessionInfo("FRIDAY", 16, 18), false));
//        this.tutoringSessionRepository.save(new TutoringSession("Hyejee", "Chang", "AMS261", new SessionInfo("TUESDAY", 20, 22), false));
//        this.tutoringSessionRepository.save(new TutoringSession("Helena", "Zena", "AMS310", new SessionInfo("THURSDAY", 20, 22), false));
    }
}
