package com.app.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class AdminPageExceptionHandler {

    // Handles the exception related to missing data in the admin page
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleAdminPageNotFound(IllegalArgumentException ex) {
        return new ResponseEntity<>("No statistics found for the given period: " + ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    // Handles the exception related to errors while retrieving data
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleDataRetrievalError(RuntimeException ex) {
        return new ResponseEntity<>("Error retrieving data: " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Handles other general exceptions
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleAllExceptions(Exception ex) {
        return new ResponseEntity<>("An unexpected error occurred: " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}