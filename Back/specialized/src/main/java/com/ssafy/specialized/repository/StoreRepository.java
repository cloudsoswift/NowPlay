package com.ssafy.specialized.repository;

import com.ssafy.specialized.domain.entity.Store;
import com.ssafy.specialized.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StoreRepository extends JpaRepository<Store, Integer> {
    Optional<Store> findById(int id);
    List<Store> findAllByName(String name);

}