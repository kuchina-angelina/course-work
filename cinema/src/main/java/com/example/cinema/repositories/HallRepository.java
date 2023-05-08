package com.example.cinema.repositories;


import org.springframework.data.jpa.repository.JpaRepository;

import com.example.cinema.models.Hall;

public interface HallRepository extends JpaRepository<Hall,Integer> {
    Hall findByNumber(int number);
    
}
