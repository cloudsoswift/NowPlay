package com.ssafy.specialized.domain.dto.user;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FindMyPasswordRequestDTO {

    private String userId;

    private String userEmail;

    private String toBePassword;

}
