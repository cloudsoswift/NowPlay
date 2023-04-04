package com.ssafy.specialized.service;

import com.ssafy.specialized.domain.dto.ownerComment.OwnerCommentDto;
import com.ssafy.specialized.domain.dto.ownerComment.OwnerCommentPostDto;
import com.ssafy.specialized.domain.entity.OwnerComment;
import com.ssafy.specialized.domain.entity.Review;
import com.ssafy.specialized.repository.OwnerCommentRepository;
import com.ssafy.specialized.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class OwnerCommentServiceImpl implements OwnerCommentService{

    @Autowired
    private final ReviewRepository reviewRepository;
    @Autowired
    private final OwnerCommentRepository ownerCommentRepository;

    @Override
    public void writeOwnerComment(int reviewPk, OwnerCommentPostDto ownerCommentPostDto) {
        Optional<Review> optReview = reviewRepository.findById(reviewPk);
        Review review = null;
        if (optReview.isPresent()){
            review = optReview.get();
        }
        OwnerComment ownerComment = OwnerComment.builder()
                .review(review)
                .createdAt(LocalDateTime.now())
                .content(ownerCommentPostDto.getComment())
                .build();
        ownerCommentRepository.save(ownerComment);
    }

    @Override
    public OwnerComment getOwnerComment(int ownerCommentPk) {
        Optional<OwnerComment> optOwnerComment = ownerCommentRepository.findById(ownerCommentPk);
        OwnerComment ownerComment = null;
        if (optOwnerComment.isPresent()){
            ownerComment = optOwnerComment.get();
        }
        return ownerComment;
    }

    @Override
    public void updateOwnerComment(int ownerCommentPk, OwnerCommentPostDto ownerCommentPostDto) {
        Optional<OwnerComment> optOwnerComment = ownerCommentRepository.findById(ownerCommentPk);
        OwnerComment ownerComment = null;
        if (optOwnerComment.isPresent()){
            ownerComment = optOwnerComment.get();
        }
        ownerComment.setContent(ownerCommentPostDto.getComment());
        ownerComment.setCreatedAt(LocalDateTime.now());
        ownerCommentRepository.save(ownerComment);
    }

    @Override
    public void deleteOwnerComment(int ownerCommentPk) {
        Optional<OwnerComment> optOwnerComment = ownerCommentRepository.findById(ownerCommentPk);
        OwnerComment ownerComment = null;
        if (optOwnerComment.isPresent()){
            ownerComment = optOwnerComment.get();
        }
        ownerCommentRepository.delete(ownerComment);
    }
}
