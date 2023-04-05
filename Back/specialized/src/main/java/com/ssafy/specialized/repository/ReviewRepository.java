package com.ssafy.specialized.repository;

import com.ssafy.specialized.domain.entity.Review;
import com.ssafy.specialized.domain.entity.Store;
import com.ssafy.specialized.domain.entity.User;
import com.ssafy.specialized.domain.mapping.GetMyReviewsInterface;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Integer> {

    List<Review> findAllByStore(Store store);

    @Query(value = "SELECT r, ri, oc FROM Review r LEFT JOIN FETCH ReviewImage ri on ri.review.idx = r.idx LEFT JOIN OwnerComment oc on oc.review.idx = r.idx WHERE r.store.idx = :storeid")
    Page<Object[]> findAllByStorePage(int storeid, Pageable pageable);

//    @Query(value = "SELECT r, ri, oc FROM Review r LEFT JOIN FETCH ReviewImage ri on ri.review.idx = r.idx LEFT JOIN OwnerComment oc on oc.review.idx = r.idx WHERE r.writer.id = :userid")
//    @Query(value = "select r.idx, r.content as review_content, r.created_at as review_created_at, r.is_hidden, r.rating, r.store_idx, r.writer_idx, ri.idx as review_image_idx, ri.review_image_url, ri.review_image_file_name, oc.idx as owner_comment_idx, oc.content owner_comment_content, oc.created_at as owner_comment_created_at from review r left join review_image ri on ri.review_idx = r.idx left join owner_comment oc on oc.review_idx = r.idx where r.writer_idx = :userIdx",nativeQuery = true)
////    Page<Object[]> findAllByWriter(int userid, Pageable pageable);
//    List<GetMyReviewsInterface> findAllByWriter(@Param("userIdx") int userIdx);


    @Query(value = "SELECT * FROM review r WHERE r.writer_idx = :writerIdx ORDER BY r.created_at DESC;", nativeQuery = true)
    List<Review> findAllByWriter(@Param("writerIdx") int writerIdx);

    @Query(value = "SELECT avg(r.rating) FROM Review r WHERE r.store.idx = :storeid")
    float findAvgByStore(int storeid);
}
