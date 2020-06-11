// The layer class for the interaction with the administrator model and performing DB operations. 
//The TutorRepository extends the CrudRepository. 

package com.example.findmytutor2.repositories;

import com.example.findmytutor2.models.Person;
import com.example.findmytutor2.models.Tutor;
import org.springframework.data.repository.CrudRepository;

public interface TutorRepository extends CrudRepository<Tutor, String> {
    @Override
    void delete(Tutor deleted);
}
