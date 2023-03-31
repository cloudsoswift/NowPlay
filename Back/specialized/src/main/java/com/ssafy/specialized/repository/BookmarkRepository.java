package com.ssafy.specialized.repository;

import com.ssafy.specialized.domain.entity.Bookmark;
import com.ssafy.specialized.domain.entity.Store;
import com.ssafy.specialized.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookmarkRepository extends JpaRepository<Bookmark, Integer> {
    List<Bookmark> findAllByUser(User user);

    Optional<Bookmark> findAllByStoreAndUser(Store store, User user);

    Boolean existsAllByStoreAndUser(Store store, User user);
}