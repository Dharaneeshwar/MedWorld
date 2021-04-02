package com.example.model;

import javax.persistence.*;

@Entity
@Table(name = "Orders")
public class OrderModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;
    
    @Column(name = "userId", nullable = false)
    private Long userId;

    @Column(name = "productName")
    private String productName;

    @Column(name = "totalPrice")
    private String totalPrice;

    @Column(name = "status")
    private String status;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "price")
    private String price;

    @ManyToOne
    private UserModel userModel;

    public OrderModel()
    {

    }

    public OrderModel(Long userId, String productName, String totalPrice, String status, int quantity, String price) {
        this.userId = userId;
        this.productName = productName;
        this.totalPrice = totalPrice;
        this.status = status;
        this.quantity = quantity;
        this.price = price;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(String totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }
}
