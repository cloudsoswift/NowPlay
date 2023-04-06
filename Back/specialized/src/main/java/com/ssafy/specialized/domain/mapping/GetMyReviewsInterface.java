package com.ssafy.specialized.domain.mapping;

import java.time.LocalDateTime;

public interface GetMyReviewsInterface {
    int getIdx();
    String getReviewContent();
    LocalDateTime getReviewCreatedAt();
    boolean getIsHidden();
    float getRating();
    int getStoreIdx();
    int getWriterIdx();
    int getReviewImageIdx();
    String getReviewImageUrl();
    String getReviewImageFileName();
    int getOwnerCommentIdx();
    String getOwnerCommentContent();
    LocalDateTime getOwnerCommentCreatedAt();

    //LocalDateTime to ?, ~~Idx type 변환, boolean get 빼기
}
