package com.example.cinema.models;

import java.sql.Date;
import java.sql.Time;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

// import javax.print.attribute.standard.DateTimeAtCompleted;
// import javax.print.attribute.standard.DateTimeAtCreation;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "Sessions")
public class Session {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)

    @Column(name = "id")
    private int id;

    @Column(name = "start")
    private Date start; 

    @Column(name = "price")
    private Float price;

    private Time timeStart;

    private Time timeEnd;

    @ManyToOne
    @JoinColumn(name = "film_id")
    private Film film;

    @ManyToOne
    @JoinColumn(name= "hall_id")
    private Hall hall;

    @OneToMany(mappedBy = "session")
    @JsonIgnore
    private List <Ticket> tickets;

    public void updateSession(Session session){
        if (session.start != null){
            this.start = session.start;
        }

        if (session.price != null){
            this.price = session.price;
            
        }
    }
}

// add time