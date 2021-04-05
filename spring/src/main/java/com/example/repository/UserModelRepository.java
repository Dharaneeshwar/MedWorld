package com.example.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.model.UserModel;
import javax.transaction.Transactional;

@Repository
@Transactional
public interface UserModelRepository extends JpaRepository<UserModel,Long>{
    Optional<UserModel> findByUsername(String username);
    Optional<UserModel> findByEmail(String email);
}