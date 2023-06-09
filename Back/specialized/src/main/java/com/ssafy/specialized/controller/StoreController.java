package com.ssafy.specialized.controller;

import com.ssafy.specialized.common.security.SecurityUtil;
import com.ssafy.specialized.domain.dto.review.ReviewDto;
import com.ssafy.specialized.domain.dto.store.UpdateStoreDto;
import com.ssafy.specialized.domain.graphql.input.NearbyStoreInput;
import com.ssafy.specialized.domain.graphql.output.NearbyStoreOutput;
import com.ssafy.specialized.domain.graphql.output.NearbyStoreOutputWithTotalCount;
import com.ssafy.specialized.service.StoreService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.sql.Update;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = {"https://j8d110.p.ssafy.io", "http://127.0.0.1:5173", "http://localhost:5173", "http://172.30.1.95"}, allowCredentials = "true")
@RequestMapping("/place")
public class StoreController {
    @Autowired
    private final StoreService storeService;

    @GetMapping("/{id}/store")
    public ResponseEntity<?> getStoreDetail(@PathVariable int id) throws Exception {
        return ResponseEntity.ok(storeService.getStoreDetail(id));
    }

    @PostMapping("/{id}/favorite")
    public ResponseEntity<?> bookMark(@PathVariable int id) throws Exception {
        storeService.bookMark(id);
        return ResponseEntity.ok(null);
    }

    @PostMapping(value = "/owners/{id}", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> updateStore(@PathVariable int id,
                                         @RequestPart (name = "UpdateStoreDto") UpdateStoreDto updateStoreDto,
                                         @RequestPart (name = "files", required = false) List<MultipartFile> multipartFile) throws Exception {
        List<MultipartFile> list = new ArrayList<>();
        if (multipartFile != null) {
            for (MultipartFile file : multipartFile) {
                list.add(file);
            }
            updateStoreDto.setMultipartFiles(list);
        }
        storeService.updateStore(id, updateStoreDto);

        return ResponseEntity.ok(null);
    }


//    @QueryMapping
//    public NearbyStoreOutputWithTotalCount getNearbyStoreList(@Argument NearbyStoreInput nearbyStoreInput) {
//        return storeService.getNearbyStoreList(nearbyStoreInput);
//    }
//
//    @QueryMapping
//    public NearbyStoreOutputWithTotalCount searchStore(@Argument String searchInput, @Argument int count, @Argument float lat, @Argument float lon) {
//        return storeService.searchStore(searchInput, count, lat, lon);
//    }
//
//    @QueryMapping
//    public List<NearbyStoreOutput> storeRecommendationByCoordinate(@Argument float lat, @Argument float lon){
//        return storeService.storeRecommendationByCoordinate(lat, lon);
//    }

}
