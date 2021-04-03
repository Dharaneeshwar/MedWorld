package com.example.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class JwtModel {

	@Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	private String token;

	
	public JwtModel() {
		
	}
	
	public JwtModel( String token) {
		super();
		this.token = token;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	
	
}
