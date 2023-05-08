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
@Table(name = "Films")
public class Film {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)

    @Column(name = "id")
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "duration")
    private String duration;

    @Column(name = "genre")
    private String genre;

    @OneToMany(mappedBy = "film")
    @JsonIgnore
    private List<Session> sessions;

    public void updateFilm(Film film){
        if (film.duration != null){
            this.duration = film.duration;
        }

        if (film.genre != null){
            this.genre = film.genre;
        }

        if (film.name != null){
            this.name = film.name;
        }
    }
}
