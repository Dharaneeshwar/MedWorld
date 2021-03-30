package com.example.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.repository.ProductRepository;
import com.example.exception.ResourceNotFoundException;
import com.example.model.Product;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    // get all Products
    @GetMapping("/admin")
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @PostMapping("/admin/addProduct")
    public ResponseEntity<String> createProduct(@RequestBody Product product)
    {
        productRepository.save(product);
        return new ResponseEntity<String>("Product Added!", HttpStatus.OK);
    }
    
    @GetMapping("/admin/productEdit/{productId}")
    public ResponseEntity<Product> getProductById(@PathVariable Long productId){
        Product product = productRepository.findById(productId).orElseThrow(
                ()->new ResourceNotFoundException("Product Not yet Added!"));
        return ResponseEntity.ok(product);
    }

    @PostMapping("/admin/productEdit/{productId}")
    public ResponseEntity<Product> editProduct(@PathVariable Long productId,@RequestBody Product productDetails)
    {
        Product product = productRepository.findById(productId).orElseThrow(
                ()->new ResourceNotFoundException("Product Not yet Added!"));
        product.setImageUrl(productDetails.getImageUrl());
        product.setDescription(productDetails.getDescription());
        product.setPrice(productDetails.getPrice());
        product.setProductName(productDetails.getProductName());
        product.setQuantity(productDetails.getQuantity());

        Product updatedProduct = productRepository.save(product);
        return ResponseEntity.ok(updatedProduct);
    }

}
