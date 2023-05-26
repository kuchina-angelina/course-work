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

import com.example.cinema.models.Seat;
import com.example.cinema.services.SeatService;

@RestController
@RequestMapping("/seats")
public class SeatController {
    @Autowired
    private SeatService seatService;

    @PostMapping("/add")
    public void addSeat(@RequestBody Seat seat){
        seatService.saveSeat(seat);
    }

    @GetMapping("/getAll")
    public List<Seat> getAll(){
        return seatService.getAllSeats();
    }

    @GetMapping("/get/{id}")
    public Seat getSeatById(@PathVariable Integer id){ 
        return seatService.getSeatById(id);
    }

    @GetMapping("/getl/{line}")
    public List<Seat> getSeatByLine(@PathVariable Integer line){
        return seatService.getSeatByLine(line);  
    }

    @GetMapping("get/{line}/{number}")
    public List<Seat> getByLineAndNumber(@PathVariable Integer line, @PathVariable Integer number){
        return seatService.getSeatByLineAndNumber(line, number);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateFilm(@RequestBody Seat seat, @PathVariable Integer id){
        try{
            Seat seats = seatService.getSeatById(id);
            seats.updateSeat(seat);
            seatService.saveSeat(seats);
            return new ResponseEntity<>(HttpStatus.OK);

        } catch(NoSuchElementException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public void deleteSeat(@PathVariable Integer id){
        seatService.deleteSeat(id);
    }
    
}
