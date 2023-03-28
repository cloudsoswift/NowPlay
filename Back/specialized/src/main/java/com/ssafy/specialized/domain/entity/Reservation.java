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
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private int idx;

    private String history;

    @ManyToOne
    private User reserver;

    @ManyToOne
    private Store store;


    private LocalDateTime time;

    private LocalDateTime createdAt;

    private boolean isConfirmed;

}
