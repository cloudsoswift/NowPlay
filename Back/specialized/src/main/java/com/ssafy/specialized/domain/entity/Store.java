package com.ssafy.specialized.domain.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Store {

    @Id
    @GeneratedValue
    private int idx;

    @OneToOne
    private User owner;

    @OneToOne
    private HobbyMain mainCategory;

    @OneToOne
    private HobbySubcategory subcategory;

    private String name;

    private String address;

    private String contactNumber;

    private String homepage;

    private String imagesUrl;

    private String explanation;

    private float latitude;

    private float longitude;

    private boolean isClosedOnHolidays;

}
