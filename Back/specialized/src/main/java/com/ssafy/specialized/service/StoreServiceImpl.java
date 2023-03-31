package com.ssafy.specialized.service;

import com.ssafy.specialized.common.security.SecurityUtil;
import com.ssafy.specialized.domain.dto.store.StoreDto;
import com.ssafy.specialized.domain.entity.*;
import com.ssafy.specialized.domain.graphql.input.NearbyStoreInput;
import com.ssafy.specialized.domain.graphql.output.NearbyStoreOutput;
import com.ssafy.specialized.domain.graphql.output.NearbyStoreOutputWithTotalCount;
import com.ssafy.specialized.domain.mapping.NearbyStoreOutputInterface;
import com.ssafy.specialized.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class StoreServiceImpl implements StoreService {

    @Autowired
    private final StoreRepository storeRepository;

    @Autowired
    private final ReviewRepository reviewRepository;

    @Autowired
    private final BusinessHourRepository businessHourRepository;

    @Autowired
    private final BookmarkRepository bookmarkRepository;

    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final HobbyMainRepository hobbyMainRepository;

    @Autowired
    private final HobbySubcategoryRepository hobbySubcategoryRepository;
    @Autowired
    private UserHobbyRepository userHobbyRepository;

    @Override
    public StoreDto getStoreDetail(int Storeid) {
        System.out.println("2");
        String username = SecurityUtil.getLoginUsername();
        User user = userRepository.findByName(username);
        Optional<Store> optstore = storeRepository.findById(Storeid);
        Store store = null;
        if (optstore.isPresent()) {
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
        try {
            storeDto.setAverageRating(reviewRepository.findAvgByStore(Storeid));
        } catch (Exception e) {
        }
        storeDto.setFaverite(bookmarkRepository.existsAllByStoreAndUser(store, user));
        System.out.println("3");
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
        if (optBookmark.isPresent()) {
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

    public void getAllExistingCategories() {
        List<HobbyMain> mainList = hobbyMainRepository.findAll();
        for (int i = 0; i < mainList.size(); i++) {
            List<HobbySubcategory> subList = hobbySubcategoryRepository.findAllByMainCategory(mainList.get(i));
        }
    }

    @Override
    public NearbyStoreOutputWithTotalCount getNearbyStoreList(NearbyStoreInput nearbyStoreInput) {
        String name = SecurityUtil.getLoginUsername();
        User user = userRepository.findByName(name);

        List<Integer> subIndex = new ArrayList<>();
        boolean isEmpty = true;
        System.out.println(nearbyStoreInput);
        if (nearbyStoreInput.getSubcategory() != null && nearbyStoreInput.getSubcategory().size() != 0) {
            isEmpty = false;
            List<HobbySubcategory> subList = hobbySubcategoryRepository.findAllBySubcategories(nearbyStoreInput.getSubcategory());
            for (HobbySubcategory subcategory : subList) {
                subIndex.add(subcategory.getIdx());
            }
        }
        List<Integer> mainIndex = new ArrayList<>();
        if (nearbyStoreInput.getMainHobby() != null && nearbyStoreInput.getMainHobby().size() != 0) {
            isEmpty = false;
            List<HobbyMain> mainList = hobbyMainRepository.findAllByMains(nearbyStoreInput.getMainHobby());
            for (HobbyMain mainCategory : mainList) {
                mainIndex.add(mainCategory.getIdx());
            }
        }
        List<NearbyStoreOutputInterface> storeList = null;
        if (isEmpty) {
            storeList = storeRepository.getStoreListByPosition(nearbyStoreInput.getLatitude(), nearbyStoreInput.getLongitude(), nearbyStoreInput.getMaxDistance());
        } else {
            storeList = storeRepository.getNearbyStoreList(mainIndex, subIndex, nearbyStoreInput.getLatitude(), nearbyStoreInput.getLongitude(), nearbyStoreInput.getMaxDistance(), 1);
        }
        int i = (nearbyStoreInput.getCount() - 1) * 20;
        int j = i + 19;
        List<NearbyStoreOutput> retrieveList = new ArrayList<>();
        while (storeList.size() > i && i <= j) {
            Store store = storeRepository.findById(storeList.get(i).getIdx()).get();
            List<Review> reviewList = reviewRepository.findAllByStore(store);
            float ratings = 0;
            int reviewCount = reviewList.size();
            for (Review review : reviewList) {
                ratings += review.getRating();
            }
            NearbyStoreOutput nearbyStoreOutput = new NearbyStoreOutput();
            nearbyStoreOutput.setStore(store);
            if (reviewCount == 0) {
                nearbyStoreOutput.setAverageRating(0);
            } else {
                nearbyStoreOutput.setAverageRating(ratings / reviewCount);
            }
            nearbyStoreOutput.setDistance((float) storeList.get(i).getDistance());
            if (user == null) {
                nearbyStoreOutput.setIsBookmark(false);
            } else {
                Optional<Bookmark> optionalBookmark = bookmarkRepository.findByUser(user);
                if (optionalBookmark.isPresent()) {
                    nearbyStoreOutput.setIsBookmark(true);
                }
            }
            nearbyStoreOutput.setReviewCount(reviewCount);
            retrieveList.add(nearbyStoreOutput);
            i++;
        }

        NearbyStoreOutputWithTotalCount nearbyStoreOutputWithTotalCount = new NearbyStoreOutputWithTotalCount();
        nearbyStoreOutputWithTotalCount.setStoreOutput(retrieveList);
        nearbyStoreOutputWithTotalCount.setTotalCount(storeList.size());
        return nearbyStoreOutputWithTotalCount;
    }

    @Override
    public List<Store> getStoreListByCategory(NearbyStoreInput nearbyStoreInput) {
        String name = SecurityUtil.getLoginUsername();
        User user = userRepository.findByName(name);
        List<UserHobby> userHobbyList = userHobbyRepository.findAllByUser(user);
        for (UserHobby userHobby : userHobbyList) {
            nearbyStoreInput.getSubcategory().add(userHobby.getSubcategory().getSubcategory());
        }

//        nearbyStoreInput.set
        return null;
    }

    @Override
    public List<NearbyStoreOutput> getStoreListByPosition(NearbyStoreInput nearbyStoreInput) {
//        List<NearbyStoreOutput> storeList = storeRepository.getStoreListByPosition(nearbyStoreInput.getLatitude(), nearbyStoreInput.getLongitude(), nearbyStoreInput.getMaxDistance());
        return null;
//        return storeList;
    }

    @Override
    public NearbyStoreOutputWithTotalCount searchStore(String searchInput, int count, float lat, float lon) {
        String name = SecurityUtil.getLoginUsername();
        User user = userRepository.findByName(name);

        List<NearbyStoreOutputInterface> storeList = storeRepository.findAllByNameQuery(searchInput, lat, lon, 1);;
        int i = (count - 1) * 20;
        int j = i + 19;
        List<NearbyStoreOutput> retrieveList = new ArrayList<>();
        while (storeList.size() > i && i <= j) {
            Store store = storeRepository.findById(storeList.get(i).getIdx()).get();
            List<Review> reviewList = reviewRepository.findAllByStore(store);
            float ratings = 0;
            int reviewCount = reviewList.size();
            for (Review review : reviewList) {
                ratings += review.getRating();
            }
            NearbyStoreOutput nearbyStoreOutput = new NearbyStoreOutput();
            nearbyStoreOutput.setStore(store);
            if (reviewCount == 0) {
                nearbyStoreOutput.setAverageRating(0);
            } else {
                nearbyStoreOutput.setAverageRating(ratings / reviewCount);
            }
            nearbyStoreOutput.setDistance((float) storeList.get(i).getDistance());
            if (user == null) {
                nearbyStoreOutput.setIsBookmark(false);
            } else {
                Optional<Bookmark> optionalBookmark = bookmarkRepository.findByUser(user);
                if (optionalBookmark.isPresent()) {
                    nearbyStoreOutput.setIsBookmark(true);
                }
            }
            nearbyStoreOutput.setReviewCount(reviewCount);
            retrieveList.add(nearbyStoreOutput);
            i++;
        }

        NearbyStoreOutputWithTotalCount nearbyStoreOutputWithTotalCount = new NearbyStoreOutputWithTotalCount();
        nearbyStoreOutputWithTotalCount.setStoreOutput(retrieveList);
        nearbyStoreOutputWithTotalCount.setTotalCount(storeList.size());
        return nearbyStoreOutputWithTotalCount;
    }

    @Override
    public List<NearbyStoreOutput> storeRecommendationByCoordinate(float lat, float lon) {
        String name = SecurityUtil.getLoginUsername();
        User user = userRepository.findByName(name);

        List<NearbyStoreOutputInterface> storeList = storeRepository.findAllByCoordinateQuery(lat, lon, 1);;
        int i = 0;
        int j = 9;
        List<NearbyStoreOutput> retrieveList = new ArrayList<>();
        while (storeList.size() > i && i <= j) {
            Store store = storeRepository.findById(storeList.get(i).getIdx()).get();
            List<Review> reviewList = reviewRepository.findAllByStore(store);
            float ratings = 0;
            int reviewCount = reviewList.size();
            for (Review review : reviewList) {
                ratings += review.getRating();
            }
            NearbyStoreOutput nearbyStoreOutput = new NearbyStoreOutput();
            nearbyStoreOutput.setStore(store);
            if (reviewCount == 0) {
                nearbyStoreOutput.setAverageRating(0);
            } else {
                nearbyStoreOutput.setAverageRating(ratings / reviewCount);
            }
            nearbyStoreOutput.setDistance((float) storeList.get(i).getDistance());
            if (user == null) {
                nearbyStoreOutput.setIsBookmark(false);
            } else {
                Optional<Bookmark> optionalBookmark = bookmarkRepository.findByUser(user);
                if (optionalBookmark.isPresent()) {
                    nearbyStoreOutput.setIsBookmark(true);
                }
            }
            nearbyStoreOutput.setReviewCount(reviewCount);
            retrieveList.add(nearbyStoreOutput);
            i++;
        }
        return retrieveList;
    }
}
