package com.example.controller;

import com.example.model.Quantity;
import com.example.model.UserModel;
import com.example.model.ProfileDetails;
import com.example.repository.UserModelRepository;
import com.example.security.MyUserDetailsService;
import com.example.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
public class UserController {
    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private MyUserDetailsService userDetailsService;

    @Autowired
    private UserModelRepository userModelRepository;

    @GetMapping("/profile")
    ResponseEntity<ProfileDetails> addToCart(@RequestHeader(value="Authorization") String authorizationHeader){
        String jwt = authorizationHeader.substring(7);
        String username = jwtUtil.extractUsername(jwt);
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
        UserModel userModel = userModelRepository.findByEmail(userDetails.getUsername()).orElse(null);
        ProfileDetails profileDetails = userModelRepository.findUserDetails(username).orElse(null);
        return ResponseEntity.ok(profileDetails);
    }

    @PostMapping("/profile")
    ResponseEntity<UserModel> addToCart(@RequestHeader(value="Authorization") String authorizationHeader, @RequestBody Quantity quantity, @PathVariable Long id){
        String jwt = authorizationHeader.substring(7);
        String username = jwtUtil.extractUsername(jwt);
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
        UserModel userModel = userModelRepository.findByEmail(userDetails.getUsername()).orElse(null);
        return ResponseEntity.ok(userModel);
    }


}
