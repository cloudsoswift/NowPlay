package com.ssafy.specialized.service;

import com.ssafy.specialized.domain.dto.reservation.ReservationDto;
import com.ssafy.specialized.domain.dto.reservation.ReservationRequestDto;
import com.ssafy.specialized.domain.entity.Reservation;
import com.ssafy.specialized.domain.entity.Store;
import com.ssafy.specialized.domain.entity.User;
import com.ssafy.specialized.repository.ReservationRepository;
import com.ssafy.specialized.repository.StoreRepository;
import com.ssafy.specialized.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ReservationServiceImpl implements ReservationService {

    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;
    private final StoreRepository storeRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public ReservationServiceImpl(ReservationRepository reservationRepository, UserRepository userRepository, StoreRepository storeRepository, ModelMapper modelMapper) {
        this.reservationRepository = reservationRepository;
        this.userRepository = userRepository;
        this.storeRepository = storeRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public ReservationDto reserve(ReservationRequestDto reservationRequestDto) {
        // 예약자, 가게 정보 가져오기
        User reserver = userRepository.findById(reservationRequestDto.getReserverIdx())
                .orElseThrow(() -> new IllegalArgumentException("예약자 정보가 없습니다."));
        Store store = storeRepository.findById(reservationRequestDto.getStoreIdx())
                .orElseThrow(() -> new IllegalArgumentException("가게 정보가 없습니다."));

        // 예약 정보 생성 및 저장
        Reservation reservation = modelMapper.map(reservationRequestDto, Reservation.class);
        reservation.setReserver(reserver);
        reservation.setStore(store);
        reservation.setCreatedAt(LocalDateTime.now());
        reservation.setConfirmed(false);
        reservationRepository.save(reservation);

        return modelMapper.map(reservation, ReservationDto.class);
    }

    @Override
    public ReservationDto getReservation(int reservationIdx) {
        Reservation reservation = reservationRepository.findById(reservationIdx)
                .orElseThrow(() -> new IllegalArgumentException("해당 예약 정보가 없습니다."));

        return modelMapper.map(reservation, ReservationDto.class);
    }

    @Override
    public ReservationDto updateReservation(int reservationIdx, ReservationRequestDto reservationRequestDto) {
        Reservation reservation = reservationRepository.findById(reservationIdx)
                .orElseThrow(() -> new IllegalArgumentException("해당 예약 정보가 없습니다."));

        // 예약 내용 업데이트
        reservation.setHistory(reservationRequestDto.getHistory());
        reservation.setTime(reservationRequestDto.getTime());

        reservationRepository.save(reservation);

        return modelMapper.map(reservation, ReservationDto.class);
    }

    @Override
    public void deleteReservation(int reservationIdx) {
        Reservation reservation = reservationRepository.findById(reservationIdx)
                .orElseThrow(() -> new IllegalArgumentException("해당 예약 정보가 없습니다."));

        reservationRepository.delete(reservation);
    }
}
