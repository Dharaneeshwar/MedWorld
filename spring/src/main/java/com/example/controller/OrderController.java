package com.example.controller;

import com.example.model.Product;
import com.example.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.model.Order;
import com.example.repository.OrderRepository;

import java.util.List;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @GetMapping("/admin/orders")
    public List<Order> getAllProducts() {
        return orderRepository.findAll();
    }
}
