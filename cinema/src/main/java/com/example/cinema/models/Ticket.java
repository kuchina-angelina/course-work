package com.example.cinema.models;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;

// import jakarta.annotation.Nullable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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
    private Boolean taken;

    
    @ManyToOne
    @JoinColumn(name = "seat_id", nullable=true)
    @JsonIgnore
    private Seat seat;

    @ManyToOne
    @JoinColumn(name = "session_id", nullable=true)
    @JsonIgnore
    private Session session;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "order_id", nullable = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Order order;

    public void updateTicket(Ticket ticket){
        if (ticket.taken == true || ticket.taken == false){
            this.taken = ticket.taken;
        }
    }

}
//how to give type boolean 