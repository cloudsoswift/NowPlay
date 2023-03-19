package com.ssafy.specialized.domain.userDTO;

import lombok.Data;

@Data
public class FindPasswordDTO {
    private String userId;
    private String userName;
    private String userPhone;
    private String toBePassword;
}
