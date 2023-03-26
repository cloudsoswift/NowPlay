package com.ssafy.specialized.service;

import com.ssafy.specialized.domain.dto.review.ResponReviewsDto;
import com.ssafy.specialized.domain.dto.review.ReviewDto;
import com.ssafy.specialized.domain.dto.review.ReviewUpdateDto;
import com.ssafy.specialized.domain.entity.Review;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ReviewService {

    void writeReview(int id, ReviewDto reviewDto, List<MultipartFile> files) throws IOException;

    ResponReviewsDto getStoreReviwList(int storePk);

    Review getDetailReviewDto(int pk);

    void updateReview(ReviewUpdateDto reviewUpdateDto, List<MultipartFile> files) throws IOException;

    void deleteReview(int pk) throws IOException;

}
