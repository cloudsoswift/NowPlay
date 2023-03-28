package com.ssafy.specialized.domain.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserHobby {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private int idx;

    @ManyToOne
    private User user;

    @ManyToOne
    private HobbyMain mainCategory;

    @ManyToOne
    private HobbySubcategory subcategory;

}
