package com.example.cinema.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.cinema.models.Ticket;

public interface TicketRepository extends JpaRepository<Ticket,Integer>{
    List<Ticket> findByTaken(boolean taken);
    
}
