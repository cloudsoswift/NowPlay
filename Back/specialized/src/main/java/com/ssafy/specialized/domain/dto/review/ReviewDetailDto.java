package com.ssafy.specialized.domain.dto.review;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class ReviewDetailDto {

    private int idx;
    private String content;

    private float rating;

    private  boolean isHidden;

    private List<String> reviewImageUrlList;

    private LocalDateTime creatat;

    public boolean getIsHidden() {
        return isHidden;
    }
}
