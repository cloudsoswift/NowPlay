package com.ssafy.specialized.service;

import com.ssafy.specialized.domain.dto.reservation.ReservationDto;
import com.ssafy.specialized.domain.dto.reservation.ReservationRequestDto;
import com.ssafy.specialized.domain.entity.Reservation;

import java.time.LocalDate;
import java.util.List;

public interface ReservationService {
    // 예약 요청을 처리하는 메서드

    ReservationDto createReservation(ReservationRequestDto reservationRequestDto);

    // 예약 정보를 조회하는 메서드
    Reservation getReservation(int reservationIdx);

    // 예약 정보를 삭제하는 메서드
    void deleteReservation(int reservationIdx);

    // 로그인한 사용자 기준 예약내역 불러오기
    List<ReservationDto> getReservationsForCurrentUser();

    // store 기준 예약 내역 불러오기
    List<ReservationDto> getReservationsByStore(int storeIdx);

    // 날짜 기준 예약 내역 불러오기
    List<ReservationDto> getReservationsByStoreAndDate(int storeIdx, LocalDate reservationDate);

}
