package com.example.cinema.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.cinema.models.Order;

public interface OrderRepository extends JpaRepository<Order,Integer> {
    
}
