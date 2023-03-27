package com.ssafy.specialized.controller;

import com.ssafy.specialized.domain.dto.reservation.ReservationDto;
import com.ssafy.specialized.domain.dto.reservation.ReservationRequestDto;
import com.ssafy.specialized.service.ReservationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/reservation")
public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PostMapping
    public ResponseEntity<ReservationDto> reserve(@Valid @RequestBody ReservationRequestDto reservationRequestDto) {
        ReservationDto reservationDto = reservationService.reserve(reservationRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(reservationDto);
    }

    @GetMapping("/{reservationIdx}")
    public ResponseEntity<ReservationDto> getReservation(@PathVariable int reservationIdx) {
        ReservationDto reservationDto = reservationService.getReservation(reservationIdx);
        return ResponseEntity.ok(reservationDto);
    }

    @PutMapping("/{reservationIdx}")
    public ResponseEntity<ReservationDto> updateReservation(@PathVariable int reservationIdx, @Valid @RequestBody ReservationRequestDto reservationRequestDto) {
        ReservationDto reservationDto = reservationService.updateReservation(reservationIdx, reservationRequestDto);
        return ResponseEntity.ok(reservationDto);
    }

    @DeleteMapping("/{reservationIdx}")
    public ResponseEntity<Void> deleteReservation(@PathVariable int reservationIdx) {
        reservationService.deleteReservation(reservationIdx);
        return ResponseEntity.noContent().build();
    }

}
