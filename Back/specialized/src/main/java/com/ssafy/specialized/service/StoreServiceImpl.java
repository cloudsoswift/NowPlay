package com.ssafy.specialized.service;

import com.ssafy.specialized.domain.dto.store.StoreDto;
import com.ssafy.specialized.domain.entity.BusinessHour;
import com.ssafy.specialized.domain.entity.Store;
import com.ssafy.specialized.repository.BusinessHourRepository;
import com.ssafy.specialized.repository.ReviewRepository;
import com.ssafy.specialized.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class StoreServiceImpl implements StoreService{

    final StoreRepository storeRepository;

    final ReviewRepository reviewRepository;

    final BusinessHourRepository businessHourRepository;

    @Override
    public StoreDto getStoreDetail(int Storeid) {
        Optional<Store> optstore = storeRepository.findById(Storeid);
        Store store = null;
        if (optstore.isPresent()){
            store = optstore.get();
        }
        List<BusinessHour> businessHourList = businessHourRepository.findAllByStore(store);
        StoreDto storeDto = new StoreDto();
        storeDto.setIdx(store.getIdx());
        storeDto.setOwner(store.getOwner());
        storeDto.setMainCategory(store.getMainCategory());
        storeDto.setSubcategory(store.getSubcategory());
        storeDto.setName(store.getName());
        storeDto.setAddress(store.getAddress());
        storeDto.setContactNumber(store.getContactNumber());
        storeDto.setHomepage(store.getHomepage());
        storeDto.setImagesUrl(store.getImagesUrl());
        storeDto.setExplanation(store.getExplanation());
        storeDto.setLatitude(store.getLatitude());
        storeDto.setLongitude(store.getLongitude());
        storeDto.setClosedOnHolidays(store.isClosedOnHolidays());
        storeDto.setBusinessHourList(businessHourList);
        storeDto.setAverageRating(reviewRepository.findAvgByStore(Storeid));

        return storeDto;
    }
}
