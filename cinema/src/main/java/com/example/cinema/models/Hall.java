package com.example.cinema.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "Halls")
public class Hall {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "number")
    private Integer number;

    @OneToMany(mappedBy = "hall")
    @JsonIgnore
    private List<Session> sessions;

    @OneToMany(mappedBy = "hall")
    @JsonIgnore
    private List<Seat> seats;

    public void updateHall(Hall hall){
        if (hall.number != null){
            this.number = hall.number;
        }
    }
}
