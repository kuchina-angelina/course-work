package com.example.cinema.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.cinema.models.Session;
import com.example.cinema.models.Ticket;
import com.example.cinema.repositories.TicketRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class TicketService {
    @Autowired
    private TicketRepository ticketRepository;

    public List<Ticket> getAllTickets(){
        return ticketRepository.findAll();
    }

    public Ticket getTicketById(Integer id){
        return ticketRepository.findById(id).get();
    }

    public List<Ticket> getTicketBySession(Session session){
        return ticketRepository.findBySession(session);
    }

    public void saveTicket(Ticket ticket){
        ticketRepository.save(ticket);
    }

    public void deleteTicket(Integer id){
        ticketRepository.deleteById(id);
    }
    
    public List<Ticket> getTicketByTaken(Boolean taken){
        return ticketRepository.findByTaken(taken);
    }

}
