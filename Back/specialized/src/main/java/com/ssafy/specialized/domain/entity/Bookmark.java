package com.ssafy.specialized.domain.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Bookmark {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private int idx;

    @ManyToOne
    private User user;

    @ManyToOne
    private Store store;

}
