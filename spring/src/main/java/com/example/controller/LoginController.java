package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.AuthenticationResponse;
import com.example.model.JwtModel;
import com.example.model.LoginModel;
import com.example.model.UserModel;
import com.example.repository.JwtRepository;
import com.example.repository.UserModelRepository;
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
    
    @Autowired
    UserModelRepository userModelRepository;
    
    @Autowired
    JwtRepository jwtRepository;
    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;
    
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody LoginModel loginModel) throws Exception {
        System.out.println("inside login 1");

        try {
        	 System.out.println("inside login 1.1");
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginModel.getEmail(), loginModel.getPassword())
            );
            System.out.println("inside login controller 2.........");
            UserModel userModel = userModelRepository.findByEmail(loginModel.getEmail()).orElse(null);
            System.out.println("inside login controller 2.1.................");
            if(userModel==null) {
            	System.out.println("inside login controller null");
            }
            final UserDetails userDetails = userDetailsService
                    .loadUserByUsername(loginModel.getEmail());
            System.out.println("inside login controller 2.1");
       	 	final boolean isAdmin = userModel.getRole().equals("admin");
            final String jwt = jwtTokenUtil.generateToken(userDetails);
            
            JwtModel jwtModel = jwtRepository.findByToken(jwt).orElse(null); 
            if(jwtModel != null) {
            	jwtRepository.delete(jwtModel);
            }

            return ResponseEntity.ok(new AuthenticationResponse(jwt,true,isAdmin));
        }
        
        catch(DisabledException e) {
        	return ResponseEntity.ok(new AuthenticationResponse("", false, false));
        }
        catch (BadCredentialsException e) {
        	System.out.println("bad creds");
            return ResponseEntity.ok(new AuthenticationResponse("",false,false));
        }
        catch(Exception e) {
        	System.out.println("isnider");
        	 return ResponseEntity.ok(new AuthenticationResponse("",false,false));
        }
       
    }
    
    @RequestMapping(value = "/userStatus", method = RequestMethod.GET)
    public ResponseEntity<AuthenticationResponse> getStatus(@RequestHeader(value="Authorization") String authorizationHeader)
    {
    	String jwt = authorizationHeader.substring(7);
        String username = jwtTokenUtil.extractUsername(jwt);
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
        UserModel userModel = userModelRepository.findByEmail(userDetails.getUsername()).orElse(null);
    	
        if(userModel == null) {
        	return ResponseEntity.ok(new AuthenticationResponse(null, true,false));
        }
        	System.out.print("isAdmin"+" "+userModel.getRole());
        boolean isAdmin = userModel.getRole().equals("admin");
    	return ResponseEntity.ok(new AuthenticationResponse(null, true,isAdmin));
    
	}

}









