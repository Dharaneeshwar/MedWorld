package com.example.model;

import javax.persistence.*;

@Entity
@Table(name = "Products")
public class ProductModel{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;

    @Column(name = "imageUrl",columnDefinition = "text")
    private String imageUrl;

    @Column(name = "productName")
    private String productName;

    @Column(name = "price")
    private String price;

    @Column(name = "description",columnDefinition = "text")
    private String description;

    @Column(name = "quantity")
    private String quantity;

    public ProductModel() {

    }

    public ProductModel(String imageUrl, String productName, String price, String description, String quantity) {
        this.imageUrl = imageUrl;
        this.productName = productName;
        this.price = price;
        this.description = description;
        this.quantity = quantity;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }
}