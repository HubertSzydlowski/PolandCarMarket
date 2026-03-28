package com.app.repository;

import com.app.model.Email;
import com.app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmailRepository extends JpaRepository<Email, Long> {

    // Custom query method to find an email token by its token and type
    Optional<Email> findByTokenAndTokenType(String token, Email.TokenType tokenType);

    // Custom query method to find an email token by user and type
    Optional<Email> findByUserAndTokenType(User user, Email.TokenType tokenType);
}
