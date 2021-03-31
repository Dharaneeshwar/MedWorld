package com.example.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.model.CartModel;

@Repository
public interface CartRepository extends JpaRepository<CartModel, Long> {

}