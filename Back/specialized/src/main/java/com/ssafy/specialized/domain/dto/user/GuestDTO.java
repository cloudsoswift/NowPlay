package com.ssafy.specialized.domain.dto.user;

import com.ssafy.specialized.domain.entity.User;
import lombok.Builder;
import lombok.Data;

@Data
public class GuestDTO {
    private String userName;
    private String userPhone;

    @Builder
    public GuestDTO(User guest) {
        this.userName = guest.getName();
        this.userPhone = guest.getPhoneNumber();
    }
}
