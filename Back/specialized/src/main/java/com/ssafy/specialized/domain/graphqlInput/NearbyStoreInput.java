package com.ssafy.specialized.domain.graphqlInput;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class NearbyStoreInput {

    private List<String> mainHobby;

    private List<String> subcategory;

    private float latitude;

    private float longitude;

    private int maxDistance;

    private int count;

    public String inputIsNull() {
        return (mainHobby == null && subcategory == null) ? "(s.mainCategory.idx in(:mainCategoryArr) or s.subcategory.idx in (:subcategoryArr)) and " : "";
    }

}
