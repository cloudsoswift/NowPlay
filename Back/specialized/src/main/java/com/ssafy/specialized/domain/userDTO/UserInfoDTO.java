package com.ssafy.specialized.domain.userDTO;

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
        this.userIndex = user.getUserIndex();
        this.userId = user.getUserId();
        this.userPhone = user.getUserPhoneNumber();
        this.userName = user.getUserName();
        this.userAddress = user.getUserAddress();
    }
}
