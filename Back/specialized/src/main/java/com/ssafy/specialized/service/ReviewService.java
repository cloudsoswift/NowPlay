package com.ssafy.specialized.service;

import com.ssafy.specialized.domain.dto.review.ReviewDto;
import com.ssafy.specialized.domain.entity.Review;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ReviewService {

    void writeReview(ReviewDto reviewDto, List<MultipartFile> files) throws IOException;

    List<Review> getStoreReviwList(int storePk);


}
