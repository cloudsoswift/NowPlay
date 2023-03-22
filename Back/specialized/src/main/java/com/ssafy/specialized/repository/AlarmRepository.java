package com.ssafy.specialized.repository;

import com.ssafy.specialized.domain.entity.Alarm;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlarmRepository extends JpaRepository<Alarm, Integer> {
}