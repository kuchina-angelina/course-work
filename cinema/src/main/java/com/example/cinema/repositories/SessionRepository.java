package com.example.cinema.repositories;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.cinema.models.Session;

public interface SessionRepository extends JpaRepository<Session,Integer>{
    List<Session> findByFinish(Date finish);
    List<Session> findByStart(Date start);
    List<Session> findByPrice(Float price);
    
}
