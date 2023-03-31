package com.ssafy.specialized.domain.dto.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BusinessLoginResponseDto {
    private String accessToken;
    private String refreshToken;
    private String userName;
    private int storeIdx;
    private String userAddress;
    private String userNickname;
    private String userDistance;
}
