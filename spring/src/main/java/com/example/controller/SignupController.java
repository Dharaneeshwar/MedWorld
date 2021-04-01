package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.UserModel;
import com.example.repository.UserModelRepository;


@CrossOrigin(origins = "http://localhost:8081")
@RestController
public class SignupController {

    @Autowired
    private UserModelRepository userModelRepository;

    //@Autowired
    //private BCryptPasswordEncoder passwordEncoder;

    @PostMapping("/signup")
    public boolean saveUser(@RequestBody UserModel user) {
        System.out.println("inside signup");
        String email = user.getEmail();
        UserModel userModel = userModelRepository.findByEmail(email)
                .orElse(null);

        if(userModel != null)
        {
            return false;
        }
        user.setActive(true);
        user.setRole("user");
        //user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setPassword(String.valueOf(user.getPassword().hashCode()));
        userModelRepository.save(user);
        return true;

    }

}