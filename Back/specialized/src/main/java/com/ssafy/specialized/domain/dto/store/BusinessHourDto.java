package com.ssafy.specialized.domain.dto.store;

import lombok.Data;

import java.time.DayOfWeek;

@Data
public class BusinessHourDto {

    private String dayOfWeek;

    private String open;

    private String close;

    private String reservationInterval;

    private boolean storeHoliday;

    public boolean getStoreHoliday() {
        return storeHoliday;
    }
}
