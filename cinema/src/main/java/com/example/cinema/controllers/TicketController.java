package com.example.cinema.controllers;

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

import com.example.cinema.models.Ticket;
import com.example.cinema.services.TicketService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/tickets")
public class TicketController {
    @Autowired
    private TicketService ticketService;

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
    public List<Ticket> getFilmByGenre(Boolean taken){
        return ticketService.getTicketByTaken(taken);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateFilm(@RequestBody Ticket ticket, @PathVariable Integer id){
        try{
            Ticket tickets = ticketService.getTicketById(id);
            tickets.updateTicket(ticket);
            return new ResponseEntity<>(HttpStatus.OK);

        } catch(NoSuchElementException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @DeleteMapping("/delete/{id}")
    public void deleteTicket(Integer id){
        ticketService.deleteTicket(id);
    }
}
