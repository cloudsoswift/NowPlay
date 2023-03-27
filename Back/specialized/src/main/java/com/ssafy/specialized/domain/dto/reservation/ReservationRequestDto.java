package com.ssafy.specialized.domain.dto.reservation;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReservationRequestDto {

    @NotNull(message = "예약자는 필수 입력값입니다.")
    private int reserverIdx;

    @NotNull(message = "가게는 필수 입력값입니다.")
    private int storeIdx;

    @NotBlank(message = "예약 내용은 필수 입력값입니다.")
    private String history;

    @NotNull(message = "예약 시간은 필수 입력값입니다.")
    private LocalDateTime time;

}