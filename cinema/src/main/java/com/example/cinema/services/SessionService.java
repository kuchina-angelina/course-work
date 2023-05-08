package com.example.cinema.services;

import java.sql.Date;
import java.util.List;
import com.example.cinema.models.Session;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.cinema.repositories.SessionRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class SessionService {
    @Autowired
    SessionRepository sessionRepository;

    public List<Session> getAllSession(){
        return sessionRepository.findAll();
    }

    public Session getSessionById(Integer id){
        return sessionRepository.findById(id).get();
    }

    public List<Session> getSessionByStart(Date start){
        return sessionRepository.findByStart(start);  
    }

    public List<Session> getSessionByFinish(Date finish){
        return sessionRepository.findByFinish(finish); 
    }

    public List<Session> getSessionByPrice(Float price){
        return sessionRepository.findByPrice(price);
    }

    public void saveSession(Session session){
        sessionRepository.save(session);
    }

    public void deleteSession(Integer id){
        sessionRepository.deleteById(id);
    }
    
}
