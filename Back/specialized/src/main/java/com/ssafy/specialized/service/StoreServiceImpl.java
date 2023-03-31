package com.ssafy.specialized.service;

import com.ssafy.specialized.domain.dto.store.StoreDto;
import com.ssafy.specialized.domain.entity.Store;
import com.ssafy.specialized.repository.ReviewRepository;
import com.ssafy.specialized.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class StoreServiceImpl implements StoreService{

    final StoreRepository storeRepository;

    final ReviewRepository reviewRepository;

    @Override
    public StoreDto getStoreDetail(int Storeid) {
        Optional<Store> optstore = storeRepository.findById(Storeid);
        Store store

        return null;
    }
}
