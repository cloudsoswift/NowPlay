package com.ssafy.specialized.service;

import com.ssafy.specialized.common.security.SecurityUtil;
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

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;

@Service
public class ReservationServiceImpl implements ReservationService {

    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;
    private final StoreRepository storeRepository;
    @Autowired
    private ModelMapper modelMapper;


    @Autowired
    public ReservationServiceImpl(ReservationRepository reservationRepository, UserRepository userRepository, StoreRepository storeRepository, ModelMapper modelMapper) {
        this.reservationRepository = reservationRepository;
        this.userRepository = userRepository;
        this.storeRepository = storeRepository;
    }
    @Override
    public ReservationDto createReservation(ReservationRequestDto reservationRequestDto) {
        int storeIdx = reservationRequestDto.getStoreIdx();
        String username = SecurityUtil.getLoginUsername();
        // 누가 로그인 했지?
        System.out.println(username);
        User reserver = userRepository.findByName(username);
        Store store = storeRepository.findById(storeIdx)
                .orElseThrow(() -> new IllegalArgumentException("가게 정보가 없습니다."));

        User storeOwner = store.getOwner();

        Reservation reservation = Reservation.builder()
                .reserver(reserver)
                .store(store)
                .history(reservationRequestDto.getHistory())
                .time(reservationRequestDto.getTime())
                .createdAt(LocalDateTime.now())
                .isConfirmed(false)
                .build();
        reservationRepository.save(reservation);

        // 예약 알림 메시지 생성 및 저장
//        String message = String.format("%s님이 %s에 예약 요청을 보냈습니다.", reserver.getName(), store.getName());
//        Notification reservationNotification = Notification.builder()
//                .user(storeOwner)
//                .message(message)
//                .link("/store/" + storeId + "/reservation")
//                .checked(false)
//                .createdAt(LocalDateTime.now())
//                .build();
//        notificationRepository.save(reservationNotification);

        return new ReservationDto(
                reservation.getIdx(),
                reservation.getHistory(),
                reservation.getReserver().getIdx(),
                reservation.getStore().getIdx(),
                reservation.getTime(),
                reservation.isConfirmed(),
                reservation.getCreatedAt()
        );
    }


    @Override
    public Reservation getReservation(int reservationIdx) {
        return reservationRepository.findById(reservationIdx)
                .orElseThrow(() -> new IllegalArgumentException("해당 예약 정보가 없습니다."));
    }

    @Override
    public void deleteReservation(int reservationIdx) {
        Reservation reservation = reservationRepository.findById(reservationIdx)
                .orElseThrow(() -> new IllegalArgumentException("해당 예약 정보가 없습니다."));

        reservationRepository.delete(reservation);
    }

    @Override
    public List<ReservationDto> getReservationsForCurrentUser() {
        String username = SecurityUtil.getLoginUsername();
        User reserver = userRepository.findByName(username);

        List<Reservation> reservations = reservationRepository.findByReserver(reserver);
        return reservations.stream()
                .map(reservation -> new ReservationDto(
                        reservation.getIdx(),
                        reservation.getHistory(),
                        reservation.getReserver().getIdx(),
                        reservation.getStore().getIdx(),
                        reservation.getTime(),
                        reservation.isConfirmed(),
                        reservation.getCreatedAt()
                ))
                .collect(Collectors.toList());
    }

    @Override
    public List<ReservationDto> getReservationsByStore(int storeIdx) {
        Store store = storeRepository.findById(storeIdx)
                .orElseThrow(() -> new IllegalArgumentException("가게 정보가 없습니다."));

        List<Reservation> reservations = reservationRepository.findByStore(store);
        return reservations.stream()
                .map(reservation -> new ReservationDto(
                        reservation.getIdx(),
                        reservation.getHistory(),
                        reservation.getReserver().getIdx(),
                        reservation.getStore().getIdx(),
                        reservation.getTime(),
                        reservation.isConfirmed(),
                        reservation.getCreatedAt()
                ))
                .collect(Collectors.toList());
    }

    @Override
    public List<ReservationDto> getReservationsByStoreAndDate(int storeIdx, LocalDate reservationDate) {
        LocalDateTime startOfDay = LocalDateTime.of(reservationDate, LocalTime.MIN);
        LocalDateTime endOfDay = LocalDateTime.of(reservationDate, LocalTime.MAX);
        List<Reservation> reservations = reservationRepository.findByStoreIdxAndStartDatetimeBetween(storeIdx, startOfDay, endOfDay);
        return reservations.stream()
                .map(reservation -> modelMapper.map(reservation, ReservationDto.class))
                .collect(Collectors.toList());
    }


}
