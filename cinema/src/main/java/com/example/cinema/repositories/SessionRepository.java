package com.example.cinema.repositories;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.stereotype.Repository;

import com.example.cinema.models.Film;
import com.example.cinema.models.Session;

// @Repository
public interface SessionRepository extends JpaRepository<Session,Integer>{
    // List<Session> findByFinish(Date finish);
    List<Session> findByStart(Date start);
    List<Session> findByPrice(Float price);
    List<Session> findByFilm(Film film);
    
}
