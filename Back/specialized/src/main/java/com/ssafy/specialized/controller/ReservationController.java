package com.ssafy.specialized.controller;

import com.ssafy.specialized.domain.dto.reservation.ReservationDto;
import com.ssafy.specialized.domain.dto.reservation.ReservationRequestDto;
import com.ssafy.specialized.domain.entity.Reservation;
import com.ssafy.specialized.service.ReservationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/reservation")
public class ReservationController {

    private final ReservationService reservationService;

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

    @DeleteMapping("/{reservationIdx}")
    public ResponseEntity<Void> deleteReservation(@PathVariable int reservationIdx) {
        reservationService.deleteReservation(reservationIdx);
        return ResponseEntity.noContent().build();
    }

}
