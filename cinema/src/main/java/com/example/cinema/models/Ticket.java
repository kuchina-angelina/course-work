package com.example.cinema.models;


// import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name="Tickets")
public class Ticket {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "taken")
    private Boolean taken = false;

    @ManyToOne
    @JoinColumn(name = "seat_id")
    private Seat seat;

    @ManyToOne
    @JoinColumn(name = "session_id")
    private Session session;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;


    public void updateTicket(Ticket ticket){
        if (ticket.taken == true | ticket.taken == false){
            this.taken = ticket.taken;
        }

        if(ticket.seat != null){
            this.seat = ticket.seat;
        }

        if(ticket.session != null){
            this.session = ticket.session;
        }

        if(ticket.order != null){
            this.order = ticket.order;
        }
    }

}
