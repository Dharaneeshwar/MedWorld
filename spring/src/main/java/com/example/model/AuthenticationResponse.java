package com.example.model;


public class AuthenticationResponse {

    private boolean isAdmin;
    private boolean status;
    private final String token;

    public AuthenticationResponse(String token,boolean status, boolean isAdmin) {
        this.token = token;
        this.status = status;
        this.isAdmin = isAdmin;
    }

	public boolean getIsAdmin() {
		return isAdmin;
	}

	public void setAdmin(boolean isAdmin) {
		this.isAdmin = isAdmin;
	}

	public boolean getStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public String getToken() {
		return token;
	}


}