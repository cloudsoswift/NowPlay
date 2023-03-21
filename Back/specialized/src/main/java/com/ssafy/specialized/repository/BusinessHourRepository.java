package com.ssafy.specialized.repository;

import com.ssafy.specialized.domain.entity.BusinessHour;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BusinessHourRepository extends JpaRepository<BusinessHour, Integer> {
}