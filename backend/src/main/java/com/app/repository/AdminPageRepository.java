package com.app.repository;

import com.app.model.AdminPage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface AdminPageRepository extends JpaRepository<AdminPage, Long> {

    // Custom query method to find all admin stats between a start and end timestamp
    List<AdminPage> findAllByTimestampBetween(LocalDateTime start, LocalDateTime end);

    // Custom method to save admin statistics
    AdminPage save(AdminPage adminPage);
}
