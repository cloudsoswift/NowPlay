package com.ssafy.specialized.domain.dto.review;

import com.ssafy.specialized.domain.entity.OwnerComment;
import com.ssafy.specialized.domain.entity.Review;
import com.ssafy.specialized.domain.entity.ReviewImage;
import com.ssafy.specialized.domain.entity.Store;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class MyReviewDto {
    private Review review;
    private List<ReviewImage> reviewImage;
    private OwnerComment ownerComment;
}
