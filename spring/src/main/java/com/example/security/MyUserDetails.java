package com.example.security;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.example.model.UserModel;

public class MyUserDetails implements UserDetails{


    private String password;
    private String username;
    private Boolean active;
    private List<GrantedAuthority> authorityList;;

    public MyUserDetails(UserModel userModel) {
        this.username = userModel.getEmail();
        this.password = userModel.getPassword();
        this.active = userModel.getActive();
        //System.out.println("User role in myuserdetails class is:" + userModel.getRole());
//        this.authorities = Arrays.stream(userModel.getRole().split(","))
//                .map(SimpleGrantedAuthority::new)
//                .collect(Collectors.toList());
        System.out.println("inside my user details"+userModel.getRole());
        this.authorityList = Arrays.stream(userModel.getRole().split(","))
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
        System.out.println("inside my user details 2");
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // TODO Auto-generated method stub
        for(GrantedAuthority l: authorityList) {
            System.out.println("authoritiy:" + l);
        }
        return authorityList;
    }


    @Override
    public String getPassword() {
        // TODO Auto-generated method stub
    	System.out.println("inside myuserdetails get password");
        return password;
    }


    @Override
    public String getUsername() {
        // TODO Auto-generated method stub
        return username;
    }


    @Override
    public boolean isAccountNonExpired() {
        // TODO Auto-generated method stub
        return true;
    }


    @Override
    public boolean isAccountNonLocked() {
        // TODO Auto-generated method stub
        return true;
    }


    @Override
    public boolean isCredentialsNonExpired() {
        // TODO Auto-generated method stub
        return true;
    }


    @Override
    public boolean isEnabled() {
        // TODO Auto-generated method stub
        return active;
    }

}