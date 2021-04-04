package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.JwtModel;
import com.example.model.UserModel;
import com.example.repository.JwtRepository;
import com.example.repository.UserModelRepository;
import com.example.util.JwtUtil;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
public class LogoutController {
        
    @Autowired
    UserModelRepository userModelRepository;
    
    @Autowired
    JwtRepository jwtRepository;
    
    @Autowired
    JwtUtil jwtUtil;

    @RequestMapping(value = "/logout", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestHeader(value="Authorization") String authorizationHeader) throws Exception {
        System.out.println("inside logout 1");

        try {
        	String jwt = authorizationHeader.substring(7);
            
            JwtModel jwtModel = new JwtModel(jwt);
            System.out.println("inside logout 2");
            jwtRepository.save(jwtModel);
            System.out.println("inside logout 2");
            return ResponseEntity.ok(new String("true"));
        }
        
        
        catch (Exception e) {
            return ResponseEntity.ok(new String("false"));
        }
       
    }
    
 

}









