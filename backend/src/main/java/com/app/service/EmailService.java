package com.app.service;

import com.app.dto.EmailDto;
import com.app.model.Email;
import com.app.model.User;
import com.app.repository.EmailRepository;
import com.app.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    private final JavaMailSender mailSender;
    private final EmailRepository emailRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${frontend.url}")
    private String frontendUrl;

    public EmailService(JavaMailSender mailSender, EmailRepository emailRepository,
                        UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.mailSender = mailSender;
        this.emailRepository = emailRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Method to send verification email to the user
    public void sendVerificationEmail(User user) {
        logger.info("Starting to send verification email to user: {}", user.getEmail());

        Email token = Email.createVerificationToken(user);  // Create a verification token
        emailRepository.save(token);  // Save the token in the database
        logger.debug("Verification token created: {}", token.getToken());

        String url = frontendUrl + "/verify-email?token=" + token.getToken();  // Verification URL
        logger.debug("Verification URL: {}", url);

        sendEmail(user.getEmail(), "Account Activation", "Click to activate your account:\n" + url);  // Send the email
    }

    // Method to verify the email using a token
    public boolean verifyEmail(String token) {
        logger.info("Starting email verification for token: {}", token);
        return processToken(token, Email.TokenType.VERIFY_EMAIL, user -> {
            // Enable the user's account after successful verification
            user.setEnabled(true);
        });
    }

    // Method to send password reset email to the user
    public void sendResetPasswordEmail(User user) {
        logger.info("Starting to send password reset email to user: {}", user.getEmail());

        // Create a password reset token with an expiration time
        Email token = Email.createResetPasswordToken(user);
        emailRepository.save(token);
        logger.debug("Password reset token created: {}", token.getToken());

        String url = frontendUrl + "/reset-password?token=" + token.getToken();
        logger.debug("Password reset URL: {}", url);

        sendEmail(user.getEmail(), "Password Reset", "Click to reset your password:\n" + url);
    }

    // Method to reset the user's password
    public boolean resetPassword(EmailDto emailDto) {
        logger.info("Starting password reset for token: {}", emailDto.getToken());
        return processToken(emailDto.getToken(), Email.TokenType.RESET_PASSWORD,
                user -> user.setPassword(passwordEncoder.encode(emailDto.getNewPassword())));
    }

    // Token processing method: checks validity and executes the action
    private boolean processToken(String token, Email.TokenType expectedType, TokenAction action) {
        logger.debug("Processing token: {} for type: {}", token, expectedType);
        Optional<Email> emailToken = emailRepository.findByTokenAndTokenType(token, expectedType);
        if (emailToken.isPresent() && emailToken.get().getExpiresAt().isAfter(LocalDateTime.now())) {
            User user = emailToken.get().getUser();
            logger.debug("Token is valid. Executing action on user: {}", user.getEmail());

            action.apply(user);
            userRepository.save(user);
            emailRepository.delete(emailToken.get());
            logger.info("Token processed successfully.");
            return true;
        }

        logger.warn("Invalid or expired token for token: {}", token);
        return false;
    }

    // Method to send an email
    private void sendEmail(String to, String subject, String text) {
        logger.info("Attempting to send email to: {}", to);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);

        try {
            mailSender.send(message);
            logger.info("Email sent successfully to: {}", to);
        } catch (Exception e) {
            logger.error("Error sending email to: {}. Error: {}", to, e.getMessage());
        }
    }

    // Functional interface for executing actions on the user
    @FunctionalInterface
    private interface TokenAction {
        void apply(User user);
    }
}
