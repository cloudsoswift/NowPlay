package com.ssafy.specialized.domain.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OwnerComment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private int idx;

    @OneToOne
    private Review review;

    private LocalDateTime createdAt;

    private String content;

}
