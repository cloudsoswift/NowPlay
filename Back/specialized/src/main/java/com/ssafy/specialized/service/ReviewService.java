package com.ssafy.specialized.service;

import com.ssafy.specialized.domain.dto.review.ResponReviewsDto;
import com.ssafy.specialized.domain.dto.review.ReviewDetailDto;
import com.ssafy.specialized.domain.dto.review.ReviewDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ReviewService {

    void writeReview(int id, ReviewDto reviewDto, List<MultipartFile> files) throws IOException;

    ResponReviewsDto getStoreReviwList(int storePk);

    ReviewDetailDto getDetailReviewDto(int pk);

    void updateReview(int id, ReviewDto reviewDto, List<MultipartFile> files) throws IOException;

    void deleteReview(int pk) throws IOException;

    Page<?> getStoreReviewListPage(int id, Pageable pageable);
}
