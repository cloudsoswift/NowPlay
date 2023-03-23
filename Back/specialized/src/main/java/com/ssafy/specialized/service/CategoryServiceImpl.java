package com.ssafy.specialized.service;

import com.ssafy.specialized.domain.dto.Hobby.HobbyDto;
import com.ssafy.specialized.domain.entity.HobbyMain;
import com.ssafy.specialized.repository.HobbyMainRepository;
import com.ssafy.specialized.repository.HobbySubcategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Slf4j
@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    private final HobbyMainRepository hobbyMainRepository;

    @Autowired
    private final HobbySubcategoryRepository hobbySubcategoryRepository;

    @Override
    public List<HobbyDto> getCategoryList() {
        List<HobbyMain> hobbyMainList = hobbyMainRepository.findAll();
        List<HobbyDto> list = new ArrayList<>();
        for(HobbyMain hobbyMain : hobbyMainList) {
            HobbyDto hobbyDto = new HobbyDto();
            hobbyDto.setIdx(hobbyMain.getIdx());
            hobbyDto.setMainCategory(hobbyMain.getMainCategory());
            hobbyDto.setMainImageUrl(hobbyMain.getMainImageUrl());
            hobbyDto.setSubcategories(hobbySubcategoryRepository.findAllByMainCategory(hobbyMain));
            list.add(hobbyDto);
        }
        return list;
    }
}
