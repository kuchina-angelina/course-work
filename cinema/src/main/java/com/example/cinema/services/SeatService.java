package com.example.cinema.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.cinema.models.Seat;
import com.example.cinema.repositories.SeatRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class SeatService {
    @Autowired
    SeatRepository seatRepository;

    public List<Seat> getAllSeats(){
        return seatRepository.findAll();
    }

    public List<Seat> getSeatByLine(Integer line){
        return seatRepository.findByLine(line);
    }

    public void saveSeat(Seat seat){
        seatRepository.save(seat);
    }

    public void deleteSeat(Integer id){
        seatRepository.deleteById(id);
    }

    public Seat getSeatById(Integer id){
        return seatRepository.findById(id).get();
    }
    
    public List<Seat> getSeatByLineAndNumber(Integer line, Integer number ){
        return seatRepository.findByLineAndNumber(line, number);
    }
}
