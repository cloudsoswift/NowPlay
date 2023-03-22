package com.ssafy.specialized.domain.entity;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SearchLog {

    @Id
    @GeneratedValue
    private int idx;

    private User user;

    private float latitude;

    private float longitude;

    private String address;

    private LocalDateTime createdAt;

    private boolean isActive;

}
