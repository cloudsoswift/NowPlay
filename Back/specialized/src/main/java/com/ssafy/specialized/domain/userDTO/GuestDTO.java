package com.ssafy.specialized.domain.userDTO;

import com.ssafy.specialized.domain.entity.User;
import lombok.Builder;
import lombok.Data;

@Data
public class GuestDTO {
    private String userName;
    private String userPhone;

    @Builder
    public GuestDTO (User guest) {
        this.userName = guest.getUserName();
        this.userPhone = guest.getUserPhoneNumber();
    }
}
