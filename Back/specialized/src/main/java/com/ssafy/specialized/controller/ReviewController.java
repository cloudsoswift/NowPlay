package com.ssafy.specialized.controller;

import com.ssafy.specialized.domain.dto.review.ReviewDto;
import com.ssafy.specialized.service.ReviewService;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.logging.Logger;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/places")
public class ReviewController {
    @Autowired
    private final ReviewService reviewService;

    @PostMapping("/{id}/reviews")
    public ResponseEntity<ReviewDto> writeReview(
                                                @PathVariable int id,
                                                @RequestBody ReviewDto reviewDto,
                                                @RequestPart ("file") List<MultipartFile> files) throws Exception {

        reviewService.writeReview(id, reviewDto, files);
        return ResponseEntity.ok(null);
    }

    @GetMapping("/{id}/reviews")
    public ResponseEntity<?> getReviewList(@PathVariable int id) throws Exception {
        return ResponseEntity.ok(reviewService.getStoreReviwList(id));
    }

    @GetMapping("/{id}/review")
    public ResponseEntity<?> getReview(@PathVariable int id) throws Exception {
        return ResponseEntity.ok(reviewService.getDetailReviewDto(id));
    }



}
