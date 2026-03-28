package com.app.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.mail.MailSendException;

@ControllerAdvice
public class EmailExceptionHandler {

    // Handles exceptions related to email sending errors
    @ExceptionHandler(MailSendException.class)
    public ResponseEntity<String> handleMailSendException(MailSendException ex) {
        return new ResponseEntity<>("Error sending email: " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Handles cases where the token has expired or is invalid
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleInvalidTokenException(IllegalArgumentException ex) {
        if (ex.getMessage().contains("Invalid or expired token")) {
            return new ResponseEntity<>("The token is invalid or has expired.", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("An unexpected error occurred while processing the token.", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Handles other exceptions related to emails
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleAllExceptions(Exception ex) {
        return new ResponseEntity<>("An unexpected error occurred while processing the email request.", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
