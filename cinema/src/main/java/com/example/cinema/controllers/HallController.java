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

import com.example.cinema.models.Hall;
import com.example.cinema.services.HallService;

@RestController
@RequestMapping("/halls")
public class HallController {
    @Autowired
    private HallService hallService;

    @PostMapping("/add")
    public void save(@RequestBody Hall hall) {
        hallService.saveHall(hall);
    }

    @GetMapping("/getAll")
    public List<Hall> getAll() {
        return hallService.getAllHalls();
    }

    @GetMapping("/get/{id}")
    public Hall getHallById(@PathVariable Integer id) {
        return hallService.getHallById(id);
    }

    @GetMapping("/getn/{number}")
    public Hall getHallByNumber(@PathVariable Integer number) {
        return hallService.getHallByNumber(number);
    }
    // return list or hall?

    @DeleteMapping("/delete/{id}")
    public void deleteHall(@PathVariable Integer id){
        hallService.deleteHall(id);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateFilm(@RequestBody Hall hall, @PathVariable Integer id){
        try{
            Hall baseHall = hallService.getHallById(id);
            baseHall.updateHall(hall);
            hallService.saveHall(baseHall);
            return new ResponseEntity<>(HttpStatus.OK);

        } catch(NoSuchElementException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
 

