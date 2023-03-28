package com.ssafy.specialized.repository;

import com.ssafy.specialized.domain.entity.Reservation;
import com.ssafy.specialized.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Integer> {
    List<Reservation> findByReserver(User reserver);
}