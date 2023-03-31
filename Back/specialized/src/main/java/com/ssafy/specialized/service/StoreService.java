package com.ssafy.specialized.service;

import com.ssafy.specialized.domain.dto.store.StoreDto;
import com.ssafy.specialized.domain.entity.Store;
import com.ssafy.specialized.domain.graphql.input.NearbyStoreInput;
import com.ssafy.specialized.domain.graphql.output.NearbyStoreOutput;
import com.ssafy.specialized.domain.graphql.output.NearbyStoreOutputWithTotalCount;

import java.util.List;

public interface StoreService {

    StoreDto getStoreDetail(int Storeid);

    void bookMark(int storeid);

    void getAllExistingCategories();

    NearbyStoreOutputWithTotalCount getNearbyStoreList(NearbyStoreInput nearbyStoreInput);

    List<Store> getStoreListByCategory(NearbyStoreInput nearbyStoreInput);
    List<NearbyStoreOutput> getStoreListByPosition(NearbyStoreInput nearbyStoreInput);

    List<NearbyStoreOutput> searchStore(String searchInput, int count);
}
