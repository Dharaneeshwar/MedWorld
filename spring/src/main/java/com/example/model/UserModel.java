package com.example.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "User")
public class UserModel {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    private String email;

    private String password;

    private String username;

    private String mobileNumber;

    private Boolean active;

    private String role;
    
    private String address;

    private String country;

    private String pinCode;

    @OneToMany(mappedBy="userId",fetch=FetchType.LAZY)
    private List<CartModel> cart ;

    @OneToMany(mappedBy="userModel")
    private List<OrderModel> ordersList;

    public Long getUserId() {
		return userId;
	}

	public UserModel() {

    }

    public UserModel(String email, String password, String username, String mobileNumber, Boolean active, String role, String address, String country, String pinCode, List<CartModel> cart, List<OrderModel> ordersList) {
        super();
        this.email = email;
        this.password = password;
        this.username = username;
        this.mobileNumber = mobileNumber;
        this.active = active;
        this.role = role;
        this.address = address;
        this.country = country;
        this.pinCode = pinCode;
        this.cart = cart;
        this.ordersList = ordersList;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getMobileNumber() {
        return mobileNumber;
    }
    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }
    public Boolean getActive() {
        return active;
    }
    public void setActive(Boolean active) {
        this.active = active;
    }
    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }
    public List<CartModel> getCart() {
        return cart;
    }
    public void setCart(List<CartModel> cart) {
        this.cart = cart;
    }
    public List<OrderModel> getOrdersList() {
        return ordersList;
    }
    public void setOrdersList(List<OrderModel> ordersList) {
        this.ordersList = ordersList;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getPinCode() {
        return pinCode;
    }

    public void setPinCode(String pinCode) {
        this.pinCode = pinCode;
    }
}