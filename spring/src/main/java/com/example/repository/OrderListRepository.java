package com.example.repository;

import com.example.model.OrderListModel;
import com.example.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OrderListRepository extends JpaRepository<OrderListModel,Long> {
    Optional<OrderListModel> findByOrderId(Long orderId);
}
