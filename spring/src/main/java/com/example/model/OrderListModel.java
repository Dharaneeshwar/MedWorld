package com.example.model;


import javax.persistence.*;

@Entity
@Table(name = "OrderList")
public class OrderListModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    
    private String paymentId;

    private Long userId;

    private String username;

    private String type;

    private String imageType;

    private String mobileNumber;


    @Column(name="prescriptionImage",length=1000000)
    private byte[] prescriptionImage;

    private Long status;

    private Long totalPrice;

    public OrderListModel() {
    }

    public OrderListModel(String paymentId, Long userId, String username, String mobileNumber, String type, String imageType, byte[] prescriptionImage, Long status, Long totalPrice) {
        this.paymentId = paymentId;
        this.userId = userId;
        this.username = username;
        this.mobileNumber = mobileNumber;
        this.type = type;
        this.imageType = imageType;
        this.prescriptionImage = prescriptionImage;
        this.status = status;
        this.totalPrice = totalPrice;
    }

    public Long getId() {
        return Id;
    }
    
    public String getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }

    public Long getUserId() {
        return userId;
    }
    
    public void setUserId(Long userId) {
        this.userId = userId;
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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getImageType() {
        return imageType;
    }

    public void setImageType(String type) {
        this.imageType = type;
    }

    public byte[] getPrescriptionImage() {
        return prescriptionImage;
    }

    public void setPrescriptionImage(byte[] prescriptionImage) {
        this.prescriptionImage = prescriptionImage;
    }

    public Long getStatus() {
        return status;
    }

    public void setStatus(Long status) {
        this.status = status;
    }

    public Long getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Long totalPrice) {
        this.totalPrice = totalPrice;
    }
}
