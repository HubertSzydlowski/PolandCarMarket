package com.app.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ControllerAdvice;
import java.io.IOException;

@ControllerAdvice
public class VehiclePhotoExceptionHandler {

    // Handles the exception when a vehicle is not found
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleRuntimeException(RuntimeException ex) {
        return new ResponseEntity<>("Error: Vehicle not found - " + ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    // Handles the exception when there is an error saving the file
    @ExceptionHandler(IOException.class)
    public ResponseEntity<String> handleIOException(IOException ex) {
        return new ResponseEntity<>("Error while saving photo: " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Handles other exceptions related to the vehicle photo service
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleAllExceptions(Exception ex) {
        return new ResponseEntity<>("An unexpected error occurred while processing the vehicle photo.", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
