package com.example.repository;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.model.CartModel;
import com.example.model.UserModel;

@Repository
public interface CartRepository extends JpaRepository<CartModel, Long> {
	List<CartModel> findAllByUserId(UserModel userId);
	Optional<CartModel> findByCartItemId(long cartItemId);

}