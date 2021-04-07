package com.example.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.stereotype.Component;

import java.util.Date;

@Component
@Entity
@Table(name = "Orders")
public class OrderModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    private String orderId;
    
    @Column(name = "userId")
    private Long userId;

    @Column(name = "productName")
    private String productName;
    
    @Column(name = "productId")
    private long productId;

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
    
    public OrderModel() {
    	
    }


    public OrderModel(String orderId, Long userId, String productName, long productId, String totalPrice,
			String status, int quantity, String price, UserModel userModel) {
		super();
		this.orderId = orderId;
		this.userId = userId;
		this.productName = productName;
		this.productId = productId;
		this.totalPrice = totalPrice;
		this.status = status;
		this.quantity = quantity;
		this.price = price;
		this.userModel = userModel;
	}



	public long getProductId() {
		return productId;
	}



	public void setProductId(long productId) {
		this.productId = productId;
	}



	public UserModel getUserModel() {
		return userModel;
	}



	public void setUserModel(UserModel userModel) {
		this.userModel = userModel;
	}



	public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
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
