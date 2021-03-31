package com.example.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;
@Entity
public class CartModel {

    @Id
    private String cartItemID;

    private String ProductName;
    private int Quantity;
    private String Price;

    @OneToOne(mappedBy="cart")
    private UserModel userId;//constructor and setter and getter

    public CartModel() {

    }
    public CartModel(String cartItemID, UserModel userId, String productName, int quantity, String price) {
        super();
        this.cartItemID = cartItemID;
        this.userId = userId;
        ProductName = productName;
        Quantity = quantity;
        Price = price;
    }
    public String getCartItemID() {
        return cartItemID;
    }
    public void setCartItemID(String cartItemID) {
        this.cartItemID = cartItemID;
    }
    public UserModel getUserId() {
        return userId;
    }
    public void setUserId(UserModel userId) {
        this.userId = userId;
    }
    public String getProductName() {
        return ProductName;
    }
    public void setProductName(String productName) {
        ProductName = productName;
    }
    public int getQuantity() {
        return Quantity;
    }
    public void setQuantity(int quantity) {
        Quantity = quantity;
    }
    public String getPrice() {
        return Price;
    }
    public void setPrice(String price) {
        Price = price;
    }
    @Override
    public String toString() {
        return "CartModel [cartItemID=" + cartItemID + ", userId=" + userId + ", ProductName=" + ProductName
                + ", Quantity=" + Quantity + ", Price=" + Price + "]";
    }



}