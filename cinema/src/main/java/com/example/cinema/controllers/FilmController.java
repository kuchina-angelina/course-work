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

import com.example.cinema.models.Film;
import com.example.cinema.services.FilmService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/films")
public class FilmController {
    @Autowired
    private FilmService filmService;

    @PostMapping("/add")
    public void save(@RequestBody Film film) {
        filmService.saveFilm(film);
    }

    @GetMapping("/getAll")
    public List<Film> getAll() {
        return filmService.getAllFilms();
    }
    
    @GetMapping("/get/{id}")
    public Film getById(@PathVariable Integer id){
        return filmService.getFilmById(id);
    }

    @GetMapping("/getn/{name}")
    public List<Film> getFilmByName(@PathVariable String name){
        log.info("FILM NAME {}", name);
        return filmService.getFilmByName(name);
    }

    @GetMapping("/getg/{genre}")
    public List<Film> getFilmByGenre(@PathVariable String genre){
        return filmService.getFilmByGenre(genre);
    }

    @PutMapping("/update/{id}")
    //@RequestBody сопоставляет тело HttpRequest с объектом передачи или домен
        //PathVariable извлекает номер айди из строки
        //ResponseEntity<?> принимает любой объект джава
        //Конструктор ResponseEntity позволяет перегружать этот объект, добавляя в него не только наш возвращаемый тип, но и статус, 
        //чтобы в случае ошибки можно было понимать, что именно пошло не так.
    public ResponseEntity<?> updateFilm(@RequestBody Film film, @PathVariable Integer id){
        try{
            Film baseFilm = filmService.getFilmById(id);
            baseFilm.updateFilm(film);
            filmService.saveFilm(baseFilm);
            return new ResponseEntity<>(HttpStatus.OK);

        } catch(NoSuchElementException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @DeleteMapping("/delete/{id}")
    public void deleteFilm(Integer id){
        filmService.deleteFilmById(id);
    }
}
