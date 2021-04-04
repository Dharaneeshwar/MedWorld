package com.example.security;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.model.UserModel;
import com.example.repository.UserModelRepository;

@Service
public class MyUserDetailsService implements UserDetailsService{

    @Autowired
    UserModelRepository userModelRepository;

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        System.out.println("inside the myuserdetails service");
        Optional<UserModel> userModel = userModelRepository.findByEmail(userName);

        UserModel u = userModel.orElse(null);
        
        System.out.println("inside myuserdetails service 2"+u.getPassword());
//        UserModel serModel = userModelRepository.findByEmail(userName).orElseThrow();
//        System.out.println(serModel.getEmail()+" " + serModel.getPassword());
        return userModel.map(MyUserDetails::new).get();
    }


}