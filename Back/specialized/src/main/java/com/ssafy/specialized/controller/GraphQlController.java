package com.ssafy.specialized.controller;

import com.ssafy.specialized.domain.graphql.input.NearbyStoreInput;
import com.ssafy.specialized.domain.graphql.output.NearbyStoreOutput;
import com.ssafy.specialized.domain.graphql.output.NearbyStoreOutputWithTotalCount;
import com.ssafy.specialized.service.StoreService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@CrossOrigin(origins = {"https://j8d110.p.ssafy.io", "http://127.0.0.1:5173", "http://localhost:5173", "http://172.30.1.95"}, allowCredentials = "true")
@RequestMapping("/graphql")
public class GraphQlController {

    @Autowired
    private final StoreService storeService;

    @QueryMapping
    public NearbyStoreOutputWithTotalCount getNearbyStoreList(@Argument NearbyStoreInput nearbyStoreInput) {
        return storeService.getNearbyStoreList(nearbyStoreInput);
    }

    @QueryMapping
    public NearbyStoreOutputWithTotalCount searchStore(@Argument String searchInput, @Argument int count, @Argument float lat, @Argument float lon) {
        return storeService.searchStore(searchInput, count, lat, lon);
    }

    @QueryMapping
    public List<NearbyStoreOutput> storeRecommendationByCoordinate(@Argument float lat, @Argument float lon) {
        return storeService.storeRecommendationByCoordinate(lat, lon);
    }

}
