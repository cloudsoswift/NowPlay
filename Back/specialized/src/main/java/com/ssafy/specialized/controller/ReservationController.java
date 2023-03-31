package com.ssafy.specialized.controller;

import com.ssafy.specialized.domain.dto.reservation.ReservationDto;
import com.ssafy.specialized.domain.dto.reservation.ReservationRequestDto;
import com.ssafy.specialized.domain.entity.Reservation;
import com.ssafy.specialized.repository.ReservationRepository;
import com.ssafy.specialized.repository.StoreRepository;
import com.ssafy.specialized.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = {"https://j8d110.p.ssafy.io", "http://127.0.0.1:5173", "http://localhost:5173", "http://172.30.1.95"}, allowCredentials = "true")
@RequestMapping("/reservation")
public class ReservationController {

    private final ReservationService reservationService;

    @Autowired
    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping
    public ResponseEntity<ReservationDto> createReservation(@Valid @RequestBody ReservationRequestDto reservationRequestDto) {
        ReservationDto reservationDto = reservationService.createReservation(reservationRequestDto);
        System.out.println("여긴 나와?");
        return ResponseEntity.status(HttpStatus.CREATED).body(reservationDto);
    }

    @GetMapping("/{reservationIdx}")
    public ResponseEntity<Reservation> getReservation(@PathVariable int reservationIdx) {
        Reservation reservation = reservationService.getReservation(reservationIdx);
        return ResponseEntity.ok(reservation);
    }

    @GetMapping("/my")
    public ResponseEntity<List<ReservationDto>> getMyReservations() {
        List<ReservationDto> reservations = reservationService.getReservationsForCurrentUser();
        return ResponseEntity.ok(reservations);
    }

    @DeleteMapping("/{reservationIdx}")
    public ResponseEntity<Void> deleteReservation(@PathVariable int reservationIdx) {
        reservationService.deleteReservation(reservationIdx);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/store/{storeIdx}")
    public ResponseEntity<List<ReservationDto>> getReservationsByStore(@PathVariable int storeIdx) {
        List<ReservationDto> reservations = reservationService.getReservationsByStore(storeIdx);
        return ResponseEntity.ok(reservations);
    }

    @GetMapping("/store/{storeIdx}/date/{date}")
    public ResponseEntity<List<ReservationDto>> getReservationsByStoreAndDate(
            @PathVariable int storeIdx,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate reservationDate) {
        List<ReservationDto> reservations = reservationService.getReservationsByStoreAndDate(storeIdx, reservationDate);
        return ResponseEntity.ok(reservations);
    }
    @PutMapping("/{reservationId}/confirm")
    public ResponseEntity<ReservationDto> confirmReservation(@PathVariable("reservationId") int reservationId) {
        ReservationDto reservationDto = reservationService.confirmReservation(reservationId);
        return ResponseEntity.ok(reservationDto);
    }
}
