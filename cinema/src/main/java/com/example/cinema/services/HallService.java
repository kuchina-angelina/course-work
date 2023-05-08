package com.example.cinema.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.cinema.models.Hall;
import com.example.cinema.repositories.HallRepository;

import jakarta.transaction.Transactional;

@Transactional
@Service
public class HallService {
    @Autowired
    HallRepository hallRepository;

    public List<Hall> getAllHalls(){
        return hallRepository.findAll();
    }

    public Hall getHallById(Integer id){
        return hallRepository.findById(id).get();
    }

    public Hall getHallByNumber(Integer number){
        return hallRepository.findByNumber(number);
    }

    public void saveHall(Hall hall){
        hallRepository.save(hall);
    }

    public void deleteHall(Integer id){
        hallRepository.deleteById(id);
    }

    
}

//look cascade delete
