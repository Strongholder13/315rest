package com.springsecurity.bootsecurity.util;

public class UserErrorResponse {
    String message;
    Long timestamp;

    public UserErrorResponse(String message, Long timestamp) {
        this.message = message;
        this.timestamp = timestamp;
    }
}
