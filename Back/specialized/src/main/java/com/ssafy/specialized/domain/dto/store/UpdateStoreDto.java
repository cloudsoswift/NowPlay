package com.ssafy.specialized.domain.dto.store;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class UpdateStoreDto {

    private String mainCategory;

    private String subcategory;

    private String name;

    private String address;

    private String contactNumber;

    private String homepage;

    private String imagesUrl;

    private String explanation;

    private float latitude;

    private float longitude;

    private boolean isClosedOnHolidays;

    private List<BusinessHourDto> businessHourDtoList;

    private List<MultipartFile> multipartFiles;

}
