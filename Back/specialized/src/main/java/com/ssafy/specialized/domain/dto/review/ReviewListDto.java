package com.ssafy.specialized.domain.dto.review;

import com.ssafy.specialized.domain.entity.OwnerComment;
import lombok.Data;

import javax.swing.*;
import java.util.List;
import java.util.Map;
@Data
public class ReviewListDto {

    private int reviewIndex;
    private String reviewContent;
    private float reviewRate;
    private String createdAt;
    private boolean reviewIsHidden;
    private List<String> reviewImages;
    private Map<Spring, OwnerComment> ownerComments;
    private int totalreviewCount;
}
