package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.model.OrderModel;
import com.example.repository.OrderRepository;

import java.util.List;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @GetMapping("/admin/orders")
    public List<OrderModel> getAllProducts() {
        return orderRepository.findAll();
    }
}
