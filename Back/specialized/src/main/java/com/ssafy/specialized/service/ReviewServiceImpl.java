package com.ssafy.specialized.service;

import com.ssafy.specialized.common.security.SecurityUtil;
import com.ssafy.specialized.domain.dto.review.ReviewDto;
import com.ssafy.specialized.domain.entity.Review;
import com.ssafy.specialized.domain.entity.ReviewImage;
import com.ssafy.specialized.domain.entity.Store;
import com.ssafy.specialized.domain.entity.User;
import com.ssafy.specialized.repository.ReviewImageRepository;
import com.ssafy.specialized.repository.ReviewRepository;
import com.ssafy.specialized.repository.StoreRepository;
import com.ssafy.specialized.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
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
    private final UserRepository userRepository;

    @Autowired
    private final StoreRepository storeRepository;

    @Override
    public void writeReview(ReviewDto reviewDto, List<MultipartFile> files) throws IOException {
        String username = SecurityUtil.getLoginUsername();
        User user = userRepository.findByName(username);
        Optional<Store> optStore = storeRepository.findById(reviewDto.getStore());
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
}
