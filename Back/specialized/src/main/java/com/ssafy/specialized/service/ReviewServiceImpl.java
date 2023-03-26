package com.ssafy.specialized.service;

import com.ssafy.specialized.common.security.SecurityUtil;
import com.ssafy.specialized.domain.dto.review.ResponReviewsDto;
import com.ssafy.specialized.domain.dto.review.ReviewDto;
import com.ssafy.specialized.domain.dto.review.ReviewListDto;
import com.ssafy.specialized.domain.entity.*;
import com.ssafy.specialized.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Slf4j
@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    private final ReviewRepository reviewRepository;

    @Autowired
    private final ReviewImageRepository reviewImageRepository;

    @Autowired
    private final OwnerCommentRepository ownerCommentRepository;

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final StoreRepository storeRepository;

    @Override
    public void writeReview(int id, ReviewDto reviewDto, List<MultipartFile> files) throws IOException {
        String username = SecurityUtil.getLoginUsername();
        User user = userRepository.findByName(username);
        Optional<Store> optStore = storeRepository.findById(id);
        Store store = null;
        if (optStore.isPresent()) {
            store = optStore.get();
        }

        Review review = Review.builder()
                .writer(user)
                .store(store)
                .content(reviewDto.getContent())
                .rating(reviewDto.getRating())
                .createdAt(LocalDateTime.now())
                .isHidden(reviewDto.isHidden())
                .build();
        review = reviewRepository.save(review);
        if (files.size() >= 1) {
            for (MultipartFile file : files) {
                String originalfileName = file.getOriginalFilename();
                File dest = new File("../../../../../resources/img/reviewImage", username + originalfileName);
                file.transferTo(dest);
                ReviewImage reviewImage = ReviewImage.builder()
                        .review(review)
                        .reviewImageUrl(username + originalfileName)
                        .build();
                reviewImageRepository.save(reviewImage);
            }
        }
    }

    @Override
    public ResponReviewsDto getStoreReviwList(int storePk) {
        Optional<Store> optStore = storeRepository.findById(storePk);
        Store store = null;
        if (optStore.isPresent()){
            store = optStore.get();
        }
        List<Review> list = reviewRepository.findAllByStore(store);
        List<ReviewListDto> responlist = new ArrayList<>();
        for (Review review : list) {
            List<ReviewImage> reviewImagelist = reviewImageRepository.findAllByReview(review);
            ReviewListDto reviewListDto = new ReviewListDto();
            reviewListDto.setReviewIndex(review.getIdx());
            reviewListDto.setWriter(review.getWriter());
            reviewListDto.setReviewContent(review.getContent());
            reviewListDto.setReviewRate(review.getRating());
            reviewListDto.setCreatedAt(review.getCreatedAt());
            reviewListDto.setReviewIsHidden(review.isHidden());
            reviewListDto.setReviewImages(reviewImagelist);
            Optional<OwnerComment> ownerComment = Optional.ofNullable(ownerCommentRepository.findByReview(review));
            reviewListDto.setOwnerComment(ownerComment.get());
            responlist.add(reviewListDto);
            }
        ResponReviewsDto responReviewsDto = new ResponReviewsDto();
        responReviewsDto.setReviewListDto(responlist);
        responReviewsDto.setTotalReviewCount(list.size());

        return responReviewsDto;
    }

    @Override
    public Review getDetailReviewDto(int pk) {
        Optional<Review> optReview = reviewRepository.findById(pk);
        Review review = null;
        if (optReview.isPresent()){
            review = optReview.get();
        }
        return review;
    }

    @Override
    public void updateReview(ReviewDto reviewDto, List<MultipartFile> files) throws IOException {

    }
}
