package com.ssafy.specialized.service;

import com.amazonaws.SdkClientException;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.AmazonS3Exception;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.ssafy.specialized.common.security.SecurityUtil;
import com.ssafy.specialized.domain.dto.review.*;
import com.ssafy.specialized.domain.entity.*;
import com.ssafy.specialized.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
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

    final String endPoint = "https://kr.object.ncloudstorage.com";
    final String regionName = "kr-standard";
    final String accessKey = "ESCb1U9YUC1iPdriv1Qc";
    final String secretKey = "1M49n1x3q4COn0KtlZ2rKt63AQ4ermzvsCg9yk3l";

    // S3 client
    final AmazonS3 s3 = AmazonS3ClientBuilder.standard()
                .withEndpointConfiguration(new AwsClientBuilder.EndpointConfiguration(endPoint, regionName))
                .withCredentials(new AWSStaticCredentialsProvider(new BasicAWSCredentials(accessKey, secretKey)))
                .build();

    String bucketName = "d110/review";

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
                .isHidden(reviewDto.getIsHidden())
                .build();
        review = reviewRepository.save(review);
        if (files != null) {
            for (MultipartFile file : files) {
                String originalfileName = file.getOriginalFilename();
                String newName = username + store.getName() + originalfileName;
                File dest = new File("/", newName);
                file.transferTo(dest);
                String filePath = "/" + newName;
                try {
                    s3.putObject(bucketName, newName, new File(filePath));
                    s3.setObjectAcl(bucketName, newName, CannedAccessControlList.PublicRead);
                    System.out.format("Object %s has been created.\n", newName);
                } catch (AmazonS3Exception e) {
                    e.printStackTrace();
                } catch(SdkClientException e) {
                    e.printStackTrace();
                }
                ReviewImage reviewImage = ReviewImage.builder()
                        .review(review)
                        .reviewImageUrl("https://kr.object.ncloudstorage.com/d110/review/"+newName)
                        .reviewImageFileName(newName)
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
        if (list.size() >= 1) {
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
                Optional<OwnerComment> optownerComment = Optional.ofNullable(ownerCommentRepository.findByReview(review));
                OwnerComment ownerComment = null;
                if (optownerComment.isPresent()){
                    ownerComment = optownerComment.get();
                }
                reviewListDto.setOwnerComment(ownerComment);
                responlist.add(reviewListDto);
            }
        }
        ResponReviewsDto responReviewsDto = new ResponReviewsDto();
        responReviewsDto.setReviewListDto(responlist);
        responReviewsDto.setTotalReviewCount(list.size());

        return responReviewsDto;
    }

    @Override
    public ReviewDetailDto getDetailReviewDto(int pk) {
        Optional<Review> optReview = reviewRepository.findById(pk);
        Review review = null;
        if (optReview.isPresent()){
            review = optReview.get();
        }
        List<ReviewImage> reviewImageList = reviewImageRepository.findAllByReview(review);
        List<String> imageUrlList = new ArrayList<>();
        ReviewDetailDto reviewDetailDto = new ReviewDetailDto();
        reviewDetailDto.setIdx(review.getIdx());
        reviewDetailDto.setContent(review.getContent());
        reviewDetailDto.setHidden(review.isHidden());
        reviewDetailDto.setRating(review.getRating());
        reviewDetailDto.setCreatat(review.getCreatedAt());
        for (ReviewImage reviewImage : reviewImageList) {
            imageUrlList.add(reviewImage.getReviewImageUrl());
        }
        reviewDetailDto.setReviewImageUrlList(imageUrlList);
        return reviewDetailDto;
    }

    @Override
    public void updateReview(int id, ReviewDto reviewDto, List<MultipartFile> files) throws IOException {
        String username = SecurityUtil.getLoginUsername();
        Optional<Review> optReview = reviewRepository.findById(id);
        Review review = null;
        if (optReview.isPresent()){
            review = optReview.get();
        }
        List<ReviewImage> reviewImageList = reviewImageRepository.findAllByReview(review);
        for (ReviewImage reviewImage: reviewImageList) {
            try {
                s3.deleteObject(bucketName,reviewImage.getReviewImageFileName());
            } catch (AmazonS3Exception e) {
                e.printStackTrace();
            } catch(SdkClientException e) {
                e.printStackTrace();
            }
            reviewImageRepository.delete((reviewImage));
        }
        review.setContent(reviewDto.getContent());
        review.setCreatedAt(LocalDateTime.now());
        review.setRating(reviewDto.getRating());
        reviewRepository.save(review);
        Store store = review.getStore();
        if (files.size() >= 1) {
            for (MultipartFile file : files) {
                String originalfileName = file.getOriginalFilename();
                String newName = username + store.getName() + originalfileName;
                File dest = new File("/", newName);
                file.transferTo(dest);
                String filePath = "/" + newName;
                try {
                    s3.putObject(bucketName, newName, new File(filePath));
                    s3.setObjectAcl(bucketName, newName, CannedAccessControlList.PublicRead);
                    System.out.format("Object %s has been created.\n", newName);
                } catch (AmazonS3Exception e) {
                    e.printStackTrace();
                } catch(SdkClientException e) {
                    e.printStackTrace();
                }
                ReviewImage reviewImage = ReviewImage.builder()
                        .review(review)
                        .reviewImageUrl("https://kr.object.ncloudstorage.com/d110/review/"+newName)
                        .reviewImageFileName(newName)
                        .build();
                reviewImageRepository.save(reviewImage);

            }
        }

    }

    @Override
    public void deleteReview(int id) throws IOException {
        Optional<Review> optReview = reviewRepository.findById(id);
        Review review = null;
        if (optReview.isPresent()){
            review = optReview.get();
        }
        List<ReviewImage> reviewImageList = reviewImageRepository.findAllByReview(review);
        for (ReviewImage reviewImage: reviewImageList) {
            System.out.println(reviewImage.getReviewImageFileName());
            try {
                s3.deleteObject(bucketName,reviewImage.getReviewImageFileName());
            } catch (AmazonS3Exception e) {
                e.printStackTrace();
            } catch(SdkClientException e) {
                e.printStackTrace();
            }
            reviewImageRepository.delete(reviewImage);
        }
        reviewRepository.delete(review);
    }

    @Override
    public Page<?> getStoreReviewListPage(int id, Pageable pageable) {
        Page<Object[]> result = reviewRepository.findAllByStorePage(id, pageable);
        return result;
    }
}
