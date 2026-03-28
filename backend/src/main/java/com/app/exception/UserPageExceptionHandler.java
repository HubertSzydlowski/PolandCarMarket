package com.app.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class UserPageExceptionHandler {

    // Handles the exception when the user is not found
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleUserPageNotFound(IllegalArgumentException ex) {
        return new ResponseEntity<>("User not found: " + ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    // Handles the general exception related to errors during data retrieval
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleDataRetrievalError(RuntimeException ex) {
        return new ResponseEntity<>("Error retrieving user statistics: " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Handles other exceptions
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleAllExceptions(Exception ex) {
        return new ResponseEntity<>("An unexpected error occurred: " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
