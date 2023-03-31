package com.ssafy.specialized.service;

import com.ssafy.specialized.common.security.SecurityUtil;
import com.ssafy.specialized.domain.dto.store.StoreDto;
import com.ssafy.specialized.domain.entity.Bookmark;
import com.ssafy.specialized.domain.entity.BusinessHour;
import com.ssafy.specialized.domain.entity.Store;
import com.ssafy.specialized.domain.entity.User;
import com.ssafy.specialized.repository.*;
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

    final BookmarkRepository bookmarkRepository;

    final UserRepository userRepository;

    @Override
    public StoreDto getStoreDetail(int Storeid) {
        String username = SecurityUtil.getLoginUsername();
        User user = userRepository.findByName(username);
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
        storeDto.setFaverite(bookmarkRepository.existsAllByStoreAndUser(store, user));
        return storeDto;
    }

    @Override
    public void bookMark(int storeid) {
        String username = SecurityUtil.getLoginUsername();
        User user = userRepository.findByName(username);
        Optional<Store> optStore = storeRepository.findById(storeid);
        Store store = null;
        if (optStore.isPresent()) {
            store = optStore.get();
        }
        Optional<Bookmark> optBookmark = bookmarkRepository.findAllByStoreAndUser(store, user);
        Bookmark bookmark = null;
        if (optBookmark.isPresent()){
            bookmark = optBookmark.get();
            bookmarkRepository.delete(bookmark);
        } else {
            Bookmark newBookmark = Bookmark.builder()
                    .user(user)
                    .store(store)
                    .build();
            bookmarkRepository.save(newBookmark);
        }
    }
}
