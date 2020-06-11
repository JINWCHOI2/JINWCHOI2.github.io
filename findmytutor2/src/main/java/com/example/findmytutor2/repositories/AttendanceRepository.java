//The layer class for the interaction with attendance model and performing DB operations. 
//The AttendanceRepository extends the CrudRepository. 

package com.example.findmytutor2.repositories;

import com.example.findmytutor2.models.Attendance;
import org.springframework.data.repository.CrudRepository;

public interface AttendanceRepository extends CrudRepository<Attendance, String> {
    @Override
    void delete(Attendance deleted);
}
