package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.exception.ResourceNotFoundException;
import com.example.model.ProductModel;
import com.example.repository.ProductRepository;

@CrossOrigin(origins = "http://localhost:8081")
//@CrossOrigin(origins = "https://8081-dbdedffdadadeeffdaabdfaccfeebafecbf.examlyiopb.examly.io")
@RestController
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/product/{productId}")
    public ResponseEntity<ProductModel> productEditData(@PathVariable Long productId)
    {
        ProductModel product = productRepository.findById(productId).orElseThrow(
                ()->new ResourceNotFoundException("Product Not yet Added!"));
        return ResponseEntity.ok(product);
    }

    @GetMapping("/admin")
    public List<ProductModel> getProduct() {
    	System.out.println("inside product controller");
        return productRepository.findAll();
    }

    @GetMapping("/home")
    public List<ProductModel> getHomeProduct() {
    	System.out.println("inside home");
        return productRepository.findAll();
    }

    @PostMapping("/admin/addProduct")
    public ResponseEntity<String> productSave(@RequestBody ProductModel product)
    {
    	System.out.println("inside product controller" + product.getQuantity());
        productRepository.save(product);
        return new ResponseEntity<String>("Product Added!", HttpStatus.OK);
    }
    
    @GetMapping("/admin/productEdit/{productId}")
    public ResponseEntity<ProductModel> getProductDetails(@PathVariable Long productId)
    {
        ProductModel product = productRepository.findById(productId).orElseThrow(
                ()->new ResourceNotFoundException("Product Not yet Added!"));
        return ResponseEntity.ok(product);
    }

    @PostMapping("/admin/productEdit/{productId}")
    public ResponseEntity<String> productEditSave(@PathVariable Long productId,@RequestBody ProductModel productDetails)
    {
        ProductModel product = productRepository.findById(productId).orElseThrow(
                ()->new ResourceNotFoundException("Product Not yet Added!"));
        product.setImageUrl(productDetails.getImageUrl());
        product.setDescription(productDetails.getDescription());
        product.setPrice(productDetails.getPrice());
        product.setProductName(productDetails.getProductName());
        product.setQuantity(productDetails.getQuantity());

        ProductModel updatedProduct = productRepository.save(product);
        return ResponseEntity.ok("Product details updated");
    }
    
    @GetMapping("/admin/delete/{productId}")
    public ResponseEntity<String> productDelete(@PathVariable Long productId)
    {
        ProductModel product = productRepository.findById(productId).orElseThrow(
                ()->new ResourceNotFoundException("Product Not yet Added!"));
        productRepository.delete(product);
        return new ResponseEntity<String>("Product deleted",HttpStatus.OK);
    }

}
