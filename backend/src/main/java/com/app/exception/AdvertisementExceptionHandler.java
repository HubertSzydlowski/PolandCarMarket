package com.app.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ControllerAdvice;

@ControllerAdvice
public class AdvertisementExceptionHandler {

    // Handles exception related to advertisement not found
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleRuntimeException(RuntimeException ex) {
        if (ex.getMessage().equals("Advertisement not found")) {
            return new ResponseEntity<>("Advertisement not found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>("An unexpected error occurred while processing the advertisement", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Handles exception related to user not found
    @ExceptionHandler(NullPointerException.class)
    public ResponseEntity<String> handleNullPointerException(NullPointerException ex) {
        if (ex.getMessage().equals("User not found")) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>("An unexpected error occurred while processing the user", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Handles other exceptions related to advertisements
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleAllExceptions(Exception ex) {
        return new ResponseEntity<>("An unexpected error occurred while processing the advertisement", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}