package com.ssafy.specialized.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.specialized.domain.entity.QBookmark;
import com.ssafy.specialized.domain.entity.QStore;
import com.ssafy.specialized.domain.graphql.output.NearbyStoreOutput;
import com.ssafy.specialized.domain.graphqlInput.NearbyStoreInput;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class StoreRepositoryCustomImpl implements StoreRepositoryCustom {
    private final JPAQueryFactory jpaQueryFactory;

    public StoreRepositoryCustomImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    @Override
    public List<NearbyStoreOutput> getNearbyStoreList(NearbyStoreInput nearbyStoreInput) {
        QStore s = new QStore("s");
        QBookmark b = new QBookmark("b");
//        return jpaQueryFactory.select(
//                Projections.bean(NearbyStoreOutput.class, s.idx, s.name, s.subcategory.subcategory,
//                        s.address, s.owner, s.contactNumber, s.homepage, s.imagesUrl, s.explanation,
//                        s.latitude, s.longitude, s.isClosedOnHolidays,
//                        JPAExpressions.select(s.latitude.subtract(nearbyStoreInput.getLatitude())
//                                .multiply(s.latitude.subtract(nearbyStoreInput.getLatitude()))
//                                .add(s.longitude.subtract(nearbyStoreInput.getLongitude())
//                                .multiply(s.longitude.subtract(nearbyStoreInput.getLongitude())))
//                                .sqrt().as("distance")), JPAExpressions.selectFrom(b).where(s.eq(b.store)).exists().as("bookmark")
//                )).;
        return null;
    }
}
