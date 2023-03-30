package com.ssafy.specialized.service;

import com.ssafy.specialized.domain.entity.Store;
import com.ssafy.specialized.domain.graphql.output.NearbyStoreOutput;
import com.ssafy.specialized.domain.graphqlInput.NearbyStoreInput;

import java.util.List;

public interface StoreService {
    void getAllExistingCategories();

    List<NearbyStoreOutput> getNearbyStoreList(NearbyStoreInput nearbyStoreInput);

    List<Store> getStoreListByCategory(NearbyStoreInput nearbyStoreInput);
    List<NearbyStoreOutput> getStoreListByPosition(NearbyStoreInput nearbyStoreInput);

}
