package com.example.cinema.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.cinema.models.Film;

public interface FilmRepository extends JpaRepository<Film, Integer>{
    List<Film> findByName(String name);
    List<Film> findByGenreContaining(String genre); //???

}