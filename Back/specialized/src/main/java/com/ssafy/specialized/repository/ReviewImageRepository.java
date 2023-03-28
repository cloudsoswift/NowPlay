package com.ssafy.specialized.repository;

import com.ssafy.specialized.domain.entity.Review;
import com.ssafy.specialized.domain.entity.ReviewImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewImageRepository extends JpaRepository<ReviewImage, Integer> {

    List<ReviewImage> findAllByReview(Review review);
}