package com.ssafy.specialized.controller;


import com.ssafy.specialized.service.StoreService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@Controller
//@RestController
@CrossOrigin
@RequestMapping("/places")
public class StoreController {

    @Autowired
    private StoreService storeService;

    @GetMapping("/categories")
    public void getAllExistingCategories(){
        storeService.getAllExistingCategories();
    }

    @PostMapping("/list")
    public void getNearbyStoreList(){

    }

    @PostMapping("search")
    public void searchStore(){

    }

    @PostMapping
    public void storeDetail(){
        
    }


}
