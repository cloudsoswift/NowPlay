package com.ssafy.specialized.domain.dto.reservation;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReservationDto {

    private int idx;

    private int reserverIdx;

    private int storeIdx;

    private String history;

    private LocalDateTime time;

    private LocalDateTime createdAt;

    private boolean isConfirmed;

}
