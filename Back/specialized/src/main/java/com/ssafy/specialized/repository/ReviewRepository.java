package com.ssafy.specialized.repository;

import com.ssafy.specialized.domain.entity.Review;
import com.ssafy.specialized.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
    List<Review> findAllByWriter(User writer);
}