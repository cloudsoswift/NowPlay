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
import org.apache.kafka.clients.producer.KafkaProducer;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.apache.kafka.clients.producer.Producer;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.common.serialization.StringSerializer;

import java.util.Properties;

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
                .isConfirmed(0)
                .build();
        reservationRepository.save(reservation);

        // Kafka Producer 생성
        Properties props = new Properties();
        props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "j8d110.p.ssafy.io:9092");
        props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
        props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
        Producer<String, String> producer = new KafkaProducer<>(props);

        // 메시지 보내기
        String topicName = "test_topic";
        String message = "이거 새로 보내는 메시지 맞나요?";
        ProducerRecord<String, String> record = new ProducerRecord<>(topicName, message);
        producer.send(record);

        // Kafka Producer 종료
        producer.close();

        return new ReservationDto(
                reservation.getIdx(),
                reservation.getHistory(),
                reservation.getReserver().getIdx(),
                reservation.getStore().getIdx(),
                reservation.getTime(),
                reservation.getIsConfirmed(),
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
                        reservation.getIsConfirmed(),
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
                        reservation.getIsConfirmed(),
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

    @Override
    public ReservationDto confirmReservation(int reservationId) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new IllegalArgumentException("예약 정보가 없습니다."));

        reservation.setIsConfirmed(1);
        reservationRepository.save(reservation);

        return new ReservationDto(
                reservation.getIdx(),
                reservation.getHistory(),
                reservation.getReserver().getIdx(),
                reservation.getStore().getIdx(),
                reservation.getTime(),
                reservation.getIsConfirmed(),
                reservation.getCreatedAt()
        );
    }

    @Override
    public ReservationDto rejectReservation(int reservationId) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new IllegalArgumentException("예약 정보가 없습니다."));

        reservation.setIsConfirmed(2);
        reservationRepository.save(reservation);

        return new ReservationDto(
                reservation.getIdx(),
                reservation.getHistory(),
                reservation.getReserver().getIdx(),
                reservation.getStore().getIdx(),
                reservation.getTime(),
                reservation.getIsConfirmed(),
                reservation.getCreatedAt()
        );
    }
}
