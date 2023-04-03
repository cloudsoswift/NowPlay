package com.ssafy.specialized.service;

import com.amazonaws.SdkClientException;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.AmazonS3Exception;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.ssafy.specialized.common.security.SecurityUtil;
import com.ssafy.specialized.domain.dto.store.BusinessHourDto;
import com.ssafy.specialized.domain.dto.store.StoreDto;
import com.ssafy.specialized.domain.dto.store.UpdateStoreDto;
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
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
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
    @Autowired
    private StoreImageRepository storeImageRepository;
    final String endPoint = "https://kr.object.ncloudstorage.com";
    final String regionName = "kr-standard";
    final String accessKey = "ESCb1U9YUC1iPdriv1Qc";
    final String secretKey = "1M49n1x3q4COn0KtlZ2rKt63AQ4ermzvsCg9yk3l";

    // S3 client
    final AmazonS3 s3 = AmazonS3ClientBuilder.standard()
            .withEndpointConfiguration(new AwsClientBuilder.EndpointConfiguration(endPoint, regionName))
            .withCredentials(new AWSStaticCredentialsProvider(new BasicAWSCredentials(accessKey, secretKey)))
            .build();

    String bucketName = "d110/store";

    @Override
    public StoreDto getStoreDetail(int Storeid) {
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
    public void updateStore(int id, UpdateStoreDto updateStoreDto) throws Exception {
        String username = SecurityUtil.getLoginUsername();
        User user = userRepository.findByName(username);
        Optional<Store> optStore = storeRepository.findById(id);
        Store store = null;
        if (optStore.isPresent()) {
            store = optStore.get();
        }
        List<StoreImage> storeImageList = storeImageRepository.findAllByStore(store);
        for (StoreImage storeImage : storeImageList) {
            try {
                s3.deleteObject(bucketName, storeImage.getStoreImageFileName());
            } catch (AmazonS3Exception e) {
                e.printStackTrace();
            } catch (SdkClientException e) {
                e.printStackTrace();
            }
            storeImageRepository.delete(storeImage);
        }
        Optional<HobbyMain> optionalHobbyMain = hobbyMainRepository.findByMainCategory(updateStoreDto.getMainCategory());
        HobbyMain hobbyMain = null;
        if (optionalHobbyMain.isPresent()) {
            hobbyMain = optionalHobbyMain.get();
        }
        Optional<HobbySubcategory> optionalHobbySubcategory = hobbySubcategoryRepository.findBySubcategory(updateStoreDto.getSubcategory());
        HobbySubcategory hobbySubcategory = null;
        if (optionalHobbySubcategory.isPresent()) {
            hobbySubcategory = optionalHobbySubcategory.get();
        }
        store.setMainCategory(hobbyMain);
        store.setSubcategory(hobbySubcategory);
        store.setName(updateStoreDto.getName());
        store.setAddress(updateStoreDto.getAddress());
        store.setContactNumber(updateStoreDto.getContactNumber());
        store.setHomepage(updateStoreDto.getHomepage());
        store.setImagesUrl(updateStoreDto.getImagesUrl());
        store.setExplanation(updateStoreDto.getExplanation());
        store.setClosedOnHolidays(updateStoreDto.isClosedOnHolidays());

        if (updateStoreDto.getMultipartFiles().size() > 0) {
            MultipartFile newfile = updateStoreDto.getMultipartFiles().get(0);
            String neworiginalfileName = newfile.getOriginalFilename();
            String newName1 = username + store.getName() + neworiginalfileName;
            File dest1 = new File("/", newName1);
            newfile.transferTo(dest1);
            String newfilePath = "/" + newName1;
            try {
                s3.putObject(bucketName, newName1, new File(newfilePath));
                s3.setObjectAcl(bucketName, newName1, CannedAccessControlList.PublicReadWrite);
                System.out.format("Object %s has been created.\n", newName1);
                store.setImagesUrl("https://kr.object.ncloudstorage.com/d110/store/" + newName1);
            } catch (AmazonS3Exception e) {
                e.printStackTrace();
            } catch (SdkClientException e) {
                e.printStackTrace();
            }

            for (int i = 1; i < updateStoreDto.getMultipartFiles().size(); i++) {
                MultipartFile file = updateStoreDto.getMultipartFiles().get(i);
                String originalfileName = file.getOriginalFilename();
                String newName = username + store.getName() + originalfileName;
                File dest = new File("/", newName);
                file.transferTo(dest);
                String filePath = "/" + newName;
                try {
                    s3.putObject(bucketName, newName, new File(filePath));
                    s3.setObjectAcl(bucketName, newName, CannedAccessControlList.PublicRead);
                } catch (AmazonS3Exception e) {
                    e.printStackTrace();
                } catch (SdkClientException e) {
                    e.printStackTrace();
                }
                StoreImage storeImage = StoreImage.builder()
                        .store(store)
                        .storeImageUrl("https://kr.object.ncloudstorage.com/d110/store/" + newName)
                        .storeImageFileName(newName)
                        .build();
                storeImageRepository.save(storeImage);
            }
        }
        storeRepository.save(store);
        List<BusinessHour> businessHourList = businessHourRepository.findAllByStore(store);
        for (BusinessHour businessHour : businessHourList) {
            businessHourRepository.delete(businessHour);
        }
        for (BusinessHourDto businessHourDto : updateStoreDto.getBusinessHourDtoList()) {
            BusinessHour businessHour = BusinessHour.builder()
                    .store(store)
                    .dayOfWeek(businessHourDto.getDayOfWeek())
                    .openAt(businessHourDto.getOpen())
                    .closeAt(businessHourDto.getClose())
                    .reservationInterval(businessHourDto.getReservationInterval())
                    .isDayOff(businessHourDto.isStoreHoliday())
                    .build();
            businessHourRepository.save(businessHour);
        }
    }

    @Override
    public NearbyStoreOutputWithTotalCount searchStore(String searchInput, int count, float lat, float lon) {
        String name = SecurityUtil.getLoginUsername();
        User user = userRepository.findByName(name);

        List<NearbyStoreOutputInterface> storeList = storeRepository.findAllByNameQuery(searchInput, lat, lon, 1);
        ;
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

        List<NearbyStoreOutputInterface> storeList = storeRepository.findAllByCoordinateQuery(lat, lon, 1);
        ;
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
