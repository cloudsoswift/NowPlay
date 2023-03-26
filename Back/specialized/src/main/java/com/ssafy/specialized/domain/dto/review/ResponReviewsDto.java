package com.ssafy.specialized.domain.dto.review;

import lombok.Data;

import java.util.List;

@Data
public class ResponReviewsDto {

    private List<ReviewListDto> reviewListDto;
    private int totalReviewCount;
}
