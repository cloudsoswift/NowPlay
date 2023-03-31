package com.ssafy.specialized.repository;

import com.ssafy.specialized.domain.entity.BusinessHour;
import com.ssafy.specialized.domain.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BusinessHourRepository extends JpaRepository<BusinessHour, Integer> {

    List<BusinessHour> findAllByStore(Store store);
}