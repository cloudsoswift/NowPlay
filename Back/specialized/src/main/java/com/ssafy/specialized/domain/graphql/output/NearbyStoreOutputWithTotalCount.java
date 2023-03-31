package com.ssafy.specialized.domain.graphql.output;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class NearbyStoreOutputWithTotalCount {
    List<NearbyStoreOutput> storeOutput;
    int totalCount;
}
