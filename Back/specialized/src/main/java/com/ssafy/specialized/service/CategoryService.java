package com.ssafy.specialized.service;

import com.ssafy.specialized.domain.dto.Hobby.HobbyDto;
import com.ssafy.specialized.domain.entity.HobbyMain;

import java.util.List;

public interface CategoryService {

    List<HobbyDto> getCategoryList();
}
