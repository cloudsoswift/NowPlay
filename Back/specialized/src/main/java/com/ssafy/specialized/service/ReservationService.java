package com.ssafy.specialized.service;

import com.ssafy.specialized.domain.dto.reservation.ReservationDto;
import com.ssafy.specialized.domain.dto.reservation.ReservationRequestDto;

public interface ReservationService {
    // 예약 요청을 처리하는 메서드
    ReservationDto reserve(ReservationRequestDto reservationRequestDto);

    // 예약 정보를 조회하는 메서드
    ReservationDto getReservation(int reservationIdx);

    // 예약 정보를 수정하는 메서드
    ReservationDto updateReservation(int reservationIdx, ReservationRequestDto reservationRequestDto);

    // 예약 정보를 삭제하는 메서드
    void deleteReservation(int reservationIdx);
}
