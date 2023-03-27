package com.ssafy.specialized.domain.dto.Hobby;

import com.ssafy.specialized.domain.entity.HobbySubcategory;
import lombok.Data;

import java.util.List;

@Data
public class HobbyDto {

    private int idx;

    private String mainCategory;

    private List<HobbySubcategory> subcategories;

    private String mainImageUrl;
}
