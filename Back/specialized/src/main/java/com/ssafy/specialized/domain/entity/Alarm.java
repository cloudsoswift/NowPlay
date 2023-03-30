package com.ssafy.specialized.domain.entity;

import com.ssafy.specialized.common.enums.AlarmType;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Alarm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private int idx;

    @ManyToOne
    private User sender;

    @ManyToOne
    private User reciever;

    @ManyToOne
    private Reservation reservation;

    private AlarmType type;

    private String content;

    private LocalDateTime createdAt;

    private boolean isConfirmed;

}
