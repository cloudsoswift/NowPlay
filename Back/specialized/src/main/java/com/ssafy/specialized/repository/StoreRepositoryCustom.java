package com.ssafy.specialized.repository;

import com.ssafy.specialized.domain.graphql.output.NearbyStoreOutput;
import com.ssafy.specialized.domain.graphqlInput.NearbyStoreInput;

import java.util.List;

public interface StoreRepositoryCustom {
    List<NearbyStoreOutput> getNearbyStoreList(NearbyStoreInput nearbyStoreInput);
}
