package com.example.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.model.UserModel;
import com.example.model.ProfileDetails;
import javax.transaction.Transactional;

@Repository
@Transactional
public interface UserModelRepository extends JpaRepository<UserModel,Long>{
    Optional<UserModel> findByUsername(String username);
    Optional<UserModel> findByEmail(String email);

    @Query(value = "SELECT new ProfileDetaild(u.username,u.email,u.mobile_number,u.address,u.country,u.pin_code FROM User u WHERE u.email =:email", nativeQuery = true)
    public Optional<ProfileDetails> findUserDetails(@Param("email") String email);
}