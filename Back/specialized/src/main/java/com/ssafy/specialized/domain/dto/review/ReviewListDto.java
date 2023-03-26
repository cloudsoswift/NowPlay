package com.ssafy.specialized.domain.dto.review;

import com.ssafy.specialized.domain.entity.OwnerComment;
import com.ssafy.specialized.domain.entity.ReviewImage;
import com.ssafy.specialized.domain.entity.User;
import lombok.Data;

import javax.swing.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
@Data
public class ReviewListDto {

    private int reviewIndex;
    private User writer;
    private String reviewContent;
    private float reviewRate;
    private LocalDateTime createdAt;
    private boolean reviewIsHidden;
    private List<ReviewImage> reviewImages;
    private OwnerComment ownerComment;
}
