package com.example.security;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Service;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.example.filter.JwtRequestFilter;

@Service
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter{


    @Autowired
    private MyUserDetailsService myUserDetailsService;

    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(myUserDetailsService);      
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

    	
    	http.csrf().disable()
        .authorizeRequests()
        .antMatchers("/login").permitAll()
        .antMatchers("/signup","/userStatus").permitAll()
        .antMatchers("/logout").hasAnyAuthority("admin","user")
        .antMatchers("/admin","/admin/**").hasAnyAuthority("admin")
        .antMatchers("/home**","/cart","/saveOrder","/orders","/placeOrder","/getRecentBuys").hasAnyAuthority("user")
//        .anyRequest().authenticated()
        .and()//.formLogin().disable().logout().disable()
        .sessionManagement()
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    	

//    			http.csrf().disable()
//                .authorizeRequests().antMatchers("/login").permitAll().antMatchers("/signup").permitAll().
//                anyRequest().authenticated().and().
//                exceptionHandling().and().sessionManagement()
//                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);


//    			http.csrf().disable()
//                .authorizeRequests().antMatchers("/login").permitAll().antMatchers("/signup").permitAll().
//                anyRequest().authenticated().and().
//                exceptionHandling().and().sessionManagement()
//                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

    	http.cors();
        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);



    }
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
    	System.out.println("inside corsconfigurationsource bean************************");
    	CorsConfiguration c = new CorsConfiguration();
    	c.setAllowedOrigins(Arrays.asList("*"));
    	c.setAllowedMethods(Arrays.asList("*"));
    	c.setAllowedHeaders(Arrays.asList("*"));
    	c.setAllowCredentials(false);
    	UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    	source.registerCorsConfiguration("/**", c);
    	
    	return source;
    }
    

//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        //return  NoOpPasswordEncoder.getInstance();
//    	return new BCryptPasswordEncoder();
//    }
//    
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        //return  NoOpPasswordEncoder.getInstance();
    	return new BCryptPasswordEncoder();
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
    	DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
    	
    	provider.setUserDetailsService(userDetailsService());
    	provider.setPasswordEncoder(bCryptPasswordEncoder());
    	
    	return provider;
    }
    


}