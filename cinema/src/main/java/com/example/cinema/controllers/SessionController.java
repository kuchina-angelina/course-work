package com.example.cinema.controllers;

import java.sql.Date;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.cinema.models.Film;
import com.example.cinema.models.Session;
import com.example.cinema.services.FilmService;
import com.example.cinema.services.SessionService;

// import lombok.extern.slf4j.Slf4j;

// @Slf4j
@RestController
@RequestMapping("/sessions")
public class SessionController {
    @Autowired
    private SessionService sessionService;

    @Autowired
    private FilmService filmService;

    @PostMapping("/add")
    public void save(@RequestBody Session session) {
        sessionService.saveSession(session);
    }

    @GetMapping("/getAll")
    public List<Session> getAll() {
        return sessionService.getAllSession();
    }

    @GetMapping("/get/{id}")
    public Session getSessionById(@PathVariable Integer id) {
        return sessionService.getSessionById(id);
    }

    @GetMapping("/start/{start}")
    public List<Session> getSessionByStart(@PathVariable Date start) {
        return sessionService.getSessionByStart(start);
    }


    @GetMapping("/price/{price}")
    public List<Session> getSessionByPrice(@PathVariable Float price) {
        return sessionService.getSessionByPrice(price);
    }

    @GetMapping("/film/{id}")
    public List<Session> getSessionByFilm(@PathVariable Integer id){
        Film film = filmService.getFilmById(id);
        return sessionService.getSessionByFilm(film);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateSession(@RequestBody Session session, @PathVariable Integer id){
        try{
            Session sessions = sessionService.getSessionById(id);
            sessions.updateSession(session);
            sessionService.saveSession(sessions);
            return new ResponseEntity<>(HttpStatus.OK);

        } catch(NoSuchElementException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @DeleteMapping("/delete/{id}")
    public void deleteHall(@PathVariable Integer id){
        sessionService.deleteSession(id);
    }
    
}
