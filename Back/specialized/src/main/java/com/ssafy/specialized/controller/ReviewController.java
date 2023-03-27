package com.ssafy.specialized.controller;

import com.ssafy.specialized.domain.dto.review.ReviewDto;
import com.ssafy.specialized.service.ReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/place")
public class ReviewController {
    @Autowired
    private final ReviewService reviewService;

    @PostMapping("/{id}/reviews")
    public ResponseEntity<ReviewDto> writeReview(@RequestBody ReviewDto reviewDto,
                                                 @RequestPart ("file") List<MultipartFile> files) throws Exception {
        reviewService.writeReview(reviewDto, files);
        return ResponseEntity.ok(null);
    }




}
