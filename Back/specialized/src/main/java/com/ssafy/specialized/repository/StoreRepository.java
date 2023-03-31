package com.ssafy.specialized.repository;

import com.ssafy.specialized.domain.entity.Store;
import com.ssafy.specialized.domain.entity.User;
import com.ssafy.specialized.domain.mapping.NearbyStoreOutputInterface;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface StoreRepository extends JpaRepository<Store, Integer> {
    Optional<Store> findById(int id);
    List<Store> findAllByName(String name);

    List<Store> findAllBySubcategory(int subcategory);

    @Query(value = "SELECT *" +
            ", (select SQRT((latitude - :x) * (latitude - :x) + (longitude - :y) * (longitude - :y))) as DISTANCE" +
            ", (select exists(select * from bookmark where bookmark.store_idx = store.idx and user_idx = :userIdx)) as bookmark " +
            "from store LEFT JOIN (SELECT review.store_idx AS id, COUNT(*) as reviewCount, AVG(rating) as averageRating FROM review GROUP BY review.store_idx) as reviewData ON reviewData.id = store.idx " +
            "HAVING (main_category_idx in(:mainCategoryArr) or subcategory_idx in(:subcategoryArr)) and distance < :maxDist " +
            "order by distance", nativeQuery = true)
    List<NearbyStoreOutputInterface> getNearbyStoreList(@Param("mainCategoryArr") List<Integer> mainCategoryArr, @Param("subcategoryArr") List<Integer> subcategoryArr, @Param("x") float x, @Param("y") float y, @Param("maxDist") double maxDist, @Param("userIdx") int userIndex);


    @Query("select s from Store s " +
            "where SQRT((s.latitude - :x) * (s.latitude - :x) + (s.longitude - :y) * (s.longitude - :y)) < :maxDist " +
            "order by SQRT((s.latitude - :x) * (s.latitude - :x) + (s.longitude - :y) * (s.longitude - :y)) desc")
    List<NearbyStoreOutputInterface> getStoreListByPosition(@Param("x") float x, @Param("y") float y, @Param("maxDist") double maxDist);

    Optional<Store> findByOwner(User owner);
}