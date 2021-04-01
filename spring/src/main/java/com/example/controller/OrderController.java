package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.model.OrderModel;
import com.example.repository.OrderRepository;
import com.example.repository.ProductRepository;
import java.util.List;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @GetMapping("/admin/orders")
    public List<OrderModel> getAllProducts() {
        return orderRepository.findAll();
    }


    @PostMapping("/orders")
    public List<OrderModel> getUserProducts(Long userId)
    {
        return orderRepository.findAll();
    }

}
