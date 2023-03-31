package com.ssafy.specialized.domain.dto.store;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class StoreImageDto {

    private MultipartFile multipartFile;
}
