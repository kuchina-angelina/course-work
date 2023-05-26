package com.example.cinema.controllers;

import java.util.ArrayList;
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

import com.example.cinema.models.Session;
import com.example.cinema.models.Ticket;
import com.example.cinema.models.Film;
import com.example.cinema.services.FilmService;
import com.example.cinema.services.SessionService;
import com.example.cinema.services.TicketService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/tickets")
public class TicketController {
    @Autowired
    private TicketService ticketService;

    @Autowired
    private FilmService filmService;

    @Autowired
    private SessionService sessionService;

    @PostMapping("/add")
    public void save(@RequestBody Ticket ticket) {
        log.info("VALUES {}, {}", ticket.getTaken(), ticket.getSeat());
        ticketService.saveTicket(ticket);
    }


    @GetMapping("/getAll")
    public List<Ticket> getAll() {
        return ticketService.getAllTickets();
    }
    
    @GetMapping("/get/{id}")
    public Ticket getById(@PathVariable Integer id){
        return ticketService.getTicketById(id);
    }

    @GetMapping("/gett/{taken}")
    public List<Ticket> getFilmByGenre(@PathVariable Boolean taken){
        return ticketService.getTicketByTaken(taken);
    }

    @GetMapping("/get/ticket/{id}") //find ticket by name
    public List<Ticket> getTicketsByFilmName(@PathVariable Integer id) {
        Film film = filmService.getFilmById(id);
        List<Session> sessions = sessionService.getSessionByFilm(film);
        List<Ticket> tickets = new ArrayList<>();
        for(Session session: sessions) {
            List<Ticket> ticketsToAdd = ticketService.getTicketBySession(session);
            tickets.addAll(ticketsToAdd);
        }
        return tickets;
    }

    @GetMapping("/session/{id}")
    public List<Ticket> getTicketBySession(@PathVariable Integer id){
        Session sessions = sessionService.getSessionById(id);
        return ticketService.getTicketBySession(sessions);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateFilm(@RequestBody Ticket ticket, @PathVariable Integer id){
        try{
            Ticket tickets = ticketService.getTicketById(id);
            tickets.updateTicket(ticket);
            ticketService.saveTicket(tickets);
            return new ResponseEntity<>(HttpStatus.OK);

        } catch(NoSuchElementException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    
    @DeleteMapping("/delete/{id}")
    public void deleteTicket(@PathVariable Integer id){
        ticketService.deleteTicket(id);
    }


}
