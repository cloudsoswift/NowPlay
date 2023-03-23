package com.ssafy.specialized.repository;

import com.ssafy.specialized.domain.entity.OwnerComment;
import com.ssafy.specialized.domain.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OwnerCommentRepository extends JpaRepository<OwnerComment, Integer> {

    OwnerComment findByReivew(Review review);
}