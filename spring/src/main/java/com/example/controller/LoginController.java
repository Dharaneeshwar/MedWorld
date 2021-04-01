package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.AuthenticationResponse;
import com.example.model.LoginModel;
import com.example.security.MyUserDetailsService;
import com.example.util.JwtUtil;


@CrossOrigin(origins = "http://localhost:8081")
@RestController
public class LoginController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private MyUserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtTokenUtil;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody LoginModel loginModel) throws Exception {
        System.out.println("inside login");
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginModel.getEmail(), loginModel.getPassword().hashCode())
            );
        }
        catch (BadCredentialsException e) {
            return ResponseEntity.ok(new AuthenticationResponse("",false,false));
        }


        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(loginModel.getEmail());

        boolean isAdmin = true;

        final String jwt = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(new AuthenticationResponse(jwt,true,isAdmin));
    }

}