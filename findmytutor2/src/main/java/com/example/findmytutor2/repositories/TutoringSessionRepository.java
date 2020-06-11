package com.example.findmytutor2.repositories;
import com.example.findmytutor2.models.TutoringSession;
import org.springframework.data.repository.CrudRepository;

public interface TutoringSessionRepository extends CrudRepository<TutoringSession, String> {
    @Override
    void delete(TutoringSession deleted);
}
