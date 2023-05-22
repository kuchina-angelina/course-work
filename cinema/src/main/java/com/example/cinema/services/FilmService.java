package com.example.cinema.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.cinema.models.Film;
import com.example.cinema.repositories.FilmRepository;

import jakarta.transaction.Transactional;

@Transactional
@Service //аннотация, объявляющая, что этот класс представляет собой сервис – компонент сервис-слоя.
public class FilmService {
    @Autowired
    FilmRepository filmRepository; //импортируем репо с методами для обработки запросов

    public List<Film> getAllFilms(){
        return filmRepository.findAll();
    }

    public Film getFilmById(Integer id){
        return filmRepository.findById(id).get();
    }

    public void saveFilm (Film film){
        filmRepository.save(film);
    }

    public void deleteFilmById(Integer id){
        filmRepository.deleteById(id);
    }
    
    public List<Film> getFilmByName(String name){
        return filmRepository.findByName(name);
    }
    
    public List<Film> getFilmByGenre(String genre){
        return filmRepository.findByGenreContaining(genre);
    }

 
}

