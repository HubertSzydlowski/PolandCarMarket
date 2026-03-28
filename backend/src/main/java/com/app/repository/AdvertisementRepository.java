package com.app.repository;

import com.app.model.Advertisement;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdvertisementRepository extends JpaRepository<Advertisement, Long> {

    // Custom query method to find advertisements by user ID
    List<Advertisement> findByUserId(Long userId);

    // Custom query method to get a page of advertisements (with pagination)
    Page<Advertisement> findAll(Pageable pageable);
}