package com.example.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.model.CartModel;
import com.example.model.JwtModel;

@Repository
public interface JwtRepository extends JpaRepository<JwtModel,Long> {
	Optional<JwtModel> findByToken(String jwt);
}
