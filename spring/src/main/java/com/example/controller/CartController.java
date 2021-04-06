package com.example.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.CartId;
import com.example.model.CartModel;
import com.example.model.ProductModel;
import com.example.model.Quantity;
import com.example.model.UserModel;
import com.example.repository.CartRepository;
import com.example.repository.ProductRepository;
import com.example.repository.UserModelRepository;
import com.example.security.MyUserDetailsService;
import com.example.util.JwtUtil;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
public class CartController {

	 @Autowired
	    private JwtUtil jwtUtil;
	 
	 @Autowired
	    private MyUserDetailsService userDetailsService;
	 
	 @Autowired
	    private ProductRepository productRepository;
	 
	 @Autowired
	    private UserModelRepository userModelRepository;
	 
	 @Autowired
	 private CartRepository cartRepository;

    @RequestMapping(value = "/cart/total", method = RequestMethod.GET)
    ResponseEntity<Long> getTotal( @RequestHeader(value="Authorization") String authorizationHeader) {
        String jwt = authorizationHeader.substring(7);
        String username = jwtUtil.extractUsername(jwt);
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
        UserModel userModel = userModelRepository.findByEmail(userDetails.getUsername()).orElse(null);

        Long totalPrice=new Long(0);
        for(CartModel c:cartRepository.findAllByUserId(userModel))
        {
            totalPrice += Long.parseLong(c.getPrice());
        }
        return ResponseEntity.ok(totalPrice);
    }

    @RequestMapping(value = "/home/{productId}", method = RequestMethod.GET)
    ResponseEntity<?> checkProduct( @RequestHeader(value="Authorization") String authorizationHeader, @PathVariable Long productId) {
        String jwt = authorizationHeader.substring(7);
        String username = jwtUtil.extractUsername(jwt);
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
        UserModel userModel = userModelRepository.findByEmail(userDetails.getUsername()).orElse(null);

        ProductModel product = productRepository.findById(productId).orElse(null);
        int quantity = 0;
        boolean presentInCart = false;
        List<CartModel>  cartModels = cartRepository.findAllByUserId(userModel);
        for(CartModel c: cartModels) {
            if(c.getProductId()==productId)
			{
				presentInCart = true;
				quantity = c.getQuantity();
				break;
			}
        }
		Map<String, Object> response = new HashMap<>();
        response.put("presentInCart",presentInCart);
        response.put("quantity",quantity);
		return new ResponseEntity<>(response, HttpStatus.OK);
    }

	@RequestMapping(value = "/home/{id}", method = RequestMethod.POST)
	ResponseEntity<CartModel> addToCart( @RequestHeader(value="Authorization") String authorizationHeader, @RequestBody Quantity quantity, @PathVariable Long id) {
		String jwt = authorizationHeader.substring(7);
        String username = jwtUtil.extractUsername(jwt);
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
        UserModel userModel = userModelRepository.findByEmail(userDetails.getUsername()).orElse(null);       
        
		ProductModel product = productRepository.findById(id).orElse(null);
		String productName = product.getProductName();
		List<CartModel>  cartModels = cartRepository.findAllByUserId(userModel);
		for(CartModel c: cartModels) {
			if(c.getProductId() == product.getProductId()) {
				c.setQuantity((int)quantity.getQuantity());
				c.setPrice(String.valueOf(Integer.parseInt(product.getPrice())*(int)quantity.getQuantity()));
				cartRepository.save(c);
				c.setUserId(null);
				return ResponseEntity.ok(c);
			}
		}
		
		CartModel cartModel = new CartModel();
		cartModel.setUserId(userModel);
		cartModel.setProductId(product.getProductId());
		cartModel.setProductName(productName);
		cartModel.setQuantity((int)quantity.getQuantity());
		cartModel.setPrice(String.valueOf(Integer.parseInt(product.getPrice())*(int)quantity.getQuantity()));

		cartRepository.save(cartModel);
		
		cartModel.setUserId(null);
		return ResponseEntity.ok(cartModel);
	}
	
	@RequestMapping(value = "/cart", method = RequestMethod.GET)
	ResponseEntity<List<CartModel>> showCart( @RequestHeader(value="Authorization") String authorizationHeader) {
		System.out.println("inside /cart id or qun");
		String jwt = authorizationHeader.substring(7);
        String username = jwtUtil.extractUsername(jwt);
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
        UserModel userModel = userModelRepository.findByEmail(userDetails.getUsername()).orElse(null);       
        		
        List<CartModel>  cartModels = cartRepository.findAllByUserId(userModel);
        
        	for(CartModel c: cartModels) {
        		c.setUserId(null);
        		System.out.println("price"+c.getPrice());
        	}
		return ResponseEntity.ok(cartModels);
	}
	
	@RequestMapping(value = "/cart/delete", method = RequestMethod.POST)
	public boolean deleteCartItem( @RequestHeader(value="Authorization") String authorizationHeader, @RequestBody String productId) {
		long id = Long.parseLong(productId);
		String jwt = authorizationHeader.substring(7);
        String username = jwtUtil.extractUsername(jwt);
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
        UserModel userModel = userModelRepository.findByEmail(userDetails.getUsername()).orElse(null);       
        
        System.out.println("id="+id);
        System.out.println("cart delete 0");
		List<CartModel> cartModels = cartRepository.findAllByUserId(userModel);
		for (CartModel cartModel:cartModels) {
			if (cartModel.getProductId() == id) {
				cartRepository.delete(cartModel);
				return true;
			}
		}		
		return false;
		
		
	}
}
