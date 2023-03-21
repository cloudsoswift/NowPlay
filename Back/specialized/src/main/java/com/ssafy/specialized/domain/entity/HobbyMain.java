package com.ssafy.specialized.domain.entity;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HobbyMain {

    @Id
    @GeneratedValue
    private int idx;

    private String mainCategory;

    private String mainImageUrl;

}
