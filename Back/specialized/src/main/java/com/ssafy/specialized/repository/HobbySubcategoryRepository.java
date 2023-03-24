package com.ssafy.specialized.repository;

import com.ssafy.specialized.domain.entity.HobbyMain;
import com.ssafy.specialized.domain.entity.HobbySubcategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface HobbySubcategoryRepository extends JpaRepository<HobbySubcategory, Integer> {
    Optional<HobbySubcategory> findBySubcategory(String subcategory);

    List<HobbySubcategory> findAllByMainCategory(HobbyMain hobbyMain);
}