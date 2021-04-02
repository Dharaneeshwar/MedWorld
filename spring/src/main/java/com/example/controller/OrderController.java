package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.example.model.CartId;
import com.example.model.CartModel;
import com.example.model.OrderModel;
import com.example.model.Quantity;
import com.example.model.UserModel;
import com.example.repository.CartRepository;
import com.example.repository.OrderRepository;
import com.example.repository.ProductRepository;
import com.example.repository.UserModelRepository;
import com.example.security.MyUserDetailsService;
import com.example.util.JwtUtil;

import java.util.List;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
	 private CartRepository cartRepository;
    
    @Autowired
	 private OrderModel orderModel;
    
    @Autowired
    private UserModelRepository userModelRepository;
 
    @Autowired
    private MyUserDetailsService userDetailsService;

    @GetMapping("/admin/orders")
    public List<OrderModel> getAllProducts() {
        return orderRepository.findAll();
    }


    @PostMapping("/orders")
    public List<OrderModel> getUserProducts(@RequestHeader(value="Authorization") String authorizationHeader) {
    	String jwt = authorizationHeader.substring(7);
        String username = jwtUtil.extractUsername(jwt);
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
        UserModel userModel = userModelRepository.findByEmail(userDetails.getUsername()).orElse(null);   
        return orderRepository.findAllByUserId(userModel.getUserId());
    }
    
    @PostMapping("/saveOrder")
    public List<OrderModel> saveProduct(@RequestHeader(value="Authorization") String authorizationHeader) {
		String jwt = authorizationHeader.substring(7);
        String username = jwtUtil.extractUsername(jwt);
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
        UserModel userModel = userModelRepository.findByEmail(userDetails.getUsername()).orElse(null);   
        List<CartModel>  cartModels = cartRepository.findAllByUserId(userModel);
        System.out.println("inside /saveorder");
        for(CartModel c: cartModels) {
        	
        	orderModel.setPrice(c.getPrice());
        	orderModel.setProductName(c.getProductName());
        	orderModel.setQuantity(c.getQuantity());
        	orderModel.setStatus("not placed");
        	orderModel.setUserId(userModel.getUserId());
        	orderModel.setTotalPrice(String.valueOf(Integer.parseInt(c.getPrice())*c.getQuantity()));
        	orderRepository.save(orderModel);
        }
        
        return orderRepository.findAll();
    }
    
    @PostMapping("/placeOrder")
    public  ResponseEntity<Boolean> placeOrder(@RequestHeader(value="Authorization") String authorizationHeader, @RequestBody OrderModel orderModel) {
		String jwt = authorizationHeader.substring(7);
        String username = jwtUtil.extractUsername(jwt);
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
        UserModel userModel = userModelRepository.findByEmail(userDetails.getUsername()).orElse(null);   
       
        if(userModel.getUserId() != orderModel.getUserId()) {
        	return ResponseEntity.ok(false);
        }
        else {
        	orderRepository.save(orderModel);       
        	return ResponseEntity.ok(true);
        }
    }

}
