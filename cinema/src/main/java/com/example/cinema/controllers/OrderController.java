package com.example.cinema.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.cinema.models.Order;
import com.example.cinema.services.OrderService;



@RestController
@RequestMapping("/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;


    @PostMapping("/add")
    public void save(@RequestBody Order order) {
        orderService.saveOrder(order);

    }

    @GetMapping("/getAll")
    public List<Order> getAll() {
        return orderService.getAllOrders();
    }

    @GetMapping("/get/{id}")
    public Order getOrderById(@PathVariable Integer id) {
        return orderService.getOrderById(id);
    }


    @DeleteMapping("/delete/{id}")
    public void deleteOrder(@PathVariable Integer id){
        orderService.deleteOrder(id);
    }

    // @PutMapping("/update/{id}")
    // public ResponseEntity<?> updateFilm(@RequestBody Order order, @PathVariable Integer id){
    //     try{
    //         Order orders = orderService.getOrderById(id);
    //         orders.updat
    //         orderService.saveHall(baseHall);
    //         return new ResponseEntity<>(HttpStatus.OK);

    //     } catch(NoSuchElementException e){
    //         return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    //     }
    // }

    
}
