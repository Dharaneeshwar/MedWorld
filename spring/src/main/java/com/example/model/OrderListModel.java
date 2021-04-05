package com.example.model;


import javax.persistence.*;

@Entity
@Table(name = "OrderList")
public class OrderListModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    private Long orderId;

    private String paymentId;

    private Long userId;

    private String username;

    private String mobileNumber;

    private String type;

    @Column(name="prescriptionImage",length=1000)
    private byte[] prescriptionImage;

    private boolean accepted;

    private Long totalPrice;

    public OrderListModel() {
    }

    public OrderListModel(String paymentId, Long userId, String username, String mobileNumber, String type, byte[] prescriptionImage, boolean accepted, Long totalPrice) {
        this.paymentId = paymentId;
        this.userId = userId;
        this.username = username;
        this.mobileNumber = mobileNumber;
        this.type = type;
        this.prescriptionImage = prescriptionImage;
        this.accepted = accepted;
        this.totalPrice = totalPrice;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
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

    public byte[] getPrescriptionImage() {
        return prescriptionImage;
    }

    public void setPrescriptionImage(byte[] prescriptionImage) {
        this.prescriptionImage = prescriptionImage;
    }

    public boolean isAccepted() {
        return accepted;
    }

    public void setAccepted(boolean accepted) {
        this.accepted = accepted;
    }

    public Long getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Long totalPrice) {
        this.totalPrice = totalPrice;
    }
}
