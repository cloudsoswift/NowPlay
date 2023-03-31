package com.ssafy.specialized.repository;

import com.ssafy.specialized.domain.entity.HobbyMain;
import com.ssafy.specialized.domain.entity.HobbySubcategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface HobbySubcategoryRepository extends JpaRepository<HobbySubcategory, Integer> {
    Optional<HobbySubcategory> findBySubcategory(String subcategory);

    List<HobbySubcategory> findAllByMainCategory(HobbyMain hobbyMain);

    @Query("select h from HobbySubcategory h where h.subcategory in (:subcategories)")
    List<HobbySubcategory> findAllBySubcategories(@Param("subcategories") List<String> subcategories);
}