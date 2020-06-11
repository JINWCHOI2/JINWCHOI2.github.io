//The layer class for the interaction with person models and performing DB operations. 
//The PersonRepository extends the CrudRepository.

package com.example.findmytutor2.repositories;

import com.example.findmytutor2.models.Person;
import org.springframework.data.repository.CrudRepository;

public interface PersonRepository extends CrudRepository<Person, String> {
    @Override
    void delete(Person deleted);

    Person findByEmail(String email);

    Boolean existsByEmail(String email);
}
