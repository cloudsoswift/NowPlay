package com.ssafy.specialized.repository;

import com.ssafy.specialized.domain.entity.HobbyMain;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface HobbyMainRepository extends JpaRepository<HobbyMain, Integer> {
}