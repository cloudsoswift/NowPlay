package com.ssafy.specialized.domain.entity;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Review {

    @Id
    @GeneratedValue
    private int idx;

    @ManyToOne
    private User writer;

    @ManyToOne
    private Store store;

    private String content;

    private float rating;

    private LocalDateTime createdAt;

    private boolean isHidden;

//    private String[] imagesUrl;

}
