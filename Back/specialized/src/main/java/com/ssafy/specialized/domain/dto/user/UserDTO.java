package com.ssafy.specialized.domain.dto.user;

import lombok.Data;

@Data
public class UserDTO {
    // 회원가입시 입력 정보
    private int id;
    private String userId;
    private String userPassword;
    private String userPhone;
    private String userName;
    private String corporateRegistrationNumber;
    private String userAddress;
}
