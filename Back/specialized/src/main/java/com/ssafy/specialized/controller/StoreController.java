package com.ssafy.specialized.controller;

import com.ssafy.specialized.domain.graphql.input.NearbyStoreInput;
import com.ssafy.specialized.domain.graphql.output.NearbyStoreOutput;
import com.ssafy.specialized.service.StoreService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<?> getStoreDetail(@PathVariable int id) throws Exception{
        System.out.println("1");
        return ResponseEntity.ok(storeService.getStoreDetail(id));
    }

        @PostMapping("/{id}/favorite")
    public ResponseEntity<?> bookMark(@PathVariable int id) throws Exception{
        storeService.bookMark(id);
        return ResponseEntity.ok(null);
    }

    @QueryMapping
    public List<NearbyStoreOutput> getNearbyStoreList(@Argument NearbyStoreInput nearbyStoreInput) {
        return storeService.getNearbyStoreList(nearbyStoreInput);
    }
}
