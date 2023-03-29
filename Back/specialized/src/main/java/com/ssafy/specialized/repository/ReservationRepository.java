package com.ssafy.specialized.repository;

import com.ssafy.specialized.domain.entity.Reservation;
import com.ssafy.specialized.domain.entity.Store;
import com.ssafy.specialized.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Integer> {
    List<Reservation> findByReserver(User reserver);
    List<Reservation> findByStore(Store store);

    @Query("SELECT r FROM Reservation r WHERE r.store.idx = :storeIdx AND r.time >= :startDate AND r.time < :endDate")
    List<Reservation> findByStoreIdxAndStartDatetimeBetween(int storeIdx, LocalDateTime startDate, LocalDateTime endDate);


}