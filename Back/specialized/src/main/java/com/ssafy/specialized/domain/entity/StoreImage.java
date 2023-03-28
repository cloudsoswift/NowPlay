package com.ssafy.specialized.domain.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StoreImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private int idx;

    @ManyToOne
    private Store store;

    private String storeImageUrl;

}
