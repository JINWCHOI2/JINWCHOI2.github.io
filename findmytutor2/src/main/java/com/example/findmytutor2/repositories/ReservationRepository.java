//The layer class for the interaction with reservation model and performing DB operations. 
//The ReservationRepository extends the CrudRepository. 


package com.example.findmytutor2.repositories;
import com.example.findmytutor2.models.Reservation;
import org.springframework.data.repository.CrudRepository;

public interface ReservationRepository extends CrudRepository<Reservation, String> {
    @Override
    void delete(Reservation deleted);
}
