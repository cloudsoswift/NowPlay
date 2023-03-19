package com.ssafy.specialized.domain.userDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponseDto {
    private String accessToken;
    private String refreshToken;
    private String userName;
    private String userAddress;
    private String userNickname;
    private String userDistance;
}
