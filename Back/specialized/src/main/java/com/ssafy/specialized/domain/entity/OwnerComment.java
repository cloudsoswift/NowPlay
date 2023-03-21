package com.ssafy.specialized.domain.entity;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OwnerComment {

    @Id
    @GeneratedValue
    private int idx;

    @OneToOne
    private Review review;

    private LocalDateTime createdAt;

    private String content;

}
