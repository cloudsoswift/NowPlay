package com.ssafy.specialized.service;

import com.ssafy.specialized.common.security.SecurityUtil;
import com.ssafy.specialized.domain.entity.*;
import com.ssafy.specialized.domain.graphql.output.NearbyStoreOutput;
import com.ssafy.specialized.domain.graphqlInput.NearbyStoreInput;
import com.ssafy.specialized.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final UserHobbyRepository userHobbyRepository;

    @Override
    public void getAllExistingCategories() {
        List<HobbyMain> mainList = hobbyMainRepository.findAll();
        for (int i = 0; i < mainList.size(); i++) {
            List<HobbySubcategory> subList = hobbySubcategoryRepository.findAllByMainCategory(mainList.get(i));
        }
    }

    @Override
    public List<NearbyStoreOutput> getNearbyStoreList(NearbyStoreInput nearbyStoreInput) {
        String name = SecurityUtil.getLoginUsername();
        User user = userRepository.findByName(name);
        List<NearbyStoreOutput> list = null;
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
//        List<Store> storeList = null;
//        if (isEmpty) {
//            storeList = storeRepository.getStoreListByPosition(nearbyStoreInput.getLatitude(), nearbyStoreInput.getLongitude(), nearbyStoreInput.getMaxDistance());
//        } else {
//            storeList = storeRepository.getNearbyStoreList(mainIndex, subIndex, nearbyStoreInput.getLatitude(), nearbyStoreInput.getLongitude(), nearbyStoreInput.getMaxDistance(), 1 );
//        }
        List<NearbyStoreOutput> storeList = null;
        if (isEmpty) {
            storeList = storeRepository.getStoreListByPosition(nearbyStoreInput.getLatitude(), nearbyStoreInput.getLongitude(), nearbyStoreInput.getMaxDistance());
        } else {
            storeList = storeRepository.getNearbyStoreList(mainIndex, subIndex, nearbyStoreInput.getLatitude(), nearbyStoreInput.getLongitude(), nearbyStoreInput.getMaxDistance(), 1 );
        }
        int i = (nearbyStoreInput.getCount() - 1) * 20;
        int j = i + 19;
        List<NearbyStoreOutput> retrieveList = new ArrayList<>();
        System.out.println("=========================================================================");
        System.out.println("getCount: " + nearbyStoreInput.getCount());
        System.out.println("i: " + i);
        System.out.println("j: " + j);
        System.out.println("size: " + storeList.size());
        System.out.println("toString: " + nearbyStoreInput.toString());
        System.out.println("=========================================================================");
        while (storeList.size() > i && i <= j) {
            retrieveList.add(storeList.get(i));
            i++;
        }
        return retrieveList;
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
        List<NearbyStoreOutput> storeList = storeRepository.getStoreListByPosition(nearbyStoreInput.getLatitude(), nearbyStoreInput.getLongitude(), nearbyStoreInput.getMaxDistance());
        return storeList;
    }
}
