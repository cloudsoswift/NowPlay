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
    @JoinColumn(name = "reserver_idx")
    private User reserver;

    @ManyToOne
    @JoinColumn(name = "store_idx")
    private Store store;


    private LocalDateTime time;

    private LocalDateTime createdAt;

    //예약대기 = 0 확인 = 1 거절 = 2
    private int isConfirmed;

}
