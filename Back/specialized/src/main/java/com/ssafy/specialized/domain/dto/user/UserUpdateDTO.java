package com.ssafy.specialized.domain.dto.user;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class UserUpdateDTO {
    // 회원 정보 수정 시 입력 정보
    private String userPhoneNumber;
    private String userNickname;
    private String Password;
    private String userAddress;
    private String userEmail;
}
