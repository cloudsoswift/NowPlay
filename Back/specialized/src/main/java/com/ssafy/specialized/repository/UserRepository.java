package com.ssafy.specialized.repository;

import com.ssafy.specialized.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUserId(String userId);

    List<User> findAllByUserName(String userName);

    boolean existsByUserId(String userId);
}