package com.example.model;

import javax.persistence.*;

@Entity
@Table(name = "Orders")
public class OrderModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @Column(name = "userId")
    private Long userId;

    @Column(name = "ProductName")
    private String ProductName;

    @Column(name = "totalPrice")
    private String totalPrice;

    @Column(name = "Status")
    private String Status;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "Price")
    private String Price;

    public OrderModel()
    {

    }

    public OrderModel(Long userId, String productName, String totalPrice, String status, int quantity, String price) {
        this.userId = userId;
        this.ProductName = productName;
        this.totalPrice = totalPrice;
        this.Status = status;
        this.quantity = quantity;
        this.Price = price;
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
        return ProductName;
    }

    public void setProductName(String productName) {
        this.ProductName = productName;
    }

    public String getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(String totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getStatus() {
        return Status;
    }

    public void setStatus(String status) {
        this.Status = status;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int Quantity) {
        this.quantity = quantity;
    }

    public String getPrice() {
        return Price;
    }

    public void setPrice(String price) {
        this.Price = price;
    }
}
