package com.example.model;

import java.io.Serializable;

public class AuthenticationResponse implements Serializable{

    private boolean isAdmin;
    private boolean status;
    private final String token;

    public AuthenticationResponse(String token,boolean status, boolean isAdmin) {
        this.token = token;
        this.status = status;
        this.isAdmin = isAdmin;
    }
    public String getToken() {
        return token;
    }


    public boolean isAdmin() {
        return isAdmin;
    }
    public void setAdmin(boolean isAdmin) {
        this.isAdmin = isAdmin;
    }
    public boolean isStatus() {
        return status;
    }
    public void setStatus(boolean status) {
        this.status = status;
    }

}