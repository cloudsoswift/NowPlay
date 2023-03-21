package com.ssafy.specialized.repository;

import com.ssafy.specialized.domain.entity.SearchLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SearchLogRepository extends JpaRepository<SearchLog, Integer> {
}