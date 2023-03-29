package com.ssafy.specialized.service;

import com.ssafy.specialized.domain.dto.ownerComment.OwnerCommentDto;
import com.ssafy.specialized.domain.entity.OwnerComment;

public interface OwnerCommentService {

    void writeOwnerComment(int reviewPk, String comment);

    OwnerComment getOwnerComment(int ownerCommentPk);

    void updateOwnerComment(int ownerCommentPk, String comment);

    void deleteOwnerComment(int ownerCommentPk);

}
