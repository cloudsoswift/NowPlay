package com.ssafy.specialized.domain.userDTO;

import com.ssafy.specialized.domain.entity.User;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class FindIdDTO {
    private String userId;
    private String userName;

    @Builder
    public FindIdDTO(User user) {
        this.userId = user.getUserId();
    }
}
