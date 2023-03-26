package com.ssafy.specialized.domain.dto.review;

import lombok.Data;

import java.io.File;
import java.time.LocalDateTime;

@Data
public class ReviewDto {
    // 리뷰 작성시 입력 정보

    private int store;

    private String content;

    private float rating;

    private  boolean isHidden;

}
