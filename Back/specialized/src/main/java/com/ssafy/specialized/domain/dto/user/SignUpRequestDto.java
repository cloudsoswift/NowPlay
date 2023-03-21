package com.ssafy.specialized.domain.dto.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignUpRequestDto {
    private String userName;
    private String userId;
    private String userPassword;
    private String userPhoneNumber;
    private String userNickname;
    private String userEmail;
}
