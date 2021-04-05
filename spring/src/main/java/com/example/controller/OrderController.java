package com.example.controller;

import com.example.model.*;
import com.example.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity.BodyBuilder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.example.security.MyUserDetailsService;
import com.example.util.JwtUtil;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.zip.Deflater;

@CrossOrigin(origins = "http://localhost:8081")
//@CrossOrigin(origins = "https://8081-dbdedffdadadeeffdaabdfaccfeebafecbf.examlyiopb.examly.io")
@RestController
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
	 private CartRepository cartRepository;
    
    @Autowired
	 private OrderModel orderModel;
    
    @Autowired
    private UserModelRepository userModelRepository;

    @Autowired
    private OrderListRepository orderListRepository;

    @Autowired
    private MyUserDetailsService userDetailsService;

    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/admin/orders")
    public List<OrderModel> getAllProducts() {
        return orderRepository.findAll();
    }


    @PostMapping("/orders")
    public List<OrderModel> getUserProducts(@RequestHeader(value="Authorization") String authorizationHeader) {
    	String jwt = authorizationHeader.substring(7);
        String username = jwtUtil.extractUsername(jwt);
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
        UserModel userModel = userModelRepository.findByEmail(userDetails.getUsername()).orElse(null);   
        return orderRepository.findAllByUserId(userModel.getUserId());
    }
    
    @PostMapping("/saveOrder")
    public List<OrderModel> saveProduct(@RequestHeader(value="Authorization") String authorizationHeader) {
		String jwt = authorizationHeader.substring(7);
        String username = jwtUtil.extractUsername(jwt);
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
        UserModel userModel = userModelRepository.findByEmail(userDetails.getUsername()).orElse(null);   
        List<CartModel>  cartModels = cartRepository.findAllByUserId(userModel);
        System.out.println("inside /saveorder");
        for(CartModel c: cartModels) {
        	
        	orderModel.setPrice(c.getPrice());
        	orderModel.setProductName(c.getProductName());
        	orderModel.setQuantity(c.getQuantity());
        	orderModel.setStatus("not placed");
        	orderModel.setUserId(userModel.getUserId());
        	orderModel.setTotalPrice(String.valueOf(Integer.parseInt(c.getPrice())*c.getQuantity()));
        	orderRepository.save(orderModel);
        }
        
        return orderRepository.findAll();
    }
    
    @PostMapping("/placeOrder")
    public  ResponseEntity<Boolean> placeOrder(@RequestHeader(value="Authorization") String authorizationHeader, @RequestBody OrderModel orderModel) {
		String jwt = authorizationHeader.substring(7);
        String username = jwtUtil.extractUsername(jwt);
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
        UserModel userModel = userModelRepository.findByEmail(userDetails.getUsername()).orElse(null);   
       
        if(userModel.getUserId() != orderModel.getUserId()) {
        	return ResponseEntity.ok(false);
        }
        else {
        	orderRepository.save(orderModel);       
        	return ResponseEntity.ok(true);
        }
    }

    @PostMapping("/initOrders")
    public  OrderListModel initOrders(@RequestHeader(value="Authorization") String authorizationHeader, @RequestBody Map<String,String> paramData) {
        String jwt = authorizationHeader.substring(7);
        String username = jwtUtil.extractUsername(jwt);
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
        UserModel userModel = userModelRepository.findByEmail(userDetails.getUsername()).orElse(null);
        OrderListModel orderListModel = new OrderListModel();
        orderListModel.setAccepted(false);
        orderListModel.setMobileNumber(userModel.getMobileNumber());
        orderListModel.setUsername(userModel.getUsername());
        if(paramData.get("orderType").equals("prod"))
        {
            orderListModel.setTotalPrice(Long.parseLong(productRepository.findById(Long.parseLong(paramData.get("prodId"))).orElseThrow().getPrice()));
        }
        else
        {
            Long totalPrice = new Long(0);
            for(CartModel c:cartRepository.findAllByUserId(userModel))
            {
                totalPrice += Long.parseLong(c.getPrice());
            }
            orderListModel.setTotalPrice(totalPrice);
        }
        long millis = 1556175797428L;
        Date date =new Date();
        millis = date.getTime();
        orderListModel.setOrderId(millis);
        OrderListModel initialisedOrderListModel = orderListRepository.save(orderListModel);
        return initialisedOrderListModel;
    }

    @PostMapping("/prescription/upload")
    public BodyBuilder uploadPrescription(@RequestParam("image") MultipartFile file) throws IOException {
//        String jwt = authorizationHeader.substring(7);
//        String username = jwtUtil.extractUsername(jwt);
//        UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
//        UserModel userModel = userModelRepository.findByEmail(userDetails.getUsername()).orElse(null);
        System.out.println(Long.parseLong(file.getOriginalFilename().split("`")[0]));
        OrderListModel orderListModel = orderListRepository.findByOrderId(Long.parseLong(file.getOriginalFilename().split("`")[0])).orElse(null);
        if(orderListModel!=null) {
            orderListModel.setPrescriptionImage(compressBytes(file.getBytes()));
            orderListModel.setType(file.getContentType());
            orderListRepository.save(orderListModel);
            System.out.println("uploaded");
        }
        else
        {
            System.out.println("not uploaded");
        }
        System.out.println("Original Image Byte Size - " + file.getBytes().length);
        System.out.println("Original Image FileNAme - " + file.getOriginalFilename().split("`")[1]);
        System.out.println("Original Image Content Type - " + file.getContentType());
        System.out.println("Compressed Image Byte Size - " + compressBytes(file.getBytes()));
        return ResponseEntity.status(HttpStatus.OK);
    }
    public static byte[] compressBytes(byte[] data) {
        Deflater deflater = new Deflater();
        deflater.setInput(data);
        deflater.finish();
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        while (!deflater.finished()) {
            int count = deflater.deflate(buffer);
            outputStream.write(buffer, 0, count);
        }
        try {
            outputStream.close();
        } catch (IOException e) {
        }
        System.out.println("Compressed Image Byte Size - " + outputStream.toByteArray().length);
        return outputStream.toByteArray();
    }

}
