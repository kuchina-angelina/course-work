package com.example.cinema.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.cinema.models.Seat;

public interface SeatRepository extends JpaRepository<Seat,Integer>{
    List<Seat> findByLine(int line);
    
}
