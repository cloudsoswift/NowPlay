package com.ssafy.specialized.domain.dto.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateUserHobbyRequestDto {
    private String[] hobbies;
}
