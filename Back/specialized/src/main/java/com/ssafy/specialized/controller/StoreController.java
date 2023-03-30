package com.ssafy.specialized.controller;


import com.ssafy.specialized.domain.graphql.output.NearbyStoreOutput;
import com.ssafy.specialized.domain.graphqlInput.NearbyStoreInput;
import com.ssafy.specialized.service.StoreService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Controller
@CrossOrigin
@RequestMapping("/places")
public class StoreController {

    @Autowired
    private StoreService storeService;

    //    @QueryMapping
//    public void getNearbyStoreList(@Argument NearbyStoreInput nearbyStoreInput) {
//        storeService.getNearbyStoreList(nearbyStoreInput);
//    }
    @QueryMapping
    public List<NearbyStoreOutput> getNearbyStoreList(@Argument NearbyStoreInput nearbyStoreInput) {
        return storeService.getNearbyStoreList(nearbyStoreInput);
    }

    //    @PostMapping("/nearby")
//    public List<Store> getNearbyStoreListRestfulApi(@RequestBody NearbyStoreInput nearbyStoreInput){
//        return storeService.getNearbyStoreList(nearbyStoreInput);
//    }
//    @PostMapping("/nearby")
//    public ResponseEntity<?> getNearbyStoreListRestfulApi(@RequestBody NearbyStoreInput nearbyStoreInput) {
//        List<Store> storeList = storeService.getNearbyStoreList(nearbyStoreInput);
//
////        return new ResponseEntity.ok();
//    }

//    @PostMapping("/category")
//    public List<Store> getStoreListByCategoryRestfulApi(@RequestBody NearbyStoreInput nearbyStoreInput) {
//        return storeService.getNearbyStoreList(nearbyStoreInput);
//    }
//
//    @PostMapping("/position")
//    public List<Store> getStoreListByPositionRestfulApi(@RequestBody NearbyStoreInput nearbyStoreInput) {
//        return storeService.getStoreListByPosition(nearbyStoreInput);
//    }
//    @PostMapping("/detail")
//    public List<Store> getStoreDetailRestfulApi(@RequestBody String name){
//        return storeService.getStoreDetail(name);
//    }
//    @PostMapping("/search")
//    public List<Store> getStoreListByNameRestfulApi(@RequestBody String name){
//        return storeService.searchStoreList(name);
//    }

//    @PostMapping("/nearby")
//    public void getNearbyStoreList(@RequestBody NearbyStoreInput nearbyStoreInput) {
//        storeService.getNearbyStoreList(nearbyStoreInput);
//    }

//
//    @QueryMapping
//    public void searchStore() {
//
//    }
//
//    @PostMapping
//    public void storeDetail() {
//
//    }


}
