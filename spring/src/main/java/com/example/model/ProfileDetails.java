package com.example.model;

public class ProfileDetails {

    private String email;

    private String username;

    private String mobileNumber;

    private String address;

    private String country;

    private String pinCode;

    public ProfileDetails() {
    }

    public ProfileDetails(String email, String username, String mobileNumber, String address, String country, String pinCode) {
        this.email = email;
        this.username = username;
        this.mobileNumber = mobileNumber;
        this.address = address;
        this.country = country;
        this.pinCode = pinCode;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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
