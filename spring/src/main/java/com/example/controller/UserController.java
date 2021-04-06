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
//        System.out.println(userModel.getUsername());
//        System.out.println(userModel.getEmail());
//        System.out.println(userModel.getMobileNumber());
//        System.out.println(userModel.getAddress());
//        System.out.println(userModel.getCountry());
//        System.out.println(userModel.getPinCode());
        ProfileDetails profileDetails = new ProfileDetails(userModel.getEmail(),userModel.getUsername(),userModel.getMobileNumber()
                ,userModel.getAddress(),userModel.getCountry(),userModel.getPinCode());
        return ResponseEntity.ok(profileDetails);
    }

    @PostMapping("/profile")
    ResponseEntity<String> addToCart(@RequestHeader(value="Authorization") String authorizationHeader, @RequestBody ProfileDetails profileDetails){
        String jwt = authorizationHeader.substring(7);
        String username = jwtUtil.extractUsername(jwt);
        System.out.println("Profile update");
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
        UserModel userModel = userModelRepository.findByEmail(userDetails.getUsername()).orElse(null);
        userModel.setUsername(profileDetails.getUsername());
        userModel.setEmail(profileDetails.getEmail());
        userModel.setMobileNumber(profileDetails.getMobileNumber());
        userModel.setAddress(profileDetails.getAddress());
        userModel.setCountry(profileDetails.getCountry());
        userModel.setPinCode(profileDetails.getPinCode());
        userModelRepository.save(userModel);
        return ResponseEntity.ok("Updated Profile");
    }


}
