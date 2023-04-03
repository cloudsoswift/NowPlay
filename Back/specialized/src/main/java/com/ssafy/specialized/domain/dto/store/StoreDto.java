package com.ssafy.specialized.domain.dto.store;

import com.ssafy.specialized.domain.entity.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StoreDto {

    private int idx;

    private User owner;

    private HobbyMain mainCategory;

    private HobbySubcategory subcategory;

    private String name;

    private String address;

    private String contactNumber;

    private String homepage;

    private String imagesUrl;

    private String explanation;

    private float latitude;

    private float longitude;

    private boolean isClosedOnHolidays;

    private List<BusinessHour> businessHourList;

    private List<String> storeImageList;

    private float averageRating;

    private boolean isFaverite;
}
