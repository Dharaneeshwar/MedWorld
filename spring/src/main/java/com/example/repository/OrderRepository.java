package com.example.repository;
import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.model.OrderModel;

@Repository
public interface OrderRepository extends JpaRepository<OrderModel, Long> {
	List<OrderModel> findAllByUserId(long userId);
	
	List<OrderModel> findAllByOrderId(String orderId);
	
	OrderModel findById(long Id);
	
	@Query("select DISTINCT productId FROM OrderModel WHERE userId=?1 order by id")
	List<Long> findRecentBuysOfUser(long userId, Pageable pageable);
}