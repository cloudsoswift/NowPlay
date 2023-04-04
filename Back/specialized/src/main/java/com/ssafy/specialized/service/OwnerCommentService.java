package com.ssafy.specialized.service;

import com.ssafy.specialized.domain.dto.ownerComment.OwnerCommentDto;
import com.ssafy.specialized.domain.dto.ownerComment.OwnerCommentPostDto;
import com.ssafy.specialized.domain.entity.OwnerComment;

public interface OwnerCommentService {

    void writeOwnerComment(int reviewPk, OwnerCommentPostDto ownerCommentPostDto);

    OwnerComment getOwnerComment(int ownerCommentPk);

    void updateOwnerComment(int ownerCommentPk, OwnerCommentPostDto ownerCommentPostDto);

    void deleteOwnerComment(int ownerCommentPk);

}
