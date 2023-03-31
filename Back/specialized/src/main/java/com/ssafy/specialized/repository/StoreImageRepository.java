package com.ssafy.specialized.repository;

import com.ssafy.specialized.domain.entity.Review;
import com.ssafy.specialized.domain.entity.ReviewImage;
import com.ssafy.specialized.domain.entity.Store;
import com.ssafy.specialized.domain.entity.StoreImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StoreImageRepository extends JpaRepository<StoreImage, Integer> {

    List<StoreImage> findAllByStore(Store store);
}