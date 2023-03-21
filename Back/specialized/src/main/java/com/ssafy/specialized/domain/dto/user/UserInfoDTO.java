package com.ssafy.specialized.domain.dto.user;

import com.ssafy.specialized.domain.entity.User;
import lombok.Builder;
import lombok.Data;

@Data
public class UserInfoDTO {
    // 회원 정보 조회 시 조회 정보
    private final Integer userIndex;
    private final String userId;
    private final String userPhone;
    private final String userName;
    private final String userAddress;

    @Builder
    public UserInfoDTO(User user) {
        this.userIndex = user.getIdx();
        this.userId = user.getId();
        this.userPhone = user.getPhoneNumber();
        this.userName = user.getName();
        this.userAddress = user.getAddress();
    }
}
