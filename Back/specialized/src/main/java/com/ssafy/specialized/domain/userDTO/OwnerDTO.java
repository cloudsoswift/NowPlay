package com.ssafy.specialized.domain.userDTO;

import com.ssafy.specialized.domain.entity.User;
import lombok.Builder;
import lombok.Data;

@Data
public class OwnerDTO {
    private String userName;
    private String userPhone;
    private String userAddress;

    @Builder
    public OwnerDTO (User owner) {
        this.userName = owner.getUserName();
        this.userPhone = owner.getUserPhoneNumber();
        this.userAddress = owner.getUserAddress();
    }
}
