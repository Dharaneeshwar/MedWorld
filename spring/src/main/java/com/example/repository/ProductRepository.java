package com.example.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.model.ProductModel;

@Repository
public interface ProductRepository extends JpaRepository<ProductModel, Long> {

}