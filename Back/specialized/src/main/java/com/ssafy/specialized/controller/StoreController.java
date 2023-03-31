package com.ssafy.specialized.controller;

import com.ssafy.specialized.service.StoreService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = {"https://j8d110.p.ssafy.io", "http://127.0.0.1:5173", "http://localhost:5173", "http://172.30.1.95"}, allowCredentials = "true")
@RequestMapping("/store")
public class StoreController {
    @Autowired
    private final StoreService storeService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getStoreDetail(@PathVariable int id) throws Exception{
        return ResponseEntity.ok(storeService.getStoreDetail(id));
    }
}
