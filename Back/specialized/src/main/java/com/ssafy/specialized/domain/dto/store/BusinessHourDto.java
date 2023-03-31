package com.ssafy.specialized.domain.dto.store;

import lombok.Data;

import java.time.DayOfWeek;

@Data
public class BusinessHourDto {

    private String dayOfWeek;

    private String openAt;

    private String closeAt;

    private String reservationInterval;

    private boolean isDayOff;
}
