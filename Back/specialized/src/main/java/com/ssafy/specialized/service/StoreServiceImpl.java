package com.ssafy.specialized.service;

import com.ssafy.specialized.domain.entity.HobbyMain;
import com.ssafy.specialized.domain.entity.HobbySubcategory;
import com.ssafy.specialized.repository.HobbyMainRepository;
import com.ssafy.specialized.repository.HobbySubcategoryRepository;
import com.ssafy.specialized.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class StoreServiceImpl implements StoreService {

    @Autowired
    private final StoreRepository storeRepository;

//    @Autowired
//    private final StoreRepository storeRepository;

    @Autowired
    private final HobbySubcategoryRepository hobbySubcategoryRepository;
    @Autowired
    private final HobbyMainRepository hobbyMainRepository;

    @Override
    public void getAllExistingCategories() {
        List<HobbyMain> mainList = hobbyMainRepository.findAll();
        for (int i = 0; i < mainList.size(); i++) {
            List<HobbySubcategory> subList = hobbySubcategoryRepository.findAllByHobbyMain(mainList.get(i));
        }
    }
}
