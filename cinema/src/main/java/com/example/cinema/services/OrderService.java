package com.example.cinema.services;

import java.util.List;
import com.example.cinema.models.Order;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.cinema.repositories.OrderRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class OrderService {
    @Autowired
    OrderRepository orderRepository;

    public List<Order> getAllOrders(){
        return orderRepository.findAll();
    }

    public Order getOrderById(Integer id){
        return orderRepository.findById(id).get();
    }

    public void saveOrder(Order order){
        orderRepository.save(order);
    }

    public void deleteOrder(Integer id){
        orderRepository.deleteById(id);
    }
    
}
