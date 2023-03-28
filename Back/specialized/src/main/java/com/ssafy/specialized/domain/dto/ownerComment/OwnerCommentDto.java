package com.ssafy.specialized.domain.dto.ownerComment;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class OwnerCommentDto {

    private int idx;

    private LocalDateTime createAt;

    private String comment;
}
