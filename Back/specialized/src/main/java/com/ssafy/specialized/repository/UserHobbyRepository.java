package com.ssafy.specialized.repository;

import com.ssafy.specialized.domain.entity.User;
import com.ssafy.specialized.domain.entity.UserHobby;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserHobbyRepository extends JpaRepository<UserHobby, Integer> {
    List<UserHobby> findAllByUser(User user);
}