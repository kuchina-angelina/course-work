package com.example.cinema.models;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "Orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private LocalDate dateOfBuying = LocalDate.now();

    LocalTime time = LocalTime.now();

    @OneToMany(mappedBy = "order")
    @JsonIgnore
    private Set<Ticket> tickets;

    public void updateOrder(Order order){
        if (order.dateOfBuying != null){
            this.dateOfBuying = order.dateOfBuying;
        }
    }
}


// Аннотация @JoinColumn помогает нам указать столбец, который мы 
// будем использовать для присоединения к ассоциации сущностей или 
// коллекции элементов. 

// С другой стороны, атрибут mappedBy используется 
// для определения ссылающейся стороны (не владеющей стороной) отношения.
