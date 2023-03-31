package com.ssafy.specialized.domain.graphql.output;

import com.ssafy.specialized.domain.entity.Store;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class NearbyStoreOutput {
    private Store store;
//    private int idx;
//    private String name;
//    private String subcategory;
//    private String address;
    private Float distance;
    private int reviewCount;
    private float averageRating;
    private Boolean isBookmark;
//    private String owner;
//    private String contactNumber;
//    private String homepage;
//    private String mainImagesUrl;
//    private List<String> imageUrls;
//    private String explanation;
//    private Float latitude;
//    private Float longitude;
//    private Boolean isClosedOnHolidays;
}
