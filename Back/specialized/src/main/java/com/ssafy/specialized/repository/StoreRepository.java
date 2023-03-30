package com.ssafy.specialized.repository;

import com.ssafy.specialized.domain.entity.Store;
import com.ssafy.specialized.domain.graphql.output.NearbyStoreOutput;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface StoreRepository extends JpaRepository<Store, Integer> {
    Optional<Store> findById(int id);

    List<Store> findAllByName(String name);

    List<Store> findAllBySubcategory(int subcategory);


    //    @Query("select s from Store s " +
//            "where (s.mainCategory.idx in(:mainCategoryArr) or s.subcategory.idx in (:subcategoryArr)) and SQRT((s.latitude - :x) * (s.latitude - :x) + (s.longitude - :y) * (s.longitude - :y)) < :maxDist " +
//            "order by SQRT((s.latitude - :x) * (s.latitude - :x) + (s.longitude - :y) * (s.longitude - :y)) desc")
    @Query(value = "SELECT *" +
            ", (select SQRT((latitude - :x) * (latitude - :x) + (longitude - :y) * (longitude - :y))) as DISTANCE" +
            ", (select exists(select * from bookmark where bookmark.store_idx = store.idx and user_idx = :userIdx)) as bookmark " +
            "from store LEFT JOIN (SELECT review.store_idx AS id, COUNT(*) as reviewCount, AVG(rating) as avgRating FROM review GROUP BY review.store_idx) as reviewData ON reviewData.id = store.idx " +
            "HAVING (main_category_idx in(:mainCategoryArr) or subcategory_idx in(:subcategoryArr)) and distance < :maxDist " +
            "order by distance", nativeQuery = true)
    List<NearbyStoreOutput> getNearbyStoreList(@Param("mainCategoryArr") List<Integer> mainCategoryArr, @Param("subcategoryArr") List<Integer> subcategoryArr, @Param("x") float x, @Param("y") float y, @Param("maxDist") double maxDist, @Param("userIdx") int userIndex);

//    @Query("SELECT s" +
//            ", (select SQRT((latitude - :x) * (latitude - :x) + (longitude - :y) * (longitude - :y))) as DISTANCE" +
//            ", (select exists(select b from bookmark b where b.store_idx = store.idx and user_idx = :userIdx)) as bookmark " +
//            "from store s LEFT JOIN (SELECT review.store_idx AS id, COUNT(*), AVG(rating) FROM review r GROUP BY r.store_idx) as reviewData ON reviewData.id = s.idx " +
//            "HAVING (main_category_idx in(:mainCategoryArr) or subcategory_idx in(:subcategoryArr)) and distance < :maxDist " +
//            "order by distance")

//    @Query("SELECT *, (select SQRT((latitude - 4) * (latitude - 4) + (longitude - 4) * (longitude - 4))) as DISTANCE, (select exists(select * from bookmark where bookmark.store_idx = store.idx and user_idx = 1)) as bookmark from store LEFT JOIN (SELECT r.store_idx AS id, COUNT(*), AVG(rating) FROM review r GROUP BY r.store_idx) as reviewData ON reviewData.id = store.idx HAVING (main_category_idx in(3) or subcategory_idx in(2,3)) and distance < 1000 order by distance")
//    @Query("SELECT idx, name, address, latitude, longitude, explanation, contact_number, images_url, homepage, main_category_idx, subcategory_idx, is_closed_on_holidays, owner_idx, (select SQRT((latitude - :x) * (latitude - :x) + (longitude - :y) * (longitude - :y))) as DISTANCE, (select exists(select idx, store_idx, user_idx from bookmark where bookmark.store_idx = store.idx and user_idx = :userIdx)) as bookmark from store LEFT JOIN (SELECT review.store_idx AS id, COUNT(*), AVG(rating) FROM review GROUP BY review.store_idx) as reviewData ON reviewData.id = store.idx HAVING (main_category_idx in(:mainCategoryArr) or subcategory_idx in(:subcategoryArr)) and distance < :maxDist order by distance")


    @Query("select s from Store s " +
            "where SQRT((s.latitude - :x) * (s.latitude - :x) + (s.longitude - :y) * (s.longitude - :y)) < :maxDist " +
            "order by SQRT((s.latitude - :x) * (s.latitude - :x) + (s.longitude - :y) * (s.longitude - :y)) desc")
    List<NearbyStoreOutput> getStoreListByPosition(@Param("x") float x, @Param("y") float y, @Param("maxDist") double maxDist);

////
//    @Query("select s from Store s where (s.main_category_idx in(:mainCategoryArr) or s.subcategory_idx in (:subcategoryArr)) and SQRT(abs((s.latitude - :x) * (s.latitude - :x) + (s.longitude - :y) * (s.longitude - :y))) < :maxDist order by SQRT(abs((s.latitude - :x) * (s.latitude - :x) + (s.longitude - :y) * (s.longitude - :y))) desc")
//    List<Store> getNearbyStoreList(@Param("mainCategoryArr") List<Integer> mainCategoryArr, @Param("subcategoryArr") List<Integer> subcategoryArr, @Param("x") float x, @Param("y") float y, @Param("maxDist") int maxDist);
//

//    @Query(value = "select * from Store where (main_category_idx in(1?) or subcategory_idx in (2?)) and SQRT(abs((latitude - 3?) * (latitude - 3?) + (longitude - 4?) * (longitude - 4?))) < 5? order by SQRT(abs((latitude - 3?) * (latitude - 3?) + (longitude - 4?) * (longitude - 4?))) desc", nativeQuery = true)
//    List<Store> getNearbyStoreList(List<Integer> mainCategoryArr, List<Integer> subcategoryArr, float x, float y,int maxDist);
//
//
//    @Query(value = "select * from Store where (main_category_idx in(1?) or subcategory_idx in (2?)) and SQRT(abs((latitude - 3?) * (latitude - 3?) + (longitude - 4?) * (longitude - 4?))) < 5? order by SQRT(abs((latitude - 3?) * (latitude - 3?) + (longitude - 4?) * (longitude - 4?))) desc", nativeQuery = true)
//    List<Store> get(List<Integer> mainCategoryArr, List<Integer> subcategoryArr, float x, float y, int maxDist);
//
//
//    @Query(value = "select * from Store where (main_category_idx in(:mainCategoryArr) or subcategory_idx in (:subcategoryArr)) and SQRT(abs((latitude - :x) * (latitude - :x) + (longitude - :y) * (longitude - :y))) < :maxDist order by SQRT(abs((latitude - :x) * (latitude - :x) + (longitude - :y) * (longitude - :y))) desc", nativeQuery = true)
//    List<Store> get(List<Integer> mainCategoryArr, List<Integer> subcategoryArr, float x, float y, int maxDist);
//

//    @Query(value = "select * from store where (main_category_idx in(:mainCategoryArr) or subcategory_idx in (:subcategoryArr)) and SQRT(abs((latitude - :x) * (latitude - :x) + (longitude - :y) * (longitude - :y))) < :maxDist order by SQRT(abs((latitude - :x) * (latitude - :x) + (longitude - :y) * (longitude - :y))) desc", nativeQuery = true)
//    List<Store> get(@Param("mainCategoryArr") List<Integer> mainCategoryArr, @Param("subcategoryArr") List<Integer> subcategoryArr, @Param("x") float x, @Param("y") float y, @Param("maxDist") int maxDist);


//    @Query(value = "select * from Store where (main_category_idx in(0?) or subcategory_idx in (1?)) and SQRT(abs((latitude - 2?) * (latitude - 2?) + (longitude - 3?) * (longitude - 3?))) < 4? order by SQRT(abs((latitude - 2?) * (latitude - 2?) + (longitude - 3?) * (longitude - 3?))) desc", nativeQuery = true)
//    List<Store> getNearbyStoreList(List<Integer> mainCategoryArr, List<Integer> subcategoryArr, float x, float y, int maxDist);
//    @Query(value = "select * from Store where (main_category_idx in(0?) or subcategory_idx in (1?)) and SQRT(abs((latitude - 2?) * (latitude - 3?) + (longitude - 6?) * (longitude - 7?))) < 10? order by SQRT(abs((latitude - 4?) * (latitude - 5?) + (longitude - 8?) * (longitude - 9?))) desc", nativeQuery = true)
//    List<Store> getNearbyStoreList(List<Integer> mainCategoryArr, List<Integer> subcategoryArr, float x1, float x2, float x3, float x4, float y1, float y2, float y3, float y4, int maxDist);
//    @Query(value = "select * from Store where (main_category_idx in(1?) or subcategory_idx in (2?)) and SQRT(abs((latitude - 3?) * (latitude - 4?) + (longitude - 7?) * (longitude - 8?))) < 11? order by SQRT(abs((latitude - 5?) * (latitude - 6?) + (longitude - 9?) * (longitude - 10?))) desc", nativeQuery = true)
//    List<Store> getNearbyStoreList(List<Integer> mainCategoryArr, List<Integer> subcategoryArr, float x1, float x2, float x3, float x4, float y1, float y2, float y3, float y4, int maxDist);


//    @Query("select s from Store s where (s.main_category_idx in(:mainCategoryArr) or s.subcategory_idx in (:subcategoryArr)) and SQRT(abs((s.latitude - :x) * (s.latitude - :x) + (s.longitude - :y) * (s.longitude - :y))) < :maxDist order by SQRT(abs((s.latitude - :x) * (s.latitude - :x) + (s.longitude - :y) * (s.longitude - :y))) desc")
//    List<Store> getNearbyStoreList(@Param("mainCategoryArr") String mainCategoryArr, @Param("subcategoryArr") String subcategoryArr, @Param("x") String x, @Param("y") String y, @Param("maxDist") String maxDist);

//    @Query("SELECT f FROM Finance f WHERE f.rptYear = :year AND f.rptMonth IN (:months) and f.corName =:corName")
//    Optional<Finance> findByRptYearAndRptMonthAndCorName(@Param("year") Integer year, @Param("months") List<Integer> months,
//                                                         @Param("corName") String corName);

//
//    @Query("select * from store where (main_category_idx in(1?) or subcategory_idx in (2?)) and SQRT(abs((latitude - 3?) * (latitude - 3?) + (longitude - 4?) * (longitude - 4?))) < 5? order by SQRT(abs((latitude - 3?) * (latitude - 3?) + (longitude - 4?) * (longitude - 4?))) desc;")
//    List<Store> getNearbyStoreList(String mainCategoryArr, String subcategoryArr, String x, String y, String maxDist);
//


}

