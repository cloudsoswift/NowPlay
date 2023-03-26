package com.ssafy.specialized.domain.dto.review;

import lombok.Data;

@Data
public class ReviewUpdateDto {

    private int idx;

    private String content;

    private float rating;

    private  boolean isHidden;
}
