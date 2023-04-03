package com.ssafy.specialized.controller;

import com.ssafy.specialized.domain.dto.review.ReviewDto;
import com.ssafy.specialized.service.ReviewService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@CrossOrigin(origins = {"https://j8d110.p.ssafy.io", "http://127.0.0.1:5173", "http://localhost:5173", "http://172.30.1.95"}, allowCredentials = "true")
@RequestMapping("/places")
public class ReviewController {
    @Autowired
    private final ReviewService reviewService;

    @PostMapping(value = "/{id}/reviews", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> writeReview(
                                            @PathVariable int id,
                                            @RequestPart (name = "review") ReviewDto reviewDto,
                                            @RequestPart (name = "files", required = false) List<MultipartFile> files) throws Exception {
        System.out.println(files);
        reviewService.writeReview(id, reviewDto, files);
        return ResponseEntity.ok(null);
    }

    @GetMapping("/{id}/reviewsList")
    public ResponseEntity<?> getReviewList(@PathVariable int id) throws Exception {
        return ResponseEntity.ok(reviewService.getStoreReviwList(id));
    }

    @GetMapping("/{id}/review")
    public ResponseEntity<?> getReview(@PathVariable int id) throws Exception {
        return ResponseEntity.ok(reviewService.getDetailReviewDto(id));
    }

    @PutMapping(value = "{id}/reviews", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> updateReview(@PathVariable int id,
                                          @RequestPart (name = "review") ReviewDto reviewDto,
                                          @RequestPart (name = "files", required = false) List<MultipartFile> files) throws Exception {
        System.out.println(files);
        reviewService.updateReview(id, reviewDto, files);
        return ResponseEntity.ok(null);
    }

    @DeleteMapping("{id}/reviews")
    public  ResponseEntity<?> deleteReview(@PathVariable int id) throws  Exception {
        reviewService.deleteReview(id);
        return ResponseEntity.ok(null);
    }

    @GetMapping("/{id}/reviews")
    public ResponseEntity<?> getReviewListPage(@PathVariable int id,
                                               @PageableDefault(size = 10, sort = "idx",direction = Sort.Direction.DESC ) Pageable pageable) throws Exception {
        return ResponseEntity.ok(reviewService.getStoreReviewListPage(id, pageable));
    }

}
