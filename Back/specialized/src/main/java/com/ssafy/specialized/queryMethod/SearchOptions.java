package com.ssafy.specialized.queryMethod;

import lombok.Data;
import org.springframework.util.CollectionUtils;

import java.util.List;

@Data
public class SearchOptions {
    private List<Long> companyIds;

    public int getCompanyIdsSize() {
        return companyIds == null || CollectionUtils.isEmpty(companyIds)
                ? 0 : companyIds.size();
    }

}