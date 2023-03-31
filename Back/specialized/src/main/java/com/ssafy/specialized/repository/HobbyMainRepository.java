package com.ssafy.specialized.repository;

import com.ssafy.specialized.domain.entity.HobbyMain;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface HobbyMainRepository extends JpaRepository<HobbyMain, Integer> {
    @Query("select h from HobbyMain h where h.mainCategory in (:mains)")
    List<HobbyMain> findAllByMains(@Param("mains") List<String> mains);

    Optional<HobbyMain> findByMainCategory(String name);
}