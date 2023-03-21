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
public class Reservation {

    @Id
    @GeneratedValue
    private int idx;

    @ManyToOne
    private User reserver;

    @ManyToOne
    private Store store;

    private String history;

    private LocalDateTime time;

    private LocalDateTime createdAt;

    private boolean isConfirmed;

}
