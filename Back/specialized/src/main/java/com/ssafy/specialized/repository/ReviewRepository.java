package com.ssafy.specialized.repository;

import com.ssafy.specialized.domain.entity.Review;
import com.ssafy.specialized.domain.entity.Store;
import com.ssafy.specialized.domain.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Integer> {

    List<Review> findAllByStore(Store store);

    @Query(value = "SELECT r, ri, oc FROM Review r LEFT JOIN FETCH ReviewImage ri on ri.review.idx = r.idx LEFT JOIN OwnerComment oc on oc.review.idx = r.idx WHERE r.store.idx = :storeid")
    Page<Object[]> findAllByStorePage(int storeid, Pageable pageable);

    @Query(value = "SELECT r, ri, oc FROM Review r LEFT JOIN FETCH ReviewImage ri on ri.review.idx = r.idx LEFT JOIN OwnerComment oc on oc.review.idx = r.idx WHERE r.writer.id = :userid")
    Page<Object[]> findAllByWriter(int userid, Pageable pageable);

    @Query(value = "SELECT avg(r.rating) FROM Review r WHERE r.store.idx = :storeid")
    float findAvgByStore(int storeid);
}
