package com.ssafy.specialized.domain.mapping;

public interface NearbyStoreOutputInterface {
    int getIdx();
    String getName();
    String getAddress();
    float getLatitude();
    float getLongitude();
    String getExplanation();
    String getContactNumber();
    String getHomepage();
    Boolean getIsClosedOnHolidays();
    double getDistance();
}
//    String getOwner();
//    String getId();
//    boolean getBookmark();
//    int getReviewCount();
//    double getAverageRating();
//    String getImagesUrl();
//    String getMainCategory();
//    String getImageUrl();
//    String getSubcategory_Idx();
