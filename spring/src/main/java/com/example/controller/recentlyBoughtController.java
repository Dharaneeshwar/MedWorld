package com.example.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.OrderModel;
import com.example.model.ProductModel;
import com.example.model.UserModel;
import com.example.repository.OrderListRepository;
import com.example.repository.OrderRepository;
import com.example.repository.ProductRepository;
import com.example.repository.UserModelRepository;
import com.example.security.MyUserDetailsService;
import com.example.util.JwtUtil;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
public class recentlyBoughtController {

	@Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
	 private OrderModel orderModel;
   
   @Autowired
   private UserModelRepository userModelRepository;

   @Autowired
   private OrderListRepository orderListRepository;

   @Autowired
   private MyUserDetailsService userDetailsService;

   @Autowired
   private ProductRepository productRepository;
    
    @GetMapping("/getRecentBuys")
    public List<ProductModel> recentlyBought(@RequestHeader(value="Authorization") String authorizationHeader) {
    	
    	String jwt = authorizationHeader.substring(7);
        String username = jwtUtil.extractUsername(jwt);
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
        UserModel userModel = userModelRepository.findByEmail(userDetails.getUsername()).orElse(null);
        
        List<Long> prodIds =  orderRepository.findRecentBuysOfUser(userModel.getUserId(),PageRequest.of(0,3));
        List<ProductModel> productModels = new ArrayList<>();
       
        for(Long prodId: prodIds ) {
        	productModels.add(productRepository.findById(prodId).orElse(null));
        	
        }
        return productModels;
    }
}
