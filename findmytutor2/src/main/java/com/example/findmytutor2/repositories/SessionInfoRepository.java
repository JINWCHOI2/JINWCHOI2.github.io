package com.example.findmytutor2.repositories;
import com.example.findmytutor2.models.SessionInfo;
import org.springframework.data.repository.CrudRepository;


public interface SessionInfoRepository extends CrudRepository<SessionInfo, String> {
    @Override
    void delete(SessionInfo deleted);
}
