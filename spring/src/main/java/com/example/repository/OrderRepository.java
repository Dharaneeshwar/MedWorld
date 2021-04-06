package com.example.repository;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.model.CartModel;
import com.example.model.OrderModel;
import com.example.model.UserModel;

@Repository
public interface OrderRepository extends JpaRepository<OrderModel, Long> {
	List<OrderModel> findAllByUserId(long userId);
	
	List<OrderModel> findAllByOrderId(String orderId);
	
	OrderModel findById(long Id);
}