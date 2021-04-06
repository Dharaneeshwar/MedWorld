package com.example.repository;

import com.example.model.OrderListModel;
import com.example.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderListRepository extends JpaRepository<OrderListModel,Long> {
    Optional<OrderListModel> findById(Long Id);
    
    List<OrderListModel> findByStatusNotIn(List<Long> status); 
    
    List<OrderListModel> findAllByUserId(Long userId); 
    
        
}
